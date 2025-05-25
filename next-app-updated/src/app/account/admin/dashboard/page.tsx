"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ShoppingBag, Users, Package, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

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

  // Mock statistics for admin dashboard
  const statistics = [
    { label: "Total Products", value: 124 },
    { label: "Total Users", value: 357 },
    { label: "New Orders", value: 18 },
    { label: "Revenue", value: "$12,450" }
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statistics.map((stat, index) => (
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
                        <Users className="h-10 w-10 text-amber-600" />
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <LayoutDashboard className="h-6 w-6 text-amber-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
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
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{item.title}</h3>
                            <p className="text-xs text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-amber-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                          <span className="font-medium text-amber-700">JD</span>
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-gray-500">customer</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">New</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                          <span className="font-medium text-amber-700">SL</span>
                        </div>
                        <div>
                          <p className="font-medium">Sarah Lee</p>
                          <p className="text-xs text-gray-500">artisan</p>
                        </div>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-amber-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                      <div>
                        <p className="font-medium">#ORD-2023-1568</p>
                        <p className="text-xs text-gray-500">April 15, 2023</p>
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                      <div>
                        <p className="font-medium">#ORD-2023-1567</p>
                        <p className="text-xs text-gray-500">April 14, 2023</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Shipped</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                      <div>
                        <p className="font-medium">#ORD-2023-1566</p>
                        <p className="text-xs text-gray-500">April 14, 2023</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Shipped</span>
                    </div>
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
                    <h2 className="text-xl font-semibold text-gray-800">Popular Products</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-amber-50 rounded-md">
                      <div className="w-12 h-12 bg-gray-200 rounded mr-3"></div>
                      <div className="flex-1">
                        <p className="font-medium">Handmade Ceramic Tajine</p>
                        <div className="flex justify-between">
                          <p className="text-xs text-gray-500">54 sales</p>
                          <p className="text-sm font-medium">$89.99</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-amber-50 rounded-md">
                      <div className="w-12 h-12 bg-gray-200 rounded mr-3"></div>
                      <div className="flex-1">
                        <p className="font-medium">Moroccan Leather Pouf</p>
                        <div className="flex justify-between">
                          <p className="text-xs text-gray-500">42 sales</p>
                          <p className="text-sm font-medium">$129.99</p>
                        </div>
                      </div>
                    </div>
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