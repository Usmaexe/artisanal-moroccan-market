"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import NoProductsFound from "@/components/products/NoProductsFound";

interface Category {
  category_id: number;
  name: string;
  image_url: string;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  category: {
    category_id: number;
    name: string;
  };
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Properly unwrap params with React.use()
  const { slug } = use(params);

  // Convert slug back to category name
  const categoryName = slug
    .split('-')
    .map(word => word === 'and' ? '&' : word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch categories
        const categoriesResponse = await axios.get("http://localhost:5000/api/categories");
        const categoriesData = categoriesResponse.data;
        setCategories(categoriesData);

        // Find current category
        const category = categoriesData.find((c: Category) => 
          c.name.toLowerCase() === categoryName.toLowerCase()
        );
        
        if (!category) {
          notFound();
          return;
        }
        
        setCurrentCategory(category);

        // Fetch products for this category
        const productsResponse = await axios.get("http://localhost:5000/api/products");
        const allProducts = productsResponse.data;
        
        // Filter products by category
        const categoryProducts = allProducts.filter((product: any) => 
          product.category.name.toLowerCase() === category.name.toLowerCase()
        );
        
        setProducts(categoryProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  if (isLoading) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner message="Loading category..." size="lg" />
        </div>
      </div>
    );
  }

  if (error || !currentCategory) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category Not Found</h3>
            <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
            <Link 
              href="/categories" 
              className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-amber-600">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/categories" className="text-gray-500 hover:text-amber-600">
                Categories
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-amber-600 font-medium">{currentCategory.name}</li>
          </ol>
        </nav>        {/* Category Header */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <Image
            src={currentCategory.image_url || "/images/categories/default-category.jpg"}
            alt={currentCategory.name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{currentCategory.name}</h1>
              <p className="text-white/90 mt-2 max-w-2xl">
                Discover authentic {currentCategory.name.toLowerCase()} crafted by skilled Moroccan artisans
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products in {currentCategory.name}</h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link 
                  key={product.product_id} 
                  href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={product.image_url || "/images/products/default-product.jpg"}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.is_featured && (
                      <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-bold">{product.price} DH</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <NoProductsFound
              hasFilters={false}
              noFiltersTitle={`No ${currentCategory.name} Products`}
              noFiltersDescription={`We don't have any ${currentCategory.name.toLowerCase()} products available at the moment. Check back soon for new additions!`}
              primaryButtonText="Contact Us"
              primaryButtonLink="/contact"
              secondaryButtonText="Browse Other Categories"
              secondaryButtonLink="/categories"
              footerText="Interested in this category? Contact us to see if we can source specific items for you."
            />
          )}
        </div>

        {/* Other Categories */}
        {categories.length > 1 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories
                .filter(c => c.category_id !== currentCategory.category_id)
                .map((otherCategory) => (
                  <Link 
                    key={otherCategory.category_id} 
                    href={`/categories/${otherCategory.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                    className="group"                  >
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={otherCategory.image_url || "/images/categories/default-category.jpg"}
                        alt={otherCategory.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="text-white text-lg font-semibold text-center px-2">
                          {otherCategory.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}