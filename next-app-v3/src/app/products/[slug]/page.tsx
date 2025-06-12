"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";
import ProductActions from "@/components/products/ProductActions";
import { Product } from "@/types";
import { useEffect, useState, use } from "react";

interface Review {
  review_id: number;
  rating: number;
  comment: string;
  product_id: number;
  customer_id: number;
  customer?: {
    email: string;
  };
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setReviewsLoading(true);
        
        // First fetch the product
        const productsResponse = await axios.get(`http://localhost:5000/api/products`);
        const productData = productsResponse.data.find((p: any) => 
          p.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        if (!isMounted) return;
        if (!productData) notFound();

        // Then fetch all reviews
        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews`);
        const productReviews = reviewsResponse.data.filter(
          (r: any) => r.product_id === productData.product_id
        );

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
          updatedAt: new Date()
        };

        setProduct(transformedProduct);
        setReviews(productReviews);
      } catch (err) {
        if (!isMounted) return;
        notFound();
      } finally {
        if (isMounted) {
          setLoading(false);
          setReviewsLoading(false);
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
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Artisan</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={"/images/artisans/profile.jpg"}
                  alt={product.artisan.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-800 mb-1">{product.artisan.name}</h3>
                <p className="text-amber-600 mb-2">
                  <span className="font-medium">Specialty:</span> {product.artisan.specialty}
                </p>
                <p className="text-amber-600 mb-2">
                  <span className="font-medium">Location:</span> {product.artisan.location}
                </p>
                <p className="text-amber-600">{product.artisan.bio}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {reviewsLoading ? (
              <div className="text-center py-4">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.review_id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src="/images/artisans/profile.jpg"
                          alt="Customer profile"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? 'text-amber-500' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.customer?.email ? review.customer.email.split('@')[0] : `Customer #${review.customer_id}`}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}