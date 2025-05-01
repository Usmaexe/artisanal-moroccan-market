
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ArtisanStory from '@/components/home/ArtisanStory';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Newsletter from '@/components/home/Newsletter';
import CartDrawer from '@/components/cart/CartDrawer';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Index: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <Layout>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <ArtisanStory />
      <TestimonialsSection />
      <Newsletter />
      
      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8 z-30 md:hidden">
        <button 
          className="btn-primary rounded-full p-4 shadow-lg flex items-center justify-center relative"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-morocco-blue text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </Layout>
  );
};

export default Index;
