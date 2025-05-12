"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

// Dummy artisan data
const artisans = [
  {
    id: 1,
    name: 'Ahmed Benali',
    speciality: 'Rug Weaving',
    region: 'Atlas Mountains',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
    bio: 'Ahmed has been weaving traditional Berber rugs for over 30 years, using techniques passed down from his grandfather. His work features vibrant colors and geometric patterns inspired by the mountains where he lives.',
    featured: true
  },
  {
    id: 2,
    name: 'Fatima Ouazzani',
    speciality: 'Pottery',
    region: 'Fes',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3',
    bio: 'Fatima creates stunning ceramics in the traditional Fassi style. Her workshop in the old medina of Fes produces both decorative pieces and functional pottery, all hand-painted with intricate designs.',
    featured: true
  },
  {
    id: 3,
    name: 'Omar Tahiri',
    speciality: 'Leather Work',
    region: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3',
    bio: 'Omar&apos;s family has been working with leather in Marrakech for four generations. His workshop produces bags, poufs, and other leather goods using traditional tanning and dyeing methods.',
    featured: false
  },
  {
    id: 4,
    name: 'Amina El Mansouri',
    speciality: 'Textiles',
    region: 'Rabat',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3',
    bio: 'Amina specializes in handwoven textiles including blankets, scarves, and tablecloths. She combines traditional Moroccan patterns with contemporary designs to create unique pieces.',
    featured: true
  },
  {
    id: 5,
    name: 'Youssef Berrada',
    speciality: 'Wood Carving',
    region: 'Essaouira',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3',
    bio: 'Youssef creates intricate wooden furniture and decorative items in his workshop in Essaouira. He uses local thuya wood to craft tables, boxes, and art pieces featuring traditional geometric patterns.',
    featured: false
  },
  {
    id: 6,
    name: 'Nadia Chaoui',
    speciality: 'Jewelry',
    region: 'Tiznit',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3',
    bio: 'Nadia crafts stunning silver jewelry inspired by traditional Amazigh designs. Her pieces feature intricate engravings and colorful stones that reflect the rich heritage of southern Morocco.',
    featured: true
  }
];

export default function ArtisansPage() {
  // Featured artisans at the top
  const featuredArtisans = artisans.filter(artisan => artisan.featured);
  // Rest of the artisans
  const otherArtisans = artisans.filter(artisan => !artisan.featured);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-morocco-charcoal mb-4">
          Meet Our Artisans
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Behind every piece in our collection stands a skilled artisan who has inherited generations of craftsmanship.
          Learn about the people who create our beautiful products and the traditions they preserve.
        </p>
      </div>

      {/* Featured Artisans Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-heading font-semibold mb-8 text-morocco-terracotta">Featured Artisans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtisans.map((artisan) => (
            <div key={artisan.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-60">
                <Image 
                  src={artisan.image} 
                  alt={artisan.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-1">{artisan.name}</h3>
                <p className="text-morocco-terracotta mb-1">{artisan.speciality}</p>
                <p className="text-gray-500 text-sm mb-4">{artisan.region}</p>
                <p className="text-gray-700 mb-4">{artisan.bio}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/artisans/${artisan.id}`}>View Profile</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Other Artisans */}
      <section>
        <h2 className="text-2xl font-heading font-semibold mb-8 text-morocco-terracotta">More Talented Craftspeople</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArtisans.map((artisan) => (
            <div key={artisan.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-60">
                <Image 
                  src={artisan.image} 
                  alt={artisan.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-1">{artisan.name}</h3>
                <p className="text-morocco-terracotta mb-1">{artisan.speciality}</p>
                <p className="text-gray-500 text-sm mb-4">{artisan.region}</p>
                <p className="text-gray-700 mb-4">{artisan.bio}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/artisans/${artisan.id}`}>View Profile</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <div className="mt-16 bg-morocco-cream rounded-lg p-8 text-center">
        <h2 className="text-2xl font-heading font-semibold mb-4">Supporting Artisanal Craftsmanship</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          By purchasing from MoroccanArtisans, you&apos;re helping preserve traditional crafts and
          supporting the livelihoods of skilled artisans across Morocco.
        </p>
        <Button asChild>
          <Link href="/category/featured">Shop Artisanal Products</Link>
        </Button>
      </div>
    </div>
  );
}
