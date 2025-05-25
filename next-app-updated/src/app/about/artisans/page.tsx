import Image from "next/image";
import Link from "next/link";
import { getArtisans } from "@/data/artisans";

export const metadata = {
  title: "Meet the Artisans | Moroccan Artisans",
  description: "Discover the talented artisans behind our handcrafted Moroccan products."
};

export default function ArtisansPage() {
  // Get all unique artisans from products data
  const artisans = getArtisans();

  return (
    <div className="bg-amber-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Artisans</h1>
          <p className="text-lg text-gray-700">
            Each item in our collection is handcrafted by skilled Moroccan artisans. 
            Learn about the people behind these beautiful creations and their unique stories.
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{artisan.name}</h2>
                <p className="text-amber-600 font-medium mb-2">{artisan.specialty}</p>
                <p className="text-gray-600 mb-4">{artisan.location}</p>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {artisan.bio}
                </p>
                
                <Link
                  href={`/artisans/${artisan.slug}`}
                  className="text-amber-600 font-medium hover:underline"
                >
                  View full story &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Moroccan Craftsmanship</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Every purchase you make directly supports these artisans and helps preserve traditional 
            Moroccan crafting techniques for future generations.
          </p>
          <Link
            href="/products"
            className="bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
          >
            Shop Our Collection
          </Link>
        </div>
      </div>
    </div>
  );
}