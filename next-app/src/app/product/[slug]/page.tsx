"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Truck, Shield, Repeat } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '../../../../components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import Image from 'next/image';
import AddToCart from '../../../../components/products/AddToCart';
import ProductGrid from '../../../../components/products/ProductGrid';

// This would typically come from an API call
const mockProduct = {
  id: 1,
  name: "Hand-woven Berber Rug",
  slug: "hand-woven-berber-rug",
  price: 249.99,
  rating: 4.7,
  reviewCount: 24,
  description: "Traditional Moroccan Berber rug hand-woven by artisans in the Atlas Mountains. Each piece showcases authentic geometric patterns and symbols that tell a story of Amazigh heritage. Made from 100% natural wool with vegetable dyes.",
  details: [
    "100% natural sheep's wool",
    "Natural vegetable dyes",
    "Handmade in Atlas Mountains",
    "Size: 200 x 150 cm (6'7\" x 4'11\")",
    "Pile height: Medium (15mm)",
    "Care: Vacuum regularly, professional cleaning recommended"
  ],
  images: [
    "https://images.unsplash.com/photo-1561344640-2453889cde7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    "https://images.unsplash.com/photo-1617066188245-3c0436a36753?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1578367049027-194a8b0e88fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  ],
  categories: ["Rugs & Carpets", "Home Decor"],
  stock: 12,
  artisan: "Cooperative Tifawine",
  region: "Atlas Mountains, Morocco"
};

// Similar products - would come from an API call
const relatedProducts = [
  {
    id: 2,
    name: "Handcrafted Ceramic Tagine",
    slug: "handcrafted-ceramic-tagine",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1577655195485-5b6df22d0f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.5
  },
  {
    id: 3,
    name: "Moroccan Leather Pouf",
    slug: "moroccan-leather-pouf",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1590254553792-7e91903aa3fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.8
  },
  {
    id: 4,
    name: "Embroidered Pillow Cover",
    slug: "embroidered-pillow-cover",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.6
  },
  {
    id: 5,
    name: "Hand-painted Ceramic Bowl",
    slug: "hand-painted-ceramic-bowl",
    price: 58.99,
    image: "https://images.unsplash.com/photo-1578079545736-4032d461bd51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.7
  }
];

const ProductDetail = () => {
  const params = useParams();
  const { slug } = params;
  
  // In a real app, you would fetch product data based on the slug
  // For now, we'll use the mock product
  const product = mockProduct;
  
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/category/rugs-carpets">{product.categories[0]}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{product.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImage === index ? 'border-morocco-blue' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-heading text-3xl font-semibold text-morocco-charcoal mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          
          <div className="text-2xl font-semibold text-morocco-blue mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Details:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">Artisan:</span>
              <span className="text-gray-700">{product.artisan}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Region:</span>
              <span className="text-gray-700">{product.region}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </div>
          </div>
          
          <AddToCart 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              slug: product.slug
            }}
          />
          
          <div className="mt-8 space-y-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              <span>Free shipping for orders over $100</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>1-year warranty on all products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-heading text-xl font-medium mb-4">Product Description</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                This authentic Berber rug is hand-woven using traditional techniques that have been passed down through generations of Amazigh weavers in Morocco's Atlas Mountains. Each rug tells a story through its intricate patterns and symbols, making it not just a floor covering, but a piece of living heritage.
              </p>
              <p className="mb-4">
                Made from 100% natural sheep's wool collected from local shepherds, the materials are cleaned, carded, and spun by hand. The wool is then dyed using natural vegetable dyes extracted from local plants and minerals: indigo, madder root, pomegranate, saffron, and mint.
              </p>
              <p>
                The distinctive geometric patterns and symbols woven into this rug represent aspects of daily life, natural phenomena, and protection against evil. The diamond shapes symbolize fertility, while zigzag lines represent flowing water, an essential resource in arid mountain regions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-heading text-xl font-medium mb-4">Shipping Information</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                We ship worldwide using trusted carriers. All orders are processed within 1-2 business days. Delivery times vary by destination:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>United States & Canada: 5-7 business days</li>
                <li>Europe: 7-10 business days</li>
                <li>Australia & New Zealand: 10-14 business days</li>
                <li>Rest of the world: 14-21 business days</li>
              </ul>
              
              <h4 className="font-medium mt-6 mb-2">Returns & Exchanges</h4>
              <p className="mb-4">
                We accept returns within 30 days of delivery. Items must be unused, undamaged, and in their original packaging. Custom orders are non-returnable.
              </p>
              <p>
                To initiate a return, please contact our customer service team at returns@moroccanartisans.com with your order number and reason for return.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-medium">Customer Reviews</h3>
              <button className="btn-secondary">Write a Review</button>
            </div>
            
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-current' : 'stroke-current fill-none'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Sarah T. - 3 months ago</span>
                </div>
                <h4 className="font-medium mb-2">Stunning craftsmanship!</h4>
                <p className="text-gray-700">
                  This rug is even more beautiful in person. The colors are rich and vibrant, and the quality is exceptional. It's become the focal point of my living room, and I've received so many compliments!
                </p>
              </div>
              
              <div className="pb-6 border-b border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'stroke-current fill-none'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Michael L. - 5 months ago</span>
                </div>
                <h4 className="font-medium mb-2">Beautiful rug, long delivery time</h4>
                <p className="text-gray-700">
                  The rug is beautiful and exactly as pictured. My only complaint is that shipping took longer than expected. Worth the wait though!
                </p>
              </div>
              
              <div className="pb-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-current' : 'stroke-current fill-none'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Emma R. - 1 month ago</span>
                </div>
                <h4 className="font-medium mb-2">Exceeded my expectations</h4>
                <p className="text-gray-700">
                  I was hesitant to buy a rug online without seeing it in person, but I'm so glad I took the chance. The craftsmanship is exquisite, and knowing that I'm supporting traditional artisans makes it even better. Highly recommend!
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="flex items-center text-morocco-blue hover:underline">
                <ArrowLeft size={16} className="mr-1" /> Previous
              </button>
              <span className="mx-4 text-gray-500">Page 1 of 3</span>
              <button className="flex items-center text-morocco-blue hover:underline">
                Next <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="font-heading text-2xl font-semibold mb-6">You May Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetail;