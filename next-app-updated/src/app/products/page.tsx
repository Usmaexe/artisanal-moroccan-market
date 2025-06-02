"use client";

import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/data/products";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function ProductsPage() {
  const allProducts = getProducts();
  const allCategories = [...new Set(allProducts.map(product => product.category.name))];
  
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("Featured");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 1) {
      const productNames = allProducts.map(product => product.name);
      const filtered = productNames.filter(name => 
        name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, allProducts]);

  // Filter and sort products
  useEffect(() => {
    let result = [...allProducts];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category.name === selectedCategory);
    }
    
    // Sort products
    switch (sortOption) {
      case "Price: Low to High":
        result.sort((a, b) => (a.isOnSale ? a.salePrice : a.price) - (b.isOnSale ? b.salePrice : b.price));
        break;
      case "Price: High to Low":
        result.sort((a, b) => (b.isOnSale ? b.salePrice : b.price) - (a.isOnSale ? a.salePrice : a.price));
        break;
      case "Newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "Best Selling":
        result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      // Featured is default, so no sorting needed
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortOption, allProducts]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle search suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSearchFocus(false);
  };
  
  // Handle category selection change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  // Remove category filter
  const handleRemoveFilter = () => {
    setSelectedCategory('');
  };

  // Handle search reset
  const handleSearchReset = () => {
    setSearchTerm('');
    setSearchFocus(false);
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-amber-900 text-white">
        <div className="bg-auto container mx-auto px-4 py-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Authentic Moroccan Treasures</h1>
          <p className="text-xl max-w-2xl">Discover handcrafted pieces that bring the rich heritage and artistry of Morocco into your home</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <p className="text-gray-600 mt-1">{filteredProducts.length} items</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar with Conditional Reset Button */}
            <div className="relative" ref={searchRef}>
              <div className="flex w-full">
                <div className={`relative ${searchTerm ? 'w-3/4' : 'w-full'}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setSearchFocus(true)}
                    className={`block w-full pl-10 pr-4 py-2 border-2 text-amber-800 border-gray-300 ${
                      searchTerm ? 'rounded-l-lg' : 'rounded-lg'
                    } focus:ring-amber-500 focus:border-amber-500`}
                  />
                </div>
                {searchTerm && (
                  <button 
                    onClick={handleSearchReset}
                    className="w-1/4 bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center rounded-r-lg border-2 border-amber-500"
                  >
                    <FiX className="text-white mr-1" /> Clear
                  </button>
                )}
              </div>
              
              {/* Search Suggestions */}
              {searchFocus && suggestions.length > 0 && (
                <div className={`absolute z-10 ${searchTerm ? 'w-3/4' : 'w-full'} mt-1 bg-white border border-gray-300 rounded-md shadow-lg`}>
                  <ul className="py-1 overflow-auto max-h-60">
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 hover:bg-amber-100 cursor-pointer text-amber-800"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="block appearance-none w-full bg-white border-2 border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none text-amber-800 focus:ring-amber-800 focus:border-amber-800"
                >
                  <option value="">All Categories</option>
                  {allCategories.map(category => (
                    <option key={category} value={category} className="text-amber-800">{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown />
                </div>
              </div>
            </div>
            
            {/* Sort By */}
            <div className="relative">
              <div className="relative">
                <select 
                  value={sortOption}
                  onChange={handleSortChange}
                  className="block appearance-none w-full bg-white border-2 text-amber-800 border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Best Selling</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown />
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Category Filter */}
          {selectedCategory && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {selectedCategory}
                <button 
                  type="button" 
                  onClick={handleRemoveFilter}
                  className="ml-1 inline-flex text-amber-500 focus:outline-none cursor-pointer"
                >
                  <span className="sr-only">Remove filter</span>
                  &times;
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    {product.isOnSale ? (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 font-bold">${product.salePrice}</span>
                        <span className="text-gray-500 text-sm line-through">${product.price}</span>
                      </div>
                    ) : (
                      <span className="text-amber-600 font-bold">${product.price}</span>
                    )}
                    <span className="text-gray-500 text-sm">{product.category.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No products found matching your criteria.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory(''); setSortOption('Featured');}} 
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Reset All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}