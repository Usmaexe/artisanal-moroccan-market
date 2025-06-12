"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  isOnSale?: boolean;
  images: string[];
  slug: string;
  category: {
    name: string;
  };
  createdAt?: string; // Added for sorting by newest
  isFeatured?: boolean; // Added for featured sorting
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const apiProducts = response.data.map((product: any) => ({
          id: product.product_id,
          name: product.name,
          price: parseFloat(product.price),
          images: [product.image_url],
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          category: {
            name: product.category.name
          },
          isOnSale: false,
          createdAt: product.created_at, // Added from API
          isFeatured: product.is_featured // Added from API
        }));
        setProducts(apiProducts);
        setFilteredProducts(apiProducts); // Initialize filtered products
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply sorting whenever sortOption or products change
    const sortedProducts = [...products];
    
    switch(sortOption) {
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sortedProducts.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        break;
      case "featured":
      default:
        sortedProducts.sort((a, b) => 
          (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [sortOption, products]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  if (isLoading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading products: {error}</div>;

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">All Products</h1>
          <p className="text-amber-600">Discover our collection of handmade Moroccan treasures</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-amber-800 font-medium">Sort by:</span>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
              onChange={handleSortChange}
              value={sortOption}
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
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
                <h3 className="text-amber-800 font-medium text-lg mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  {product.isOnSale ? (
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 font-bold">{product.salePrice} DH</span>
                      <span className="text-gray-500 text-sm line-through">{product.price} DH</span>
                    </div>
                  ) : (
                    <span className="text-amber-600 font-bold">{product.price} DH</span>
                  )}
                  <span className="text-amber-600 text-sm">{product.category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}