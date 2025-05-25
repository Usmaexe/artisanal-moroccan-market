'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/lib/cart/CartContext';

type AddToCartButtonProps = {
  product: any;
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
};

export default function AddToCartButton({
  product,
  className = '',
  showText = true,
  iconOnly = false
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    
    // Reset button state after 2 seconds
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (iconOnly) {
    return (
      <button
        onClick={handleAddToCart}
        className={`p-2 rounded-full bg-amber-50 hover:bg-amber-100 transition-colors ${className}`}
        title="Add to cart"
      >
        {added ? (
          <Check className="h-5 w-5 text-green-600" />
        ) : (
          <ShoppingCart className="h-5 w-5 text-amber-600" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md font-medium transition-colors ${className}`}
      disabled={added}
    >
      {added ? (
        <>
          <Check className="h-5 w-5 mr-2" />
          {showText && "Added to Cart"}
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5 mr-2" />
          {showText && "Add to Cart"}
        </>
      )}
    </button>
  );
}