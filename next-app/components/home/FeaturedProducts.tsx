"use client";

import React from 'react';
import Link from 'next/link';
import ProductGrid from '../products/ProductGrid';
import { Button } from '../ui/button';
import { ProductCardProps } from '../products/ProductCard';

// Sample product data
const featuredProducts: ProductCardProps[] = [
  {
    id: 1,
    name: 'Beni Ourain Handwoven Wool Rug',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3',
    category: 'Rugs & Carpets',
    region: 'Atlas Mountains',
    isNew: true,
    rating: 4.8,
    slug: 'beni-ourain-handwoven-wool-rug'
  },
  {
    id: 2,
    name: 'Hand-painted Ceramic Tagine',
    price: 89.99,
    originalPrice: 109.99,
    image: 'https://images.unsplash.com/photo-1590730843887-02dd269c9db9?ixlib=rb-4.0.3',
    category: 'Pottery & Ceramics',
    region: 'Fes',
    isOnSale: true,
    rating: 4.9,
    slug: 'hand-painted-ceramic-tagine'
  },
  {
    id: 3,
    name: 'Handcrafted Leather Pouf',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1551907234-fb773fb08a2d?ixlib=rb-4.0.3',
    category: 'Leather Goods',
    region: 'Marrakech',
    isFeatured: true,
    rating: 4.7,
    slug: 'handcrafted-leather-pouf'
  },
  {
    id: 4,
    name: 'Handmade Brass Lantern',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1584057048478-b2cff355354c?ixlib=rb-4.0.3',
    category: 'Home Decor',
    region: 'Marrakech',
    rating: 4.5,
    slug: 'handmade-brass-lantern'
  },
  {
    id: 5,
    name: 'Traditional Moroccan Teapot',
    price: 65.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1577867134049-e65ea37f57f9?ixlib=rb-4.0.3',
    category: 'Home Decor',
    region: 'Fes',
    isOnSale: true,
    rating: 4.6,
    slug: 'traditional-moroccan-teapot'
  },
  {
    id: 6,
    name: 'Berber Silver Earrings',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-4.0.3',
    category: 'Jewelry',
    region: 'Atlas Mountains',
    isNew: true,
    rating: 4.4,
    slug: 'berber-silver-earrings'
  },
  {
    id: 7,
    name: 'Handwoven Straw Market Basket',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1598030343249-98c53eb0b241?ixlib=rb-4.0.3',
    category: 'Home Decor',
    region: 'Essaouira',
    rating: 4.7,
    slug: 'handwoven-straw-market-basket'
  },
  {
    id: 8,
    name: 'Blue Chefchaouen Wool Blanket',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1568377210220-151e1d63f731?ixlib=rb-4.0.3',
    category: 'Textiles & Fabrics',
    region: 'Chefchaouen',
    isFeatured: true,
    rating: 4.9,
    slug: 'blue-chefchaouen-wool-blanket'
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-morocco-charcoal mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular handcrafted items, each piece a testament to Morocco's rich artistic traditions
          </p>
        </div>

        <ProductGrid products={featuredProducts} />

        <div className="mt-12 text-center">
          <Button asChild className="btn-outline px-8" size="lg">
            <Link href="/category/featured">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
