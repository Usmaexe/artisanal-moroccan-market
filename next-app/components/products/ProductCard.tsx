"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  region?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  rating?: number;
  slug: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  region,
  isNew,
  isFeatured,
  isOnSale,
  rating,
  slug,
  className,
}) => {
  const [isWishlist, setIsWishlist] = React.useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlist(!isWishlist);
  };

  return (
    <div className={cn("moroccan-card group", className)}>
      <Link href={`/product/${slug}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product image */}          <div className="aspect-square relative overflow-hidden">
            <Image 
              src={image} 
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-morocco-teal">New</Badge>
            )}
            {isOnSale && (
              <Badge className="bg-morocco-terracotta">Sale</Badge>
            )}
            {isFeatured && (
              <Badge className="bg-morocco-amber text-morocco-charcoal">Featured</Badge>
            )}
          </div>

          {/* Wishlist button */}          <button 
            onClick={toggleWishlist}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-morocco-cream transition-colors"
            aria-label={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-colors", 
                isWishlist ? "fill-morocco-terracotta text-morocco-terracotta" : "text-gray-500"
              )} 
            />
          </button>

          {/* Quick shop button that appears on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-morocco-terracotta opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
            <Button 
              variant="ghost" 
              className="w-full text-white hover:bg-morocco-rust hover:text-white rounded-none py-2"
            >
              Quick View
            </Button>
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4">
        <div className="flex justify-between">
          {category && <div className="text-sm text-morocco-blue">{category}</div>}
          {region && <div className="text-sm text-morocco-olive">{region}</div>}
        </div>
        
        <Link href={`/product/${slug}`} className="block mt-1">
          <h3 className="font-medium hover:text-morocco-terracotta transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-semibold text-morocco-terracotta">
              ${price.toFixed(2)}
            </span>
          </div>
          
          {rating && (
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 fill-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
