'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart/CartContext';
import { useWishlist } from '@/lib/wishlist/WishlistContext';
import { ShoppingCart, Heart, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const productInWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate a small delay to show loading state
    setTimeout(() => {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart`);
      setIsAddingToCart(false);
    }, 500);
  };

  const handleWishlistToggle = () => {
    if (productInWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="mt-8 space-y-4">      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-4 text-amber-800 font-medium">
          Quantity:
        </label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-1 text-amber-600 hover:bg-gray-100"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 py-1 text-amber-800 font-medium">{quantity}</span>
          <button
            type="button"
            className="px-3 py-1 text-amber-600 hover:bg-gray-100"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-md font-medium w-full flex items-center justify-center transition-colors"
      >
        {isAddingToCart ? (
          <>
            <span className="animate-spin mr-2">⟳</span> Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
          </>
        )}
      </button>

      <button
        onClick={handleWishlistToggle}
        className={`border py-3 px-6 rounded-md font-medium w-full flex items-center justify-center transition-colors ${productInWishlist ? 'border-red-500 text-red-500 hover:bg-red-50' : 'border-amber-600 text-amber-600 hover:bg-amber-50'}`}
      >
        {productInWishlist ? (
          <>
            <Heart className="h-5 w-5 mr-2 fill-red-500 text-red-500" /> Remove from Wishlist
          </>
        ) : (
          <>
            <Heart className="h-5 w-5 mr-2" /> Add to Wishlist
          </>
        )}
      </button>
    </div>
  );
}