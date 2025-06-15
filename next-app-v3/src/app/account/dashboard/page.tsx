"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Code, ShoppingBag, Heart, User, Eye, Calendar } from "lucide-react";
import { getCustomerOrders } from '@/lib/api/orders';
import { format } from 'date-fns';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recent orders
  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const data = await getCustomerOrders(user.id.toString());
        // Sort by date (newest first) and take the first 3
        const sortedOrders = [...data].sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }).slice(0, 3);
        
        setRecentOrders(sortedOrders);
        setError(null);
      } catch (err) {
        console.error('Error fetching recent orders:', err);
        setError('Failed to load recent orders');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [user]);

  const isValidImagePath = (path: string): boolean => {
    // Check if it's a local path starting with '/images/' or 'images/'
    if (path.startsWith('/images/') || path.startsWith('images/')) {
      return true;
    }
    
    // Check if it's a valid URL
    try {
      new URL(path);
      return true;
    } catch (e) {
      return false;
    }
  };

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

  const dashboardItems = [
    {
      title: "My Orders",
      href: "/account/orders",
      icon: <ShoppingBag className="h-6 w-6 text-amber-600" />,
      description: "View and track your order history"
    },
    {
      title: "My Wishlist",
      href: "/account/wishlist",
      icon: <Heart className="h-6 w-6 text-amber-600" />,
      description: "Products you've saved for later"
    },
    {
      title: "My Profile",
      href: "/account/profile",
      icon: <User className="h-6 w-6 text-amber-600" />,
      description: "Update your personal information"
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">            <div className="mb-8">
              <h1 className="text-3xl font-bold text-amber-800">Welcome back, {user?.name}</h1>
              <p className="text-amber-600 mt-2">Manage your account and orders</p>
            </div>            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">Account Overview</h2>
              <div className="flex flex-col sm:flex-row">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-amber-500">
                    {user && user.image_url && isValidImagePath(user.image_url) ? (
                      <Image
                        src={user.image_url.startsWith('http') ? user.image_url : `/${user.image_url}`}
                        alt={user.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="h-full w-full bg-amber-100 flex items-center justify-center">
                        <User className="h-10 w-10 text-amber-600" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-900">
                  <p><span className="font-medium text-amber-600">Name:</span> {user?.name}</p>
                  <p><span className="font-medium text-amber-600">Email:</span> {user?.email}</p>
                  <p><span className="font-medium text-amber-600">Role:</span> <span className="capitalize">{user?.role}</span></p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                >
                  <div className="mb-4 p-3 bg-amber-50 rounded-full">
                    {item.icon}
                  </div>                  <h3 className="text-lg font-semibold text-amber-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-amber-600">{item.description}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-6 w-6 text-amber-600 mr-2" />                
                <h2 className="text-xl font-semibold text-amber-800">Recent Orders</h2>
              </div>
              
              {loading ? (
                <div className="text-center py-4">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-gray-600">Loading your recent orders...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 rounded-md p-4 text-center">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.order_id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            ORD-{order.order_id}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.created_at)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {parseFloat(order.total || 0).toFixed(2)} DH
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {countItems(order.items)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
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
                  <div className="mt-4 text-right">
                    <Link 
                      href="/account/orders" 
                      className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                    >
                      View all orders
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 rounded-md p-8 text-center">
                  <ShoppingBag className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <p className="text-amber-600 mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link 
                    href="/products" 
                    className="mt-4 inline-block bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}