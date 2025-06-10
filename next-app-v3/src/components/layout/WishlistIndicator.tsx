'use client';

import { useWishlist } from '@/lib/wishlist/WishlistContext';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistIndicator() {
  const { items } = useWishlist();
  const hasItems = items.length > 0;

  return (
    <Link 
      href="/account/wishlist" 
      className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors"
      aria-label={`Wishlist with ${items.length} items`}
    >
      <Heart className={`h-6 w-6 ${hasItems ? 'fill-red-500 text-red-500' : ''}`} />
    </Link>
  );
}