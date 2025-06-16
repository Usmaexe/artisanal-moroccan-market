"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Artisan, Product } from "@/types";
import ArtisanProducts from "@/components/artisans/ArtisanProducts";

interface ArtisanPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ArtisanPage({ params }: ArtisanPageProps) {
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all products
        const productsResponse = await axios.get(`http://localhost:5000/api/products`);
        
        // Find the artisan by slug
        const artisanData = productsResponse.data.find((p: any) => 
          p.artisan.name.toLowerCase().replace(/\s+/g, '-') === slug
        )?.artisan;
        
        if (!isMounted) return;
        if (!artisanData) notFound();

        // Transform artisan data
        const transformedArtisan: Artisan = {
          id: artisanData.artisan_id.toString(),
          name: artisanData.name,
          slug: artisanData.name.toLowerCase().replace(/\s+/g, '-'),
          image: artisanData.image_url.startsWith('/') || artisanData.image_url.startsWith('http') ? artisanData.image_url : `/${artisanData.image_url}`,
          bio: artisanData.bio,
          location: artisanData.location,
          specialty: artisanData.specialty || "Various Crafts"
        };

        // Filter products by this artisan
        const artisanProducts = productsResponse.data
          .filter((p: any) => p.artisan.artisan_id === artisanData.artisan_id)
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
              image: p.category.image_url.startsWith('/') || p.category.image_url.startsWith('http') ? p.category.image_url : `/${p.category.image_url}`
            },
            categoryId: p.category.category_id.toString(),
            features: [],
            materials: [],
            inStock: true,
            artisan: transformedArtisan,
            artisanId: transformedArtisan.id,
            isFeatured: p.is_featured,
            isOnSale: false,
            createdAt: new Date(p.created_at || Date.now()),
            updatedAt: new Date(p.updated_at || Date.now())
          }));

        setArtisan(transformedArtisan);
        setProducts(artisanProducts);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching artisan data:", err);
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
    return <div className="text-center py-8">Loading artisan profile...</div>;
  }

  if (!artisan) {
    notFound();
  }

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Artisan Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-amber-100">
              <Image
                src={artisan.image || "/images/artisans/profile.jpg"}
                alt={artisan.name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-amber-800 mb-2">{artisan.name}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start mb-4">
                <div className="flex items-center text-amber-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
                  </svg>
                  <span className="font-medium">Specialty:</span>
                  <span className="ml-1">{artisan.specialty}</span>
                </div>
                <div className="flex items-center text-amber-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Location:</span>
                  <span className="ml-1">{artisan.location}</span>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-amber-800 mb-2">About {artisan.name}</h2>
                <p className="text-gray-700 leading-relaxed">{artisan.bio}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Artisan Products */}
        <ArtisanProducts products={products} artisanName={artisan.name} />
      </div>
    </div>
  );
}