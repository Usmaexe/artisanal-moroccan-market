'use client';

import { useWishlist } from '@/lib/wishlist/WishlistContext';
import { useCart } from '@/lib/cart/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function WishlistContent() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    setAddingToCart(productId);
    
    const product = items.find(item => item.id === productId);
    if (product) {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        addToCart(product, 1);
        toast.success(`${product.name} added to cart`);
        setAddingToCart(null);
      }, 500);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <Heart className="h-16 w-16 text-gray-300" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any products to your wishlist yet.</p>
        <Link 
          href="/products" 
          className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-amber-800">My Wishlist ({items.length} items)</h2>
          <button
            onClick={() => {
              clearWishlist();
              toast.success('Wishlist cleared');
            }}
            className="text-red-500 hover:text-red-700 text-sm flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear Wishlist
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  <Link href={`/products/${product.slug}`} className="hover:text-amber-600">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-2">By {product.artisan.name}</p>
                <p className="text-amber-600 font-medium mb-4">${product.price.toFixed(2)}</p>
                
                <div className="mt-auto flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addingToCart === product.id}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors disabled:opacity-70"
                  >
                    {addingToCart === product.id ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      removeFromWishlist(product.id);
                      toast.success(`${product.name} removed from wishlist`);
                    }}
                    className="p-2 text-red-500 hover:text-red-700 border border-gray-300 rounded-md"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-black">My Wishlist</h1>
        <WishlistContent />
      </div>
    </ProtectedRoute>
  );
}