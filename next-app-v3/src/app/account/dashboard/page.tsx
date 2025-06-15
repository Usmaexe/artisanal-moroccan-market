"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Code, ShoppingBag, Heart, User } from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();

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
                <Code className="h-6 w-6 text-amber-600 mr-2" />                <h2 className="text-xl font-semibold text-amber-800">Recent Orders</h2>
              </div>
              <div className="bg-amber-50 rounded-md p-8 text-center">
                <p className="text-amber-600">You haven&apos;t placed any orders yet.</p>
                <Link 
                  href="/products" 
                  className="mt-4 inline-block bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}