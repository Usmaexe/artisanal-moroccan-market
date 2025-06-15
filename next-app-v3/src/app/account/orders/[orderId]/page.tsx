'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';
import { getOrder } from '@/lib/api/orders';
import { format } from 'date-fns';
import Image from 'next/image';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract the numeric order ID from the route parameter
  const extractOrderId = (orderId: string) => {
    if (typeof orderId !== 'string') return '';
    return orderId.toString().replace(/^ORD-/i, '');
  };

  // Fetch order details from API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user?.id || !orderId) return;
      
      try {
        setLoading(true);
        const numericOrderId = extractOrderId(orderId as string);
        const data = await getOrder(numericOrderId);
        
        if (!data) {
          setError('Order not found');
          return;
        }
        
        setOrder(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [user, orderId]);

  // Format date from ISO string
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <Link 
                href="/account/orders" 
                className="text-amber-600 hover:text-amber-700 font-medium flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Orders
              </Link>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-gray-600">Loading order details...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 rounded-md p-6 text-center">
                <p className="text-red-600">{error}</p>
                <Link 
                  href="/account/orders"
                  className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-medium"
                >
                  Return to Orders
                </Link>
              </div>
            ) : order ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Order ID</h2>
                      <p className="mt-1 text-lg font-semibold text-gray-900">ORD-{order.order_id}</p>
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Date Placed</h2>
                      <p className="mt-1 text-lg text-gray-900">{formatDate(order.created_at)}</p>
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Total Amount</h2>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{parseFloat(order.total || 0).toFixed(2)} DH</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h2 className="text-xl mb-4 text-gray-600">Order Items</h2>
                  
                  {order.items && order.items.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item: any, index: number) => (
                            <tr key={item.id || `item-${index}`}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {item.product?.image_url ? (
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <Image 
                                        src={item.product.image_url} 
                                        alt={item.product.name || 'Product image'}
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-cover object-center"
                                        unoptimized={!item.product.image_url.startsWith('http')}
                                      />
                                    </div>
                                  ) : (
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center">
                                      <Package className="h-8 w-8 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.product?.name || 'Product name not available'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {parseFloat(item.price || 0).toFixed(2)} DH
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity || 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {(parseFloat(item.price || 0) * (parseInt(item.quantity, 10) || 1)).toFixed(2)} DH
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-50">
                            <td colSpan={4} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                              Total:
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                              {parseFloat(order.total || 0).toFixed(2)} DH
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-amber-50 rounded-md p-4 text-center">
                      <p className="text-gray-600">No items found in this order.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}