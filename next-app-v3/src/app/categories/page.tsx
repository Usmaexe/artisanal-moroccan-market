"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface Category {
  category_id: number;
  name: string;
  image_url: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">Product Categories</h1>
            <p className="text-amber-600">Explore our collection organized by craft traditions</p>
          </div>
          <LoadingSpinner message="Loading categories..." size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">Product Categories</h1>
            <p className="text-amber-600">Explore our collection organized by craft traditions</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.598 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Categories</h3>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Product Categories</h1>
          <p className="text-amber-600">Explore our collection organized by craft traditions</p>
        </div>        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.category_id} 
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="group"
            >
              <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={category.image_url || "/images/categories/default-category.jpg"}
                  alt={category.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">Discover authentic {category.name.toLowerCase()} crafted by skilled artisans</p>
                </div>
              </div>
            </Link>
          ))}
        </div>{/* Heritage Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-96 md:h-auto">
              <Image
                src="/images/heritage/Craft_Heritage.jpg"
                alt="Moroccan craftsman"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Preserving Moroccan Craft Heritage</h2>
              <p className="text-amber-600 mb-6">
                Each category represents centuries of tradition and craftsmanship passed down through generations. 
                By exploring these categories and supporting Moroccan artisans, you help preserve traditional 
                techniques and cultural heritage that might otherwise be lost in today&apos;s mass-produced world.
              </p>
              <Link 
                href="/about"
                className="text-amber-600 font-medium flex items-center hover:underline"
              >
                Learn more about our mission
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}