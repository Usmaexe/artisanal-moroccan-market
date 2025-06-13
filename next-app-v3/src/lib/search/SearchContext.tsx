'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import axios from 'axios';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Product[];
  isSearching: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  clearSearch: () => void;
  recentSearches: string[];
  addToRecentSearches: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage on initial render
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Failed to parse recent searches from localStorage:', error);
        localStorage.removeItem('recentSearches');
      }
    }
  }, []);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Debounced search effect
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        // Fetch all products from API
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = response.data;

        // Transform API data to match our Product interface
        const transformedProducts: Product[] = allProducts.map((product: any) => ({
          id: product.product_id.toString(),
          name: product.name,
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          description: product.description,
          price: parseFloat(product.price),
          images: [product.image_url],
          category: {
            id: product.category.category_id.toString(),
            name: product.category.name,
            slug: product.category.name.toLowerCase().replace(/\s+/g, '-'),
            description: '',
            image: product.category.image_url
          },
          categoryId: product.category.category_id.toString(),
          features: [],
          materials: [],
          inStock: true,
          artisan: {
            id: product.artisan.artisan_id.toString(),
            name: product.artisan.name,
            slug: product.artisan.name.toLowerCase().replace(/\s+/g, '-'),
            image: product.artisan.image_url,
            bio: product.artisan.bio,
            location: product.artisan.location,
            specialty: product.category.name
          },
          artisanId: product.artisan.artisan_id.toString(),
          isFeatured: product.is_featured,
          isOnSale: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }));        // Filter products based on search term
        const filteredProducts = transformedProducts.filter(product => {
          const searchLower = searchTerm.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.category.name.toLowerCase().includes(searchLower) ||
            product.artisan.name.toLowerCase().includes(searchLower) ||
            product.artisan.location.toLowerCase().includes(searchLower) ||
            // Search in features if they exist
            product.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
            // Search in materials if they exist
            product.materials.some(material => material.toLowerCase().includes(searchLower))
          );
        });

        setSearchResults(filteredProducts);
      } catch (error) {
        console.error('Error searching products:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const addToRecentSearches = (term: string) => {
    if (!term.trim()) return;

    setRecentSearches(prev => {
      // Remove existing term if it exists
      const filtered = prev.filter(search => search.toLowerCase() !== term.toLowerCase());
      // Add to beginning and limit to 5 recent searches
      return [term, ...filtered].slice(0, 5);
    });
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        isSearching,
        isSearchOpen,
        setIsSearchOpen,
        clearSearch,
        recentSearches,
        addToRecentSearches
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
