"use client";

import Image from "next/image";
import Link from "next/link";
import ProductActions from "@/components/products/ProductActions";
import { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <>
      {/* Breadcrumb Navigation */}
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

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
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

          {/* Product Info */}
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
    </>
  );
}
