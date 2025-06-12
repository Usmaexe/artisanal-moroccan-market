"use client";

import { Search, Filter } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  categoryFilter,
  setCategoryFilter,
  categories
}: FilterBarProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-amber-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-amber-200 rounded-md leading-5 bg-white placeholder-amber-400 focus:outline-none focus:placeholder-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800"
          />
        </div>        {/* Category Filter */}
        <div className="relative">
          <label htmlFor="category-filter" className="sr-only">Filter by category</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-amber-400" />
          </div>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="block w-full pl-10 pr-3 py-2 border border-amber-200 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Sort Options */}
        <div className="relative">
          <label htmlFor="sort-options" className="sr-only">Sort products</label>
          <select
            id="sort-options"
            value={sortOption}
            onChange={handleSortChange}
            className="block w-full px-3 py-2 border border-amber-200 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-800 appearance-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low-high">Sort: Price Low to High</option>
            <option value="price-high-low">Sort: Price High to Low</option>
            <option value="newest">Sort: Newest First</option>
            <option value="name-a-z">Sort: Name A-Z</option>
            <option value="name-z-a">Sort: Name Z-A</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Summary */}
      {(searchTerm || categoryFilter !== "all") && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-amber-600 font-medium">Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              Search: "{searchTerm}"
              <button
                type="button"
                className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-amber-400 hover:bg-amber-200 hover:text-amber-500 focus:outline-none focus:bg-amber-500 focus:text-white"
                onClick={() => setSearchTerm("")}
              >
                <span className="sr-only">Remove search filter</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="m1 1 6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          )}
          {categoryFilter !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              Category: {categoryFilter}
              <button
                type="button"
                className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-amber-400 hover:bg-amber-200 hover:text-amber-500 focus:outline-none focus:bg-amber-500 focus:text-white"
                onClick={() => setCategoryFilter("all")}
              >
                <span className="sr-only">Remove category filter</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="m1 1 6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
