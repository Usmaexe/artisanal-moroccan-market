"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-morocco-cream flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 text-morocco-terracotta mr-2" />
            <h2 className="font-heading text-lg font-semibold">Your Cart ({itemCount})</h2>
          </div>
          <button 
            className="text-morocco-charcoal hover:text-morocco-terracotta transition-colors" 
            onClick={onClose}
            aria-label="Close cart"
            title="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-14rem)] p-6 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="font-heading text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>            <Button 
              onClick={onClose} 
              className="btn-primary"
              aria-label="Continue shopping and close cart"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-14rem)]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    {/* Product Image */}                    <Link href={`/product/${item.slug}`} onClick={onClose} className="w-20 h-20 flex-shrink-0 relative rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/product/${item.slug}`} onClick={onClose} className="font-medium text-gray-800 hover:text-morocco-terracotta line-clamp-2">
                        {item.name}
                      </Link>
                      <p className="text-morocco-terracotta font-medium mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-morocco-terracotta border border-gray-300 rounded-l-md p-1"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 border-y border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-morocco-terracotta border border-gray-300 rounded-r-md p-1"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-3 text-gray-400 hover:text-morocco-terracotta"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cart Footer */}
            <div className="p-4 bg-white border-t">
              {/* Subtotal */}
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <Separator className="my-3" />
              
              {/* Checkout Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full btn-primary">
                  <Link href="/checkout" onClick={onClose}>
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full btn-outline">
                  <Link href="/cart" onClick={onClose}>
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
