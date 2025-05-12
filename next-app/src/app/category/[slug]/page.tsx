"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import ProductGrid from '../../../../components/products/ProductGrid';
import { Button } from '../../../../components/ui/button';
import { Slider } from '../../../../components/ui/slider';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Input } from '../../../../components/ui/input';
import { ChevronDown, ChevronUp, FilterX, SortAsc } from 'lucide-react';

// Dummy product data - in a real app this would come from an API
const categoryProducts = [
  {
    id: 1,
    name: 'Traditional Berber Rug',
    price: 349.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3',
    category: 'Rugs & Carpets',
    region: 'Atlas Mountains',
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    rating: 4.8,
    slug: 'traditional-berber-rug'
  },
  {
    id: 2,
    name: 'Handwoven Kilim Carpet',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1602990721338-9cbb5b983c4d?ixlib=rb-4.0.3',
    category: 'Rugs & Carpets',
    region: 'Taznakht',
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    rating: 4.5,
    slug: 'handwoven-kilim-carpet'
  },
  {
    id: 3,
    name: 'Beni Ourain Wool Rug',
    price: 499.99,
    originalPrice: 599.99,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3',
    category: 'Rugs & Carpets',
    region: 'Middle Atlas',
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    rating: 5.0,
    slug: 'beni-ourain-wool-rug'
  },
  {
    id: 4,
    name: 'Moroccan Ceramic Bowl',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1590422749897-47c47673ba0b?ixlib=rb-4.0.3',
    category: 'Pottery & Ceramics',
    region: 'Fes',
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    rating: 4.7,
    slug: 'moroccan-ceramic-bowl'
  },
  {
    id: 5,
    name: 'Handcrafted Leather Pouf',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3',
    category: 'Leather Goods',
    region: 'Marrakech',
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    rating: 4.9,
    slug: 'handcrafted-leather-pouf'
  },
  {
    id: 6,
    name: 'Cedar Wood Jewelry Box',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3',
    category: 'Woodwork',
    region: 'Essaouira',
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    rating: 4.6,
    slug: 'cedar-wood-jewelry-box'
  },
];

// Category name mapping
const categoryMapping: { [key: string]: string } = {
  'rugs-carpets': 'Rugs & Carpets',
  'pottery-ceramics': 'Pottery & Ceramics',
  'leather-goods': 'Leather Goods',
  'woodwork': 'Woodwork',
  'textiles-fabrics': 'Textiles & Fabrics',
  'jewelry': 'Jewelry',
  'home-decor': 'Home Decor',
  'clothing-accessories': 'Clothing & Accessories',
  'featured': 'Featured Products'
};

// Regions for filtering
const regions = [
  'Atlas Mountains',
  'Fes',
  'Marrakech',
  'Essaouira',
  'Taznakht',
  'Middle Atlas',
  'Rabat',
  'Casablanca',
  'Chefchaouen',
  'Tiznit',
];

export default function CategoryPage() {  const params = useParams();
  const slug = params?.slug as string;
  const categoryName = categoryMapping[slug] || 'All Products';
  
  // Filter state
  const [priceRange, setPriceRange] = useState<number[]>([0, 600]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Toggle region selection
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };
  
  // Filter products by category and other filters
  const filteredProducts = categoryProducts
    .filter(product => 
      (slug === 'featured' ? product.isFeatured : product.category === categoryName) && 
      (product.price >= priceRange[0] && product.price <= priceRange[1]) && 
      (selectedRegions.length === 0 || selectedRegions.includes(product.region))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
          return a.isNew ? -1 : b.isNew ? 1 : 0;
        case 'rating':
          return b.rating - a.rating;
        default: // featured
          return b.isFeatured ? 1 : a.isFeatured ? -1 : 0;
      }
    });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-morocco-charcoal">{categoryName}</h1>
        <p className="text-gray-600 mt-2">
          Discover authentic handcrafted {categoryName.toLowerCase()} made by skilled Moroccan artisans.
        </p>
      </div>
      
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="flex items-center">
            <FilterX size={16} className="mr-2" /> 
            Filter & Sort
          </span>
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Sort By</h2>
              <select
                className="w-full border-gray-300 rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Price Range</h2>
              <div className="space-y-6">
                <Slider
                  min={0}
                  max={600}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between">
                  <div className="w-1/2 pr-2">
                    <Input 
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setPriceRange([value, priceRange[1]]);
                      }}
                      min={0}
                      max={priceRange[1]}
                    />
                  </div>
                  <span>-</span>
                  <div className="w-1/2 pl-2">
                    <Input 
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setPriceRange([priceRange[0], value]);
                      }}
                      min={priceRange[0]}
                      max={600}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Region</h2>
              <div className="space-y-2">
                {regions.map(region => (
                  <div key={region} className="flex items-center">
                    <Checkbox 
                      id={`region-${region}`}
                      checked={selectedRegions.includes(region)}
                      onCheckedChange={() => toggleRegion(region)}
                    />
                    <label 
                      htmlFor={`region-${region}`}
                      className="ml-2 text-sm text-gray-700 cursor-pointer"
                    >
                      {region}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reset filters - Mobile only */}
            <div className="mt-6 md:hidden">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setPriceRange([0, 600]);
                  setSelectedRegions([]);
                  setSortBy('featured');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredProducts.length} products</p>
            
            {/* Sort - Desktop only */}
            <div className="hidden md:flex items-center">
              <span className="mr-2 text-sm text-gray-600">Sort:</span>
              <select
                className="border-gray-300 rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-xl font-medium text-gray-700 mb-4">No products found</h2>
              <p className="text-gray-500 mb-6">
                Try changing your filter settings to see more products.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setPriceRange([0, 600]);
                  setSelectedRegions([]);
                  setSortBy('featured');
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
