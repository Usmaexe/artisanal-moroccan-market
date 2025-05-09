import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-morocco-cream overflow-hidden">
      <div className="absolute inset-0 pattern-bg z-0"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-morocco-charcoal mb-4">
              Discover Authentic <span className="text-morocco-terracotta">Moroccan</span> Craftsmanship
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Handcrafted treasures from the heart of Morocco. Each piece tells a story of tradition, skill, and cultural heritage passed down through generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-8 py-6 text-lg">
                <Link href="/category/featured">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline px-8 py-6 text-lg">
                <Link href="/artisans">Meet Our Artisans</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg shadow-lg hover-translate">
                  <img 
                    src="https://images.unsplash.com/photo-1590730843887-02dd269c9db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80" 
                    alt="Moroccan pottery" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg hover-translate">
                  <img 
                    src="https://images.unsplash.com/photo-1598030304671-5aa1d6f13fdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Moroccan rug" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-12">
                <div className="overflow-hidden rounded-lg shadow-lg hover-translate">
                  <img 
                    src="https://images.unsplash.com/photo-1584057048478-b2cff355354c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Moroccan lanterns" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg hover-translate">
                  <img 
                    src="https://images.unsplash.com/photo-1598030343249-98c53eb0b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Moroccan baskets" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
