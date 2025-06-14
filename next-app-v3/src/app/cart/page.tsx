'use client';

import { useCart } from '@/lib/cart/CartContext';
import { useAuth } from '@/lib/auth/AuthContext';
import { createOrder } from '@/lib/api/orders';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please log in to checkout');
      router.push('/login');
      return;
    }

    setIsCheckingOut(true);
    
    try {
      // Prepare order items in the format expected by the backend
      const orderItems = items.map(item => ({
        product_id: parseInt(item.product.id),
        quantity: item.quantity,
        price: item.product.price
      }));

      // Calculate total (including tax and shipping)
      const subtotal = getCartTotal();
      const shipping = 10;
      const tax = subtotal * 0.05;
      const total = subtotal + shipping + tax;

      // Create the order
      const orderData = {
        customer_id: user.id,
        items: orderItems,
        total: parseFloat(total.toFixed(2))
      };

      const result = await createOrder(orderData);
      
      if (result) {
        toast.success('Order placed successfully!');
        clearCart();
        // Redirect to order confirmation or orders page
        router.push(`/account/orders`);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-amber-800">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-amber-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-amber-800">Your cart is empty</h2>
          <p className="text-amber-600 mb-6">Looks like you haven&apos;t added any products to your cart yet.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-amber-800">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.product.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200 relative">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">                        <div>
                          <div className="flex justify-between text-base font-medium text-amber-800">
                            <h3>
                              <Link href={`/products/${item.product.slug}`} className="hover:text-amber-600">
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="ml-4">{(item.product.price * item.quantity).toFixed(2)} DH</p>
                          </div>
                          <p className="mt-1 text-sm text-amber-600">
                            By {item.product.artisan.name}
                          </p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center border border-gray-300 rounded-md">                            <button
                              type="button"
                              className="p-2 text-amber-600 hover:bg-gray-100"
                              onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-amber-800 font-medium">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-2 text-amber-600 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 flex items-center"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-amber-800 mb-4">Order Summary</h2>
              <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-amber-600">Subtotal</p>
                <p className="text-sm font-medium text-amber-800">{getCartTotal().toFixed(2)} DH</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-amber-600">Shipping</p>
                <p className="text-sm font-medium text-amber-800">10.00 DH</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-amber-600">Tax</p>
                <p className="text-sm font-medium text-amber-800">{(getCartTotal() * 0.05).toFixed(2)} DH</p>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <p className="text-base font-medium text-amber-800">Total</p>
                <p className="text-base font-medium text-amber-800">
                  {(getCartTotal() + 10 + getCartTotal() * 0.05).toFixed(2)} DH
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-6 w-full bg-amber-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Processing...
                </>
              ) : (
                'Checkout'
              )}
            </button>

            <div className="mt-6">
              <Link 
                href="/products" 
                className="flex items-center justify-center text-sm text-amber-600 hover:text-amber-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}