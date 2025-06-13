'use client';

import { Search } from 'lucide-react';
import { useSearch } from '@/lib/search/SearchContext';

export default function SearchIndicator() {
  const { setIsSearchOpen } = useSearch();

  return (
    <button 
      onClick={() => setIsSearchOpen(true)}
      className="relative p-2 text-amber-600 hover:text-amber-800 transition-colors group"
      aria-label="Search products"
      title="Search products (⌘K)"
    >
      <Search className="h-6 w-6" />
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Search (⌘K)
      </div>
    </button>
  );
}
