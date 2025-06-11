'use client';

import { useCart } from '@/lib/cart/CartContext';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartIndicator() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link 
      href="/cart" 
      className="relative p-2 text-amber-600 hover:text-amber-800 transition-colors"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}