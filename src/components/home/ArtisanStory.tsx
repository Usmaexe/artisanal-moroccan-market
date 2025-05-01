
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ArtisanStory: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-15517141-e6659394e4a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Moroccan artisan working"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 rounded-lg overflow-hidden border-4 border-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1508195578732-0b88c2d6d0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Moroccan craftsmanship detail"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>
          
          <div className="animate-slide-in">
            <div className="text-morocco-blue uppercase tracking-wide font-medium mb-2">The Artisans</div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-morocco-charcoal mb-6">Preserving Heritage Through Craft</h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Behind every piece in our collection stands a skilled artisan who has inherited generations of craftsmanship. 
              From the weavers in the Atlas Mountains to the ceramicists of Fes and Safi, each artisan brings unique 
              regional techniques and personal artistic vision to their work.
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              By supporting these artisans, you're not just acquiring a beautiful piece of Moroccan craft—you're helping 
              to sustain cultural traditions that have been passed down through generations, providing economic opportunities 
              to rural communities, and preserving skills that might otherwise be lost to time.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-morocco-terracotta flex items-center justify-center text-white">
                  ✓
                </div>
                <p className="text-gray-700">Fair compensation for skilled craftspeople</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-morocco-terracotta flex items-center justify-center text-white">
                  ✓
                </div>
                <p className="text-gray-700">Traditional techniques preserved and celebrated</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-morocco-terracotta flex items-center justify-center text-white">
                  ✓
                </div>
                <p className="text-gray-700">Supporting families and communities across Morocco</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button asChild className="btn-primary px-8">
                <Link to="/artisans">Meet Our Artisans</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStory;
