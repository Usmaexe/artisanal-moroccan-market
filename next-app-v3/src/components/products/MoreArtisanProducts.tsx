"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Product } from "@/types";

interface MoreArtisanProductsProps {
  currentProductId: string;
  artisanId: string;
  artisanName: string;
}

export default function MoreArtisanProducts({ 
  currentProductId, 
  artisanId, 
  artisanName 
}: MoreArtisanProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchArtisanProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products for artisan ID:', artisanId);
        console.log('Current product ID to exclude:', currentProductId);
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        console.log('Total products fetched:', response.data.length);
        
        // Filter products by artisan and exclude current product
        const artisanProducts = response.data
          .filter((p: any) => {
            const productArtisanId = String(p.artisan.artisan_id);
            const isMatch = productArtisanId === artisanId;
            const isCurrent = String(p.product_id) === currentProductId;
            
            console.log('Product:', p.name, 
              '| Artisan ID:', productArtisanId, 
              '| Expected:', artisanId, 
              '| Match:', isMatch,
              '| Current:', isCurrent);
              
            return isMatch && !isCurrent;
          })
          .map((p: any) => ({
            id: p.product_id.toString(),
            name: p.name,
            description: p.description,
            price: parseFloat(p.price),
            images: [p.image_url.startsWith('/') || p.image_url.startsWith('http') ? p.image_url : `/${p.image_url}`],
            slug: p.name.toLowerCase().replace(/\s+/g, '-'),
            category: {
              id: p.category.category_id.toString(),
              name: p.category.name,
              slug: p.category.name.toLowerCase().replace(/\s+/g, '-'),
              description: '',
              image: p.category.image_url
            },
            categoryId: p.category.category_id.toString(),
            features: [],
            materials: [],
            inStock: true,
            artisan: {
              id: p.artisan.artisan_id.toString(),
              name: p.artisan.name,
              slug: p.artisan.name.toLowerCase().replace(/\s+/g, '-'),
              image: p.artisan.image_url,
              bio: p.artisan.bio,
              location: p.artisan.location,
              specialty: p.category.name
            },
            artisanId: p.artisan.artisan_id.toString(),
            isFeatured: p.is_featured,
            isOnSale: false,
            createdAt: new Date(p.created_at || Date.now()),
            updatedAt: new Date(p.updated_at || Date.now())
          }));

        if (isMounted) {
          setProducts(artisanProducts.slice(0, 4)); // Limit to 4 products
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching artisan products:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArtisanProducts();

    return () => {
      isMounted = false;
    };
  }, [artisanId, currentProductId]);

  if (loading) {
    return <div className="h-40 flex items-center justify-center">Loading more products...</div>;
  }

  if (products.length === 0) {
    return null; // Don't show the section if there are no other products
  }

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-800">More by {artisanName}</h2>
        <Link 
          href={`/artisans/${products[0]?.artisan.slug}`}
          className="text-amber-600 hover:text-amber-800 font-medium flex items-center"
        >
          View All
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`}
            className="group"
          >
            <div className="relative h-40 mb-2 overflow-hidden rounded-md">
              <Image
                src={product.images[0].startsWith('/') || product.images[0].startsWith('http') ? product.images[0] : `/${product.images[0]}`}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-amber-800 font-medium text-sm group-hover:text-amber-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-amber-600 text-sm font-bold">{product.price} DH</p>
          </Link>
        ))}
      </div>
    </div>
  );
}