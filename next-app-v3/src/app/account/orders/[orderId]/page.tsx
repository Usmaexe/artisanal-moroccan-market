'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, User, CreditCard, MapPin, Calendar, ShoppingBag, Clock } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function OrderDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  
  // Mock order data - in a real app this would come from an API call
  const order = {
    id: orderId,
    customer: {
      name: user?.name || 'Customer',
      email: user?.email || 'customer@example.com',
      phone: user?.phone || '+212 612 345 678'
    },
    date: '2023-04-14T14:32:00',
    total: 349.99,
    status: 'Shipped',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: user?.address?.street || '123 Morocco Street',
      city: user?.address?.city || 'Marrakech',
      state: user?.address?.state || '',
      country: user?.address?.country || 'Morocco',
      postalCode: user?.address?.postalCode || '40000'
    },
    shippingMethod: 'Standard Shipping',
    shippingCost: 15.00,
    items: [
      {
        id: 'PROD-001',
        name: 'Handcrafted Moroccan Leather Pouf',
        price: 129.99,
        quantity: 1,
        image: '/images/products/pouf.jpg'
      },
      {
        id: 'PROD-002',
        name: 'Moroccan Ceramic Plate Set',
        price: 89.99,
        quantity: 2,
        image: '/images/products/plates.jpg'
      },
      {
        id: 'PROD-003',
        name: 'Argan Oil Cosmetic Set',
        price: 39.99,
        quantity: 1,
        image: '/images/products/argan.jpg'
      }
    ],
    timeline: [
      {
        status: 'Order Placed',
        date: '2023-04-14T14:32:00',
        description: 'Your order has been received and is being processed.'
      },
      {
        status: 'Payment Confirmed',
        date: '2023-04-14T14:35:00',
        description: 'Payment has been successfully processed.'
      },
      {
        status: 'Processing',
        date: '2023-04-15T09:20:00',
        description: 'Your order is being prepared for shipping.'
      },
      {
        status: 'Shipped',
        date: '2023-04-16T11:45:00',
        description: 'Your order has been shipped. Tracking information will be available soon.'
      }
    ]
  };

  const [currentStatus] = useState(order.status);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Link 
                href="/account/orders" 
                className="mr-4 text-amber-600 hover:text-amber-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Order #{order.id}</h2>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Placed on {formatDate(order.date)}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      currentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      currentStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      currentStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                      currentStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {currentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-1" /> Customer Information
                  </h3>
                  <p className="text-gray-800 font-medium">{order.customer.name}</p>
                  <p className="text-gray-600">{order.customer.email}</p>
                  <p className="text-gray-600">{order.customer.phone}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" /> Payment Information
                  </h3>
                  <p className="text-gray-800 font-medium">{order.paymentMethod}</p>
                  <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
                  <p className="text-gray-600 text-sm">(Including ${order.shippingCost.toFixed(2)} shipping)</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Shipping Address
                  </h3>
                  <p className="text-gray-800 font-medium">{order.customer.name}</p>
                  <p className="text-gray-600">{order.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}{order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ''} {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.country}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Package className="h-4 w-4 mr-1" /> Shipping Method
                  </h3>
                  <p className="text-gray-800 font-medium">{order.shippingMethod}</p>
                  <p className="text-gray-600">Estimated delivery: 3-5 business days</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-amber-600" /> Order Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b border-gray-200 last:border-0">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        <p className="mt-1 text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${(order.total - order.shippingCost).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">${order.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-amber-600" /> Order Timeline
                </h3>
                <div className="space-y-6">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="relative">
                      {index !== order.timeline.length - 1 && (
                        <div className="absolute top-5 left-3 -ml-px h-full w-0.5 bg-gray-300" aria-hidden="true"></div>
                      )}
                      <div className="relative flex items-start">
                        <div className="h-6 w-6 rounded-full bg-amber-600 flex items-center justify-center ring-8 ring-white">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">{event.status}</h4>
                          <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                          <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Link 
                href="/account/orders" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}