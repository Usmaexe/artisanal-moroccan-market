"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { ArrowLeft, Package, User, CreditCard, MapPin, Calendar, ShoppingBag, Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getProducts } from "@/data/products";

export default function ArtisanOrderDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  
  // Get products belonging to this artisan
  const allProducts = getProducts();
  // In a real app, we would filter by the actual artisan ID
  // For now, we'll just use the first few products as a simulation
  const artisanProducts = allProducts.slice(0, 6);
  
  // Mock order data - in a real app this would come from an API call
  const order = {
    id: orderId,
    customer: {
      name: "Ahmed Hassan",
      email: "a.hassan@example.com",
      phone: "+212 612 345 678"
    },
    date: "2023-04-14T14:32:00",
    total: 349.99,
    status: "Shipped",
    paymentMethod: "Credit Card",
    shippingAddress: {
      street: "123 Morocco Street",
      city: "Marrakech",
      state: "",
      country: "Morocco",
      postalCode: "40000"
    },
    shippingMethod: "Standard Shipping",
    shippingCost: 15.00,
    items: [
      {
        id: artisanProducts[0].id,
        name: artisanProducts[0].name,
        price: artisanProducts[0].price,
        quantity: 1,
        artisan: "You", // Since this is the artisan's view
        image: "/images/products/carpet.jpg"
      }
    ],
    timeline: [
      { status: "Order Placed", date: "2023-04-14T14:32:00", note: "Order received" },
      { status: "Payment Confirmed", date: "2023-04-14T14:35:00", note: "Payment processed successfully" },
      { status: "Shipped", date: "2023-04-15T09:23:00", note: "Package shipped via Standard Shipping" }
    ]
  };

  // Calculate order summary
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <ProtectedRoute allowedRoles={["artisan"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-8">
              <Link 
                href="/account/artisan/orders"
                className="mr-4 p-2 rounded-full hover:bg-amber-100"
              >
                <ArrowLeft className="h-5 w-5 text-amber-600" />
              </Link>
              <div>
                <div className="flex items-center">
                  <ShoppingBag className="h-6 w-6 text-amber-600 mr-2" />
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order {orderId}</h1>
                </div>
                <p className="text-gray-600 mt-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(order.date)}</span>
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-1">Order Status</h2>
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full 
                    ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                      order.status === "Shipped" ? "bg-blue-100 text-blue-800" : 
                      order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                      "bg-red-100 text-red-800"}`
                  }>
                    {order.status}
                  </span>
                </div>
                
                <div className="mt-4 sm:mt-0 text-sm text-gray-600">
                  <p>This order contains your products.</p>
                  <p>The customer will be notified of any status changes.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-amber-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Customer</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-medium">{order.customer.name}</p>
                  <p className="text-gray-600">{order.customer.email}</p>
                  <p className="text-gray-600">{order.customer.phone}</p>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Shipping</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-medium">{order.shippingMethod}</p>
                  <div className="text-gray-600">
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-5 w-5 text-amber-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-medium">{order.paymentMethod}</p>
                  <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>${order.shippingCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Package className="h-5 w-5 text-amber-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Your Products in This Order</h2>
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
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center mr-3">
                              <Package className="h-6 w-6 text-amber-600" />
                            </div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-amber-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Order Timeline</h2>
              </div>
              
              <div className="flow-root">
                <ul className="-mb-8">
                  {order.timeline.map((event, eventIdx) => (
                    <li key={eventIdx}>
                      <div className="relative pb-8">
                        {eventIdx !== order.timeline.length - 1 ? (
                          <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex items-start space-x-3">
                          <div>
                            <div className="relative px-1">
                              <div className="h-8 w-8 bg-amber-100 rounded-full ring-8 ring-white flex items-center justify-center">
                                <ShoppingBag className="h-4 w-4 text-amber-600" />
                              </div>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 py-0">
                            <div className="text-sm text-gray-500">
                              <div className="font-medium text-gray-900">{event.status}</div>
                              <div className="mt-1">{formatDate(event.date)}</div>
                              <div className="mt-1">{event.note}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}