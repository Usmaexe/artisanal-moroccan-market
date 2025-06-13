'use client';

import { useSearch } from '@/lib/search/SearchContext';
import { X, Search, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function SearchModal() {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    isSearchOpen,
    setIsSearchOpen,
    clearSearch,
    recentSearches,
    addToRecentSearches
  } = useSearch();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, setIsSearchOpen]);
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm.trim());
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}`;
      setIsSearchOpen(false);
    }
  };

  const handleProductClick = (productName: string) => {
    addToRecentSearches(productName);
    setIsSearchOpen(false);
  };

  const handleRecentSearchClick = (recentTerm: string) => {
    setSearchTerm(recentTerm);
    addToRecentSearches(recentTerm);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <div className="flex-1 relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products, categories, artisans..."
                    className="w-full pl-12 pr-20 py-3 text-lg border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 hidden sm:block">
                    ⌘K
                  </div>
                </div>
              </form>
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close search"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh]">
            {/* Loading state */}
            {isSearching && (
              <div className="p-8 text-center">
                <LoadingSpinner message="Searching..." size="md" />
              </div>
            )}

            {/* Search results */}
            {!isSearching && searchTerm && searchResults.length > 0 && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Products ({searchResults.length})
                  </h3>                  <Link
                    href={`/search?q=${encodeURIComponent(searchTerm)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
                  >
                    View all results <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                  <div className="space-y-3">
                  {searchResults.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => handleProductClick(product.name)}
                      className="flex items-center p-3 rounded-lg hover:bg-amber-50 transition-colors group"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-amber-700 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {product.category.name} • By {product.artisan.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-1">
                          📍 {product.artisan.location}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-sm font-semibold text-amber-600">
                          {product.price} DH
                        </div>
                        {product.isOnSale && (
                          <div className="text-xs text-red-500 font-medium">
                            ON SALE
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                  
                  {searchResults.length > 6 && (                    <div className="pt-2 border-t border-gray-100">
                      <Link
                        href={`/search?q=${encodeURIComponent(searchTerm)}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-center p-3 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        View {searchResults.length - 6} more results
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No results */}
            {!isSearching && searchTerm && searchResults.length === 0 && (
              <div className="p-8 text-center">
                <div className="mb-4">
                  <Search className="h-12 w-12 text-gray-300 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  We couldn't find any products matching "{searchTerm}"
                </p>
                <div className="space-y-2">
                  <button
                    onClick={clearSearch}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    Clear search
                  </button>
                  <div className="text-gray-400">or</div>
                  <Link
                    href="/products"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    Browse all products
                  </Link>
                </div>
              </div>
            )}

            {/* Recent searches and suggestions when no search term */}
            {!searchTerm && (
              <div className="p-6">
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Recent searches
                    </h3>
                    <div className="space-y-2">
                      {recentSearches.map((recentTerm, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearchClick(recentTerm)}
                          className="flex items-center w-full p-2 text-left rounded-lg hover:bg-amber-50 transition-colors group"
                        >
                          <Search className="h-4 w-4 text-gray-400 mr-3" />
                          <span className="text-gray-700 group-hover:text-amber-700">
                            {recentTerm}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}                {/* Popular searches */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Popular searches
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Ceramic bowls',
                      'Berber carpets',
                      'Leather poufs',
                      'Moroccan lanterns',
                      'Argan oil',
                      'Silver jewelry'
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleRecentSearchClick(term)}
                        className="flex items-center w-full p-2 text-left rounded-lg hover:bg-amber-50 transition-colors group"
                      >
                        <Search className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-gray-700 group-hover:text-amber-700">
                          {term}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Browse by category
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Pottery & Ceramics', slug: 'pottery-ceramics' },
                      { name: 'Carpets & Rugs', slug: 'carpets-rugs' },
                      { name: 'Leather Goods', slug: 'leather-goods' },
                      { name: 'Jewelry', slug: 'jewelry' },
                      { name: 'Home Decor', slug: 'home-decor' },
                      { name: 'Basketry', slug: 'basketry' }
                    ].map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors text-center"
                      >
                        <span className="text-sm font-medium text-gray-700 hover:text-amber-700">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {searchTerm && !isSearching && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Press Enter to search all products</span>
                <span>ESC to close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
