import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/data/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductActions from "@/components/products/ProductActions";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for does not exist."
    };
  }
  
  return {
    title: `${product.name} | Moroccan Artisans`,
    description: product.description.substring(0, 160)
  };
}

export async function generateStaticParams() {
  const products = getProducts();
  
  return products.map((product) => ({
    slug: product.slug
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}        <nav className="mb-6 text-sm">
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
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 2}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
                {product.name}
              </h1>
              
              {/* Price */}
              <div className="mb-6">
                {product.isOnSale ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-amber-600">
                      ${product.salePrice}
                    </span>
                    <span className="text-amber-600 line-through">
                      ${product.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-amber-600">
                    ${product.price}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-amber-600 mb-6">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-amber-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Materials & Dimensions */}              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Materials</h3>
                  <ul className="list-disc pl-5 space-y-1 text-amber-600">
                    {product.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                {product.dimensions && (
                  <div>
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Dimensions</h3>
                    <p className="text-amber-600">{product.dimensions}</p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <ProductActions product={product} />
            </div>
          </div>
        </div>

        {/* Artisan Information */}        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-800 mb-6">About the Artisan</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={product.artisan.image}
                  alt={product.artisan.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>              <div>
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
      </div>
    </div>
  );
}