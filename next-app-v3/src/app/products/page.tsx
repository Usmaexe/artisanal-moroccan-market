"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "@/components/products/FilterBar";
import NoProductsFound from "@/components/products/NoProductsFound";
import LoadingSpinner from "@/components/common/LoadingSpinner";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  
  const searchParams = useSearchParams();

  // Initialize search term from URL params
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

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
          // Extract unique categories
        const uniqueCategories = [...new Set(apiProducts.map((product: Product) => product.category.name))] as string[];
        setCategories(uniqueCategories);
        
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
    // Apply filtering and sorting whenever any filter option changes
    let filtered = [...products];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product =>
        product.category.name.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => 
          (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
    }

    setFilteredProducts(filtered);
  }, [sortOption, searchTerm, categoryFilter, products]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSortOption("featured");
  };
  const hasFilters = searchTerm !== "" || categoryFilter !== "all";

  if (isLoading) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">All Products</h1>
            <p className="text-amber-600">Discover our collection of handmade Moroccan treasures</p>
          </div>
          <LoadingSpinner message="Loading products..." size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">All Products</h1>
            <p className="text-amber-600">Discover our collection of handmade Moroccan treasures</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.598 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Products</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">All Products</h1>
          <p className="text-amber-600">Discover our collection of handmade Moroccan treasures</p>
        </div>        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-amber-700">
              {filteredProducts.length === 0 ? (
                hasFilters ? "No products found" : "No products available"
              ) : (
                <>
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  {hasFilters && ` matching your filters`}
                </>
              )}
            </p>
          </div>
        )}

        {/* Products Grid or No Products Found */}
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
        ) : (
          <NoProductsFound
            hasFilters={hasFilters}
            onClearFilters={clearFilters}
            searchTerm={searchTerm}
            categoryFilter={categoryFilter !== "all" ? categoryFilter : undefined}
          />
        )}
      </div>
    </div>
  );
}