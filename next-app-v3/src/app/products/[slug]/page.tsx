"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import ProductReviews from "@/components/products/ProductReviews";
import ArtisanInfo from "@/components/products/ArtisanInfo";
import { Product } from "@/types";
import { useEffect, useState, use } from "react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper function to normalize image URLs
const normalizeImageUrl = (url: string): string => {
  if (!url) return '/images/placeholder.jpg'; // Fallback image
  
  // If it's already an absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it starts with a slash, return as is
  if (url.startsWith('/')) {
    return url;
  }
  
  // Otherwise, add leading slash
  return `/${url}`;
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the product
        const productsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const productData = productsResponse.data.find((p: any) => 
          p.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        if (!isMounted) return;
        if (!productData) notFound();

        const transformedProduct: Product = {
          id: productData.product_id.toString(),
          name: productData.name,
          description: productData.description,
          price: parseFloat(productData.price),
          images: [normalizeImageUrl(productData.image_url)],
          slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
          category: {
            id: productData.category.category_id.toString(),
            name: productData.category.name,
            slug: productData.category.name.toLowerCase().replace(/\s+/g, '-'),
            description: '',
            image: normalizeImageUrl(productData.category.image_url)
          },
          categoryId: productData.category.category_id.toString(),
          features: [],
          materials: [],
          inStock: true,
          artisan: {
            id: productData.artisan.artisan_id.toString(),
            name: productData.artisan.name,
            slug: productData.artisan.name.toLowerCase().replace(/\s+/g, '-'),
            image: normalizeImageUrl(productData.artisan.image_url),
            bio: productData.artisan.bio,
            location: productData.artisan.location,
            specialty: productData.category.name
          },
          artisanId: productData.artisan.artisan_id.toString(),
          isFeatured: productData.is_featured,
          isOnSale: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        setProduct(transformedProduct);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching product:', err);
        notFound();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-amber-50 min-h-screen flex items-center justify-center">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-amber-800">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
        <ArtisanInfo artisan={product.artisan} />
        <ProductReviews 
          productId={product.id} 
          productName={product.name}
        />
      </div>
    </div>
  );
}