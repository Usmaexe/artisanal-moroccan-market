import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/data/products";

export const metadata = {
  title: "Categories | Moroccan Artisans",
  description: "Explore categories of authentic Moroccan artisanal products."
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="bg-amber-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Product Categories</h1>
          <p className="text-amber-600">Explore our collection organized by craft traditions</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Heritage Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-96 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1590502160462-58dfa10b63d4"
                alt="Moroccan craftsman"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Preserving Moroccan Craft Heritage</h2>
              <p className="text-amber-600 mb-6">
                Each category represents centuries of tradition and craftsmanship passed down through generations. 
                By exploring these categories and supporting Moroccan artisans, you help preserve traditional 
                techniques and cultural heritage that might otherwise be lost in today&apos;s mass-produced world.
              </p>
              <Link 
                href="/about"
                className="text-amber-600 font-medium flex items-center hover:underline"
              >
                Learn more about our mission
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 