"use client";

import Image from "next/image";
import Link from "next/link";

interface Artisan {
  id: string;
  name: string;
  slug: string;
  image: string;
  bio: string;
  location: string;
  specialty: string;
}

interface ArtisanInfoProps {
  artisan: Artisan;
}

export default function ArtisanInfo({ artisan }: ArtisanInfoProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Artisan</h2>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-amber-100">
            <Image
              src={artisan.image || "/images/artisans/profile.jpg"}
              alt={artisan.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-amber-800 mb-1">
                {artisan.name}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm">
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
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {artisan.bio}
            </p>
            
            <div className="flex gap-3">
              <Link
              href={`/artisans/${artisan.slug}`}
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              View Artisan Profile
            </Link>
              <Link
                href={`/products?artisan=${artisan.slug}`}
                className="inline-flex items-center px-4 py-2 bg-white text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors duration-200 font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                More Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
