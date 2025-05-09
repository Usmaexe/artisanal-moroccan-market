import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  // Shipping cost calculation - would be more complex in a real app
  const shippingCost = subtotal >= 150 ? 0 : 15;
  
  // Tax calculation - would be more complex in a real app
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  
  // Total cost
  const totalCost = subtotal + shippingCost + taxAmount;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-heading font-semibold mb-8 text-morocco-charcoal">Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-heading font-medium mb-4">Your cart is empty</h2>            <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
            <Button asChild className="btn-primary">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Product Info */}                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link href={`/product/${item.slug}`} className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />                        </Link>
                        <div>
                          <Link href={`/product/${item.slug}`} className="font-medium text-morocco-charcoal hover:text-morocco-terracotta">
                            {item.name}
                          </Link>
                          <div className="md:hidden mt-2 text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 md:text-center mt-4 md:mt-0">
                        <div className="inline-flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-morocco-terracotta border border-gray-300 rounded-l-md p-1"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 py-1 border-y border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-morocco-terracotta border border-gray-300 rounded-r-md p-1"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal + Remove */}
                      <div className="md:col-span-2 md:text-right flex justify-between items-center mt-4 md:mt-0">
                        <span className="md:hidden">Subtotal:</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-morocco-terracotta md:ml-4"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 flex justify-between">
                  <Button 
                    variant="ghost" 
                    className="text-morocco-terracotta hover:text-morocco-rust"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>                  <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-heading text-lg font-medium mb-4">Cart Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%)</span>
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-medium mb-6">
                  <span>Total</span>
                  <span className="text-morocco-terracotta">${totalCost.toFixed(2)}</span>
                </div>                <Button asChild className="btn-primary w-full mb-4">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="bg-morocco-cream/30 rounded p-3 text-sm text-gray-700">
                  <p className="mb-2 font-medium">Have a coupon code?</p>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="text-sm h-9" />
                    <Button variant="outline" size="sm" className="h-9">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
