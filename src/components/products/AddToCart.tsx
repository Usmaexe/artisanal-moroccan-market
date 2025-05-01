
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface AddToCartProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
  className?: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ product, className = '' }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center">
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-l-md hover:bg-gray-100"
          onClick={decreaseQuantity}
        >
          <MinusIcon size={16} />
        </button>
        <div className="flex items-center justify-center w-14 h-10 border-t border-b border-gray-300 bg-white">
          {quantity}
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-r-md hover:bg-gray-100"
          onClick={increaseQuantity}
        >
          <PlusIcon size={16} />
        </button>
      </div>
      
      <Button 
        onClick={handleAddToCart} 
        className="btn-primary w-full"
        size="lg"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
