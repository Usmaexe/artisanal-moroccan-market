'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import NoProductsFound from '@/components/products/NoProductsFound';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  category: {
    name: string;
  };
  artisan: {
    name: string;
    location: string;
  };
  isOnSale?: boolean;
  salePrice?: number;
}

// Separate the component that uses useSearchParams
function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || searchParams.get('search') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    const searchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const allProducts = response.data;

        // Transform and filter products
        const searchResults = allProducts
          .map((product: any) => ({
            id: product.product_id.toString(),
            name: product.name,
            price: parseFloat(product.price),
            images: [product.image_url],
            slug: product.name.toLowerCase().replace(/\s+/g, '-'),
            category: {
              name: product.category.name
            },
            artisan: {
              name: product.artisan.name,
              location: product.artisan.location
            },
            isOnSale: false
          }))
          .filter((product: Product) => {
            const searchLower = query.toLowerCase();
            return (
              product.name.toLowerCase().includes(searchLower) ||
              product.category.name.toLowerCase().includes(searchLower) ||
              product.artisan.name.toLowerCase().includes(searchLower) ||
              product.artisan.location.toLowerCase().includes(searchLower)
            );
          });

        setProducts(searchResults);
      } catch (err) {
        setError('Failed to search products');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner message={`Searching for "${query}"...`} size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/products"
              className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
          
          <div className="flex items-center mb-2">
            <Search className="h-6 w-6 text-amber-600 mr-2" />
            <h1 className="text-3xl font-bold text-amber-800">
              Search Results
            </h1>
          </div>
          
          {query && (
            <p className="text-amber-600">
              {products.length > 0 
                ? `Found ${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`
                : `No results found for "${query}"`
              }
            </p>
          )}
        </div>

        {/* Results */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                  <h3 className="text-amber-800 font-medium text-lg mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.category.name} • By {product.artisan.name}
                  </p>
                  <p className="text-gray-500 text-xs mb-3">
                    📍 {product.artisan.location}
                  </p>
                  <div className="flex items-center justify-between">
                    {product.isOnSale ? (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 font-bold">{product.salePrice} DH</span>
                        <span className="text-gray-500 text-sm line-through">{product.price} DH</span>
                      </div>
                    ) : (
                      <span className="text-amber-600 font-bold">{product.price} DH</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <NoProductsFound
            hasFilters={true}
            searchTerm={query}
            title="No products found"
            description={`We couldn't find any products matching "${query}". Try adjusting your search terms or browse our categories below.`}
            primaryButtonText="Browse All Products"
            primaryButtonLink="/products"
            secondaryButtonText="Browse Categories"
            secondaryButtonLink="/categories"
          />
        )}
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner message="Loading search..." size="lg" />
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}