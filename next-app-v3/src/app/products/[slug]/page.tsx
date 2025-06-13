"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";
import ProductActions from "@/components/products/ProductActions";
import ProductReviews from "@/components/products/ProductReviews";
import ArtisanInfo from "@/components/products/ArtisanInfo";
import { Product } from "@/types";
import { useEffect, useState, use } from "react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    let isMounted = true;    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the product
        const productsResponse = await axios.get(`http://localhost:5000/api/products`);
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
          images: [productData.image_url],
          slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
          category: {
            id: productData.category.category_id.toString(),
            name: productData.category.name,
            slug: productData.category.name.toLowerCase().replace(/\s+/g, '-'),
            description: '',
            image: productData.category.image_url
          },
          categoryId: productData.category.category_id.toString(),
          features: [],
          materials: [],
          inStock: true,
          artisan: {
            id: productData.artisan.artisan_id.toString(),
            name: productData.artisan.name,
            slug: productData.artisan.name.toLowerCase().replace(/\s+/g, '-'),
            image: productData.artisan.image_url,
            bio: productData.artisan.bio,
            location: productData.artisan.location,
            specialty: productData.category.name
          },
          artisanId: productData.artisan.artisan_id.toString(),
          isFeatured: productData.is_featured,
          isOnSale: false,
          createdAt: new Date(),
          updatedAt: new Date()        };

        setProduct(transformedProduct);
      } catch (err) {
        if (!isMounted) return;
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
    return <div className="text-center py-8">Loading product...</div>;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-amber-600 hover:text-amber-800">
                Home
              </Link>
            </li>
            <li className="text-amber-600">/</li>
            <li>
              <Link href="/products" className="text-amber-600 hover:text-amber-800">
                Products
              </Link>
            </li>
            <li className="text-amber-600">/</li>
            <li>
              <Link 
                href={`/categories/${product.category.slug}`} 
                className="text-amber-600 hover:text-amber-800"
              >
                {product.category.name}
              </Link>
            </li>
            <li className="text-amber-600">/</li>
            <li className="text-amber-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                {product.isOnSale && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md font-bold">
                    SALE
                  </div>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-amber-600">
                  {product.price} DH
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>

              <ProductActions product={product} />
            </div>
          </div>        </div>

        <ArtisanInfo artisan={product.artisan} />

        <ProductReviews 
          productId={product.id} 
          productName={product.name}
        />
      </div>
    </div>
  );
}