'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-amber-50 py-12 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-amber-50 py-12 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block p-4 rounded-full bg-amber-100 mb-4">
              <ShoppingBag className="h-10 w-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              href="/products"
              className="bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors inline-flex items-center"
            >
              Explore Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 py-12 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product image */}
                      <div className="flex-shrink-0 relative w-full sm:w-24 h-24 mb-4 sm:mb-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-md"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-1 sm:ml-6">
                        <div className="flex justify-between mb-2">
                          <Link href={`/products/${item.slug}`} className="text-lg font-medium text-gray-900 hover:text-amber-600">
                            {item.name}
                          </Link>
                          <span className="text-amber-600 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        
                        <div className="mt-1 text-sm text-gray-500 mb-4">
                          ${item.price.toFixed(2)} per item
                        </div>
                        
                        <div className="flex items-center justify-between">
                          {/* Quantity controls */}
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Clear cart
                  </button>
                  <Link
                    href="/products"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-b pb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between border-b pb-4">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                className="w-full bg-amber-600 text-white mt-6 py-3 px-4 rounded-md font-medium hover:bg-amber-700 transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>We accept all major credit cards and PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}