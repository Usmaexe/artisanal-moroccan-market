"use client";

import { Star as StarIcon } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({ 
  rating,
  maxRating = 5,
  size = 20,
  className = "",
  interactive = false,
  onChange
}: StarRatingProps) {
  const handleClick = (starIndex: number) => {
    if (interactive && onChange) {
      onChange(starIndex + 1);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxRating)].map((_, i) => (
        <StarIcon
          key={i}
          className={`
            ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
            ${interactive ? "cursor-pointer" : ""} 
            transition-colors
          `}
          size={size}
          onClick={() => interactive && handleClick(i)}
          onMouseEnter={() => interactive && onChange && onChange(i + 1)}
          onMouseLeave={() => interactive && onChange && onChange(rating)}
          data-testid={`star-${i + 1}`}
          aria-label={`${i + 1} star${i > 0 ? 's' : ''}`}
        />
      ))}
    </div>
  );
}
