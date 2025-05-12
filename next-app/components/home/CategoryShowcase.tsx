"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  image: string;
  slug: string;
  description: string;
}

const categories: Category[] = [
  {
    name: 'Rugs & Carpets',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    slug: 'rugs-carpets',
    description: 'Traditional handwoven rugs from various regions of Morocco'
  },
  {
    name: 'Pottery & Ceramics',
    image: 'https://images.unsplash.com/photo-1590730843887-02dd269c9db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    slug: 'pottery-ceramics',
    description: 'Colorful hand-painted ceramics crafted by skilled artisans'
  },
  {
    name: 'Leather Goods',
    image: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    slug: 'leather-goods',
    description: 'Authentic leather items from the famous tanneries of Fes'
  },
  {
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1552848031-326ec03fe2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80',
    slug: 'home-decor',
    description: 'Distinctive decor pieces to add Moroccan charm to your home'
  },
];

const CategoryShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-morocco-charcoal mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of authentic Moroccan crafts, each piece telling a story of tradition and artistry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover-translate"
            >              <div className="aspect-square relative">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5 text-white">
                <h3 className="font-heading text-xl font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {category.description}
                </p>
                <span className="inline-block py-1 border-b border-white/50 text-sm">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
