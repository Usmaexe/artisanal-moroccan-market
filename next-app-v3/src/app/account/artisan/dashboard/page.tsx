"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Package, ShoppingBag, BarChart, PlusCircle, Settings } from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  revenue: string;
  avgRating: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
  sales: number;
}

interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  status: string;
  date: string;
  amount: number;
}

export default function ArtisanDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard statistics
        const statsResponse = await axios.get(`http://localhost:5000/api/artisans/${user?.id}/stats`);
        setStats(statsResponse.data);

        // Fetch products
        const productsResponse = await axios.get(`http://localhost:5000/api/artisans/${user?.id}/products`);
        setProducts(productsResponse.data);

        // Fetch recent orders
        const ordersResponse = await axios.get(`http://localhost:5000/api/artisans/${user?.id}/orders`);
        setOrders(ordersResponse.data.slice(0, 2)); // Only show 2 most recent orders

      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  const artisanNavItems = [
    {
      title: "My Products",
      href: "/account/artisan/products",
      icon: <Package className="h-6 w-6 text-amber-600" />,
      description: "Manage your product listings"
    },
    {
      title: "Add New Product",
      href: "/account/artisan/products/new",
      icon: <PlusCircle className="h-6 w-6 text-amber-600" />,
      description: "Create a new product listing"
    },
    {
      title: "Orders",
      href: "/account/artisan/orders",
      icon: <ShoppingBag className="h-6 w-6 text-amber-600" />,
      description: "View and manage customer orders"
    },
    {
      title: "Analytics",
      href: "/account/artisan/analytics",
      icon: <BarChart className="h-6 w-6 text-amber-600" />,
      description: "View sales and performance metrics"
    }
  ];

  return (
    <ProtectedRoute allowedRoles={["artisan"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Artisan Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading dashboard...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats && [
                    { label: "Total Products", value: stats.totalProducts },
                    { label: "Total Orders", value: stats.totalOrders },
                    { label: "Revenue", value: stats.revenue },
                    { label: "Avg. Rating", value: stats.avgRating.toFixed(1) }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Overview</h2>
                  <div className="flex flex-col sm:flex-row">
                    <div className="mb-4 sm:mb-0 sm:mr-6">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-amber-500">
                        {user?.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="h-full w-full bg-amber-100 flex items-center justify-center">
                            <Package className="h-10 w-10 text-amber-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p><span className="font-medium">Name:</span> {user?.name}</p>
                      <p><span className="font-medium">Email:</span> {user?.email}</p>
                      <p><span className="font-medium">Role:</span> <span className="capitalize">{user?.role}</span></p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
                        <Link href="/account/artisan/settings">
                          <Settings className="h-5 w-5 text-gray-400 hover:text-amber-600" />
                        </Link>
                      </div>
                      <div className="space-y-3">
                        {artisanNavItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                          >
                            <div className="mr-3">
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">{item.title}</h3>
                              <p className="text-xs text-gray-600">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center mb-4">
                        <ShoppingBag className="h-6 w-6 text-amber-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
                      </div>
                      <div className="space-y-3">
                        {orders.map((order) => (
                          <div key={order.id} className="p-3 bg-amber-50 rounded-lg">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{order.orderNumber}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                order.status === 'Shipped' ? 'bg-green-100 text-green-800' : 
                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm">{order.productName}</p>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>{order.date}</span>
                              <span>${order.amount.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/account/artisan/orders"
                        className="mt-4 text-sm font-medium text-amber-600 hover:text-amber-700 flex justify-center"
                      >
                        View all orders
                      </Link>
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Package className="h-6 w-6 text-amber-600 mr-2" />
                          <h2 className="text-xl font-semibold text-gray-800">Your Products</h2>
                        </div>
                        <Link
                          href="/account/artisan/products/new"
                          className="bg-amber-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-amber-700 flex items-center"
                        >
                          <PlusCircle className="h-4 w-4 mr-1" /> Add Product
                        </Link>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sales
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                              <tr key={product.id} className="hover:bg-amber-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">ID: {product.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ${product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.stock}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    product.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {product.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.sales}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <Link
                        href="/account/artisan/products"
                        className="mt-4 text-sm font-medium text-amber-600 hover:text-amber-700 flex justify-center"
                      >
                        Manage all products
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}