import Image from "next/image";
import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/data/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const categories = getCategories();
  const category = categories.find(c => c.slug === resolvedParams.slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you're looking for does not exist."
    };
  }
  
  return {
    title: `${category.name} | Moroccan Artisans`,
    description: category.description
  };
}

export async function generateStaticParams() {
  const categories = getCategories();
  
  return categories.map((category) => ({
    slug: category.slug
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const categories = getCategories();
  const category = categories.find(c => c.slug === resolvedParams.slug);
  
  if (!category) {
    notFound();
  }
  
  const products = getProductsByCategory(resolvedParams.slug);

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
            <li className="text-amber-600 font-medium">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <Image
            src={category.image}
            alt={category.name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
              <p className="text-white/90 mt-2 max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products in {category.name}</h2>
          
          {products.length > 0 ? (
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
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      {product.isOnSale ? (
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600 font-bold">${product.salePrice}</span>
                          <span className="text-gray-500 text-sm line-through">${product.price}</span>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-bold">${product.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600 mb-4">No products found in this category.</p>
              <Link 
                href="/products" 
                className="text-amber-600 font-medium hover:underline"
              >
                View all products
              </Link>
            </div>
          )}
        </div>

        {/* Other Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories
              .filter(c => c.id !== category.id)
              .map((otherCategory) => (
                <Link 
                  key={otherCategory.id} 
                  href={`/categories/${otherCategory.slug}`}
                  className="group"
                >
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src={otherCategory.image}
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
      </div>
    </div>
  );
} 