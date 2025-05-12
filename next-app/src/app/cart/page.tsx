"use client";

import React from 'react';
import { useCart } from '../../../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-semibold mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-xl mb-6">Your cart is empty</p>
          <Button asChild className="btn-primary">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="font-heading text-xl font-medium">Items ({items.length})</h2>
              <Button 
                variant="ghost" 
                className="text-sm text-red-500" 
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
            
            <div className="divide-y divide-gray-200">
              {items.map(item => (
                <div key={item.id} className="flex py-6">                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                    />
                  </div>
                  
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          <Link href={`/product/${item.slug}`}>
                            {item.name}
                          </Link>
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-red-500 h-auto p-1" 
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2" 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="px-4 text-center w-10">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      
                      <p className="font-medium text-morocco-blue">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="font-heading text-xl font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-morocco-blue">${subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4 btn-primary">
                Proceed to Checkout <ShoppingBag size={16} className="ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-medium mb-3">Accepted Payment Methods</h3>            <div className="flex space-x-3">
              <div className="relative h-6 w-10">
                <Image src="https://via.placeholder.com/40x25" alt="Visa" fill sizes="40px" className="object-contain" />
              </div>
              <div className="relative h-6 w-10">
                <Image src="https://via.placeholder.com/40x25" alt="Mastercard" fill sizes="40px" className="object-contain" />
              </div>
              <div className="relative h-6 w-10">
                <Image src="https://via.placeholder.com/40x25" alt="PayPal" fill sizes="40px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-morocco-blue hover:underline inline-flex items-center">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}