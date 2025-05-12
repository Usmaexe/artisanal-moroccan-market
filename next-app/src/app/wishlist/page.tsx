"use client";

import React from 'react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function WishlistPage() {
  // This would be connected to a real wishlist context in a complete app
  const [wishlistItems, setWishlistItems] = React.useState([
    {
      id: 1,
      name: 'Traditional Berber Rug',
      price: 349.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3',
      category: 'Rugs & Carpets',
      slug: 'traditional-berber-rug'
    },
    {
      id: 2,
      name: 'Moroccan Ceramic Bowl',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1590422749897-47c47673ba0b?ixlib=rb-4.0.3',
      category: 'Pottery & Ceramics',
      slug: 'moroccan-ceramic-bowl'
    },
    {
      id: 5,
      name: 'Handcrafted Leather Pouf',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3',
      category: 'Leather Goods',
      slug: 'handcrafted-leather-pouf'
    }
  ]);
  
  // Handle remove from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-morocco-charcoal mb-8">
        Your Wishlist
      </h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Save your favorite items to start building your wishlist.
          </p>
          <Button asChild>
            <Link href="/category/featured">
              Continue Shopping
            </Link>
          </Button>
        </div>      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wishlistItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 relative overflow-hidden rounded-md mr-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link href={`/product/${item.slug}`} className="hover:text-morocco-terracotta">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        <Button size="sm" onClick={() => removeFromWishlist(item.id)} variant="destructive">
                          Remove
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/product/${item.slug}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>      )}
    </div>
  );
}