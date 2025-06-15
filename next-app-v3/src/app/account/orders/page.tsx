'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { Search, ShoppingBag, Eye } from 'lucide-react';
import { getCustomerOrders } from '@/lib/api/orders';
import { format } from 'date-fns';

export default function CustomerOrders() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const data = await getCustomerOrders(user.id.toString());
        setOrders(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(order => {
    if (!order || !order.order_id) return false;
    const orderId = `ORD-${order.order_id}`;
    return orderId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Format date from ISO string
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Count items in an order
  const countItems = (items: any[] | undefined) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.length;
  };

  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <Link 
                href="/account/dashboard" 
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Back to Dashboard
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by order ID"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 w-full md:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-gray-600">Loading your orders...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 rounded-md p-4 text-center">
                  <p className="text-red-600">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-2 text-red-700 underline"
                  >
                    Try again
                  </button>
                </div>
              ) : null}

              {!loading && !error && filteredOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr key={order.order_id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ORD-{order.order_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {parseFloat(order.total || 0).toFixed(2)} DH
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {countItems(order.items)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link 
                              href={`/account/orders/ORD-${order.order_id}`} 
                              className="text-amber-600 hover:text-amber-900 flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : !loading && !error ? (
                <div className="bg-amber-50 rounded-md p-8 text-center">
                  <ShoppingBag className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                  <Link 
                    href="/products" 
                    className="inline-block bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}