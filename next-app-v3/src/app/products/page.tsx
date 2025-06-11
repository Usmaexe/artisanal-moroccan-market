import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/data/products";

export const metadata = {
  title: "Products | Moroccan Artisans",
  description: "Discover authentic Moroccan artisanal products crafted with traditional techniques."
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">All Products</h1>
          <p className="text-amber-600">Discover our collection of handmade Moroccan treasures</p>
        </div>

        {/* Filters - can be expanded in future */}        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-amber-800 font-medium">Sort by:</span>
            <select className="rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50" title="Sort products">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
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
              </div>              <div className="p-4">
                <h3 className="text-amber-800 font-medium text-lg mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  {product.isOnSale ? (
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 font-bold">${product.salePrice}</span>
                      <span className="text-amber-600 text-sm line-through">${product.price}</span>
                    </div>
                  ) : (
                    <span className="text-amber-600 font-bold">${product.price}</span>
                  )}
                  <span className="text-amber-600 text-sm">{product.category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 