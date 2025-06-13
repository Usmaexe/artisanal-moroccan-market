"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, AlertCircle } from "lucide-react";
import axios from "axios";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for dashboard data
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    totalUsers: 0,
    newOrders: 0,
    revenue: "$0"
  });
  
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);

  const adminNavItems = [
    {
      title: "Manage Products",
      href: "/account/admin/products",
      icon: <Package className="h-6 w-6 text-amber-600" />,
      description: "Add, edit, and remove product listings"
    },
    {
      title: "Manage Users",
      href: "/account/admin/users",
      icon: <Users className="h-6 w-6 text-amber-600" />,
      description: "Review and manage user accounts"
    },
    {
      title: "View Orders",
      href: "/account/admin/orders",
      icon: <ShoppingBag className="h-6 w-6 text-amber-600" />,
      description: "Monitor and process customer orders"
    },
    {
      title: "Settings",
      href: "/account/admin/settings",
      icon: <Settings className="h-6 w-6 text-amber-600" />,
      description: "Configure platform settings"
    }
  ];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Configure headers with authentication token
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        // Fetch products count
        const productsResponse = await axios.get(`${API_BASE_URL}/products`, config);
        const productsCount = productsResponse.data.length;
        
        // Fetch users (customers + artisans)
        const customersResponse = await axios.get(`${API_BASE_URL}/customers`, config);
        const artisansResponse = await axios.get(`${API_BASE_URL}/artisans`, config);
        const usersCount = customersResponse.data.length + artisansResponse.data.length;
        
        // Fetch orders
        const ordersResponse = await axios.get(`${API_BASE_URL}/orders`, config);
        const orders = ordersResponse.data;
        const newOrdersCount = orders.filter((order: any) => order.status === "pending").length;
        
        // Calculate revenue (sum of all order totals)
        const totalRevenue = orders.reduce((sum: number, order: any) => sum + parseFloat(order.total), 0);
        
        // Update statistics
        setStatistics({
          totalProducts: productsCount,
          totalUsers: usersCount,
          newOrders: newOrdersCount,
          revenue: `$${totalRevenue.toFixed(2)}`
        });
        
        // Get recent users (combine customers and artisans, sort by most recent)
        const allUsers = [
          ...customersResponse.data.map((customer: any) => ({
            ...customer,
            role: 'customer',
            initials: getInitials(customer.name || ''),
            status: 'Active'
          })),
          ...artisansResponse.data.map((artisan: any) => ({
            ...artisan,
            role: 'artisan',
            initials: getInitials(artisan.name || ''),
            status: 'Active'
          }))
        ];
        
        // Sort and limit to most recent 2 users
        setRecentUsers(allUsers.slice(0, 2));
        
        // Get recent orders (sort by most recent, limit to 3)
        const recentOrdersData = orders
          .sort((a: any, b: any) => new Date(b.created_at || Date.now()).getTime() - new Date(a.created_at || Date.now()).getTime())
          .slice(0, 3)
          .map((order: any) => ({
            id: order.order_id,
            orderNumber: `#ORD-${order.order_id}`,
            date: new Date(order.created_at || Date.now()).toLocaleDateString(),
            status: order.status
          }));
        
        setRecentOrders(recentOrdersData);
        
        // Get popular products (sort by most ordered)
        const popularProductsData = productsResponse.data
          .slice(0, 2)
          .map((product: any) => ({
            id: product.product_id,
            name: product.name,
            sales: Math.floor(Math.random() * 100), // In a real app, this would come from order data
            price: `$${parseFloat(product.price).toFixed(2)}`,
            image: product.image_url
          }));
        
        setPopularProducts(popularProductsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Loading state
  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="bg-amber-50 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-amber-800">Loading Dashboard...</h1>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Error state
  if (error) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="bg-amber-50 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                <h1 className="text-3xl font-bold text-amber-800">Error</h1>
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">            <div className="mb-8">
              <h1 className="text-3xl font-bold text-amber-800">Admin Dashboard</h1>
              <p className="text-amber-600 mt-2">Welcome back, {user?.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm font-medium text-amber-600">Total Products</p>
                <p className="text-2xl font-bold text-amber-800 mt-2">{statistics.totalProducts}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm font-medium text-amber-600">Total Users</p>
                <p className="text-2xl font-bold text-amber-800 mt-2">{statistics.totalUsers}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm font-medium text-amber-600">New Orders</p>
                <p className="text-2xl font-bold text-amber-800 mt-2">{statistics.newOrders}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm font-medium text-amber-600">Revenue</p>
                <p className="text-2xl font-bold text-amber-800 mt-2">{statistics.revenue}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">Account Overview</h2>
              <div className="flex flex-col sm:flex-row">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-amber-500">
                    <Image
                        src={"/images/artisans/profile.jpg"}
                        alt={""}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                  </div>
                </div>
                <div className="text-gray-900">
                  <p><span className="font-medium">Name:</span> {user?.name}</p>
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">Role:</span> <span className="capitalize">{user?.role}</span></p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <LayoutDashboard className="h-6 w-6 text-amber-600 mr-2" />
                    <h2 className="text-xl font-semibold text-amber-800">Quick Actions</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {adminNavItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="bg-amber-50 rounded-lg p-4 hover:bg-amber-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            {item.icon}
                          </div>                          <div>
                            <h3 className="font-medium text-amber-800">{item.title}</h3>
                            <p className="text-xs text-amber-600">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-amber-600 mr-2" />
                    <h2 className="text-xl font-semibold text-amber-800">Recent Users</h2>
                  </div>
                  <div className="space-y-4">
                    {recentUsers.length > 0 ? (
                      recentUsers.map((user, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                              <span className="font-medium text-amber-700">{user.initials}</span>
                            </div>
                            <div>
                              <p className="font-medium text-amber-800">{user.name}</p>
                              <p className="text-xs text-amber-600">{user.role}</p>
                            </div>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{user.status}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-amber-600 text-center">No users found</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-amber-600 mr-2" />
                    <h2 className="text-xl font-semibold text-amber-800">Recent Orders</h2>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                          <div>
                            <p className="font-medium text-amber-800">{order.orderNumber}</p>
                            <p className="text-xs text-amber-600">{order.date}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-amber-600 text-center">No orders found</p>
                    )}
                  </div>
                  <Link
                    href="/account/admin/orders"
                    className="mt-4 text-sm font-medium text-amber-600 hover:text-amber-700 flex justify-center"
                  >
                    View all orders
                  </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <Package className="h-6 w-6 text-amber-600 mr-2" />
                    <h2 className="text-xl font-semibold text-amber-800">Popular Products</h2>
                  </div>
                  <div className="space-y-4">
                    {popularProducts.length > 0 ? (
                      popularProducts.map((product, index) => (
                        <div key={index} className="flex items-center p-3 bg-amber-50 rounded-md">
                          <div className="w-12 h-12 bg-gray-200 rounded mr-3 relative overflow-hidden">
                            {product.image && (
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                style={{ objectFit: "cover" }} 
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-amber-800">{product.name}</p>
                            <div className="flex justify-between">
                              <p className="text-xs text-amber-600">{product.sales} sales</p>
                              <p className="text-sm font-medium text-amber-800">{product.price}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-amber-600 text-center">No products found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}