"use client";

import React from 'react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-morocco-charcoal mb-8">
          Our Story
        </h1>
        
        <div className="prose lg:prose-xl">
          <p className="text-lg text-gray-700 mb-6">
            MoroccanArtisans was founded with a simple mission: to connect talented Moroccan craftspeople 
            with customers worldwide who appreciate authentic, handcrafted goods.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Our journey began when our founder traveled through Morocco and was captivated by the 
            incredible craftsmanship found in local markets across the country. Each piece told a 
            story of tradition, skill, and cultural heritage passed down through generations.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            We work directly with artisan cooperatives and family workshops throughout Morocco to bring 
            you authentic products while ensuring fair compensation and sustainable practices.
          </p>
          
          <h2 className="text-2xl font-heading font-semibold text-morocco-terracotta mt-8 mb-4">
            Our Values
          </h2>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Supporting traditional craftsmanship and cultural heritage</li>
            <li>Ensuring fair compensation for artisans</li>
            <li>Promoting sustainable practices and materials</li>
            <li>Creating authentic connections between artisans and customers</li>
            <li>Maintaining transparency in our supply chain</li>
          </ul>
          
          <div className="mt-10 flex justify-center">
            <Button asChild className="mr-4">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/artisans">Meet Our Artisans</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}