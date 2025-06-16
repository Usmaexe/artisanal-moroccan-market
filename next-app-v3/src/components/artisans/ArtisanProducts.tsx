"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ArtisanProductsProps {
  products: Product[];
  artisanName: string;
}

export default function ArtisanProducts({ products, artisanName }: ArtisanProductsProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-amber-500 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600 mb-4">{artisanName} doesn't have any products available at the moment.</p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-amber-800 mb-6">Products by {artisanName}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-60 overflow-hidden">
              <Image
                src={product.images[0].startsWith('/') || product.images[0].startsWith('http') ? product.images[0] : `/${product.images[0]}`}
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
                {product.isOnSale && product.salePrice ? (
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
    </div>
  );
}