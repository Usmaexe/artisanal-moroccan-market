
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AddToCart from '@/components/products/AddToCart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';
import { ProductCardProps } from '@/components/products/ProductCard';

// Demo product data - would be fetched from API in a real app
const products: Record<string, {
  id: number;
  name: string;
  slug: string;
  description: string;
  details: string;
  care: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  region: string;
  rating: number;
  reviews: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  materials: string[];
  dimensions: string;
  craftTechnique: string;
  artisan: string;
  isFeatured: boolean;
}> = {
  'beni-ourain-handwoven-wool-rug': {
    id: 1,
    name: 'Beni Ourain Handwoven Wool Rug',
    slug: 'beni-ourain-handwoven-wool-rug',
    description: 'Authentic Beni Ourain rugs are handwoven by Berber women in the Atlas Mountains of Morocco. Each piece is unique, featuring traditional geometric patterns in natural undyed wool. These rugs have been crafted for centuries and represent an important part of Berber cultural heritage.',
    details: 'This luxurious rug is handwoven using 100% natural wool from the Atlas Mountains. The wool is washed, carded, and spun by hand before being woven on traditional looms. The characteristic geometric patterns symbolize fertility, nature, and protection.',
    care: 'Vacuum regularly on a low setting. For deeper cleaning, professional rug cleaning is recommended. Rotate occasionally to ensure even wear. Blot spills immediately with a clean, white cloth.',
    price: 699.99,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1577283617407-d8357b9a4577?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3'
    ],
    category: 'Rugs & Carpets',
    region: 'Atlas Mountains',
    rating: 4.8,
    reviews: 24,
    stockStatus: 'in_stock',
    materials: ['100% Natural Wool', 'Cotton Warp'],
    dimensions: '6\' x 9\' (180cm x 270cm)',
    craftTechnique: 'Traditional hand-knotting technique passed down through generations',
    artisan: 'Fatima Collective',
    isFeatured: true
  },
  'hand-painted-ceramic-tagine': {
    id: 2,
    name: 'Hand-painted Ceramic Tagine',
    slug: 'hand-painted-ceramic-tagine',
    description: 'This beautiful hand-painted ceramic tagine is crafted by skilled artisans in Fes, Morocco. The traditional cooking vessel is both functional and decorative, perfect for slow-cooking stews and presenting meals at your table.',
    details: 'Handcrafted from locally-sourced clay and hand-painted with intricate geometric and floral patterns using natural pigments. The conical shape allows steam to circulate during cooking, returning moisture to the dish for tender, flavorful results.',
    care: 'Hand wash with mild soap and warm water. Not dishwasher safe. Avoid sudden temperature changes. If using for cooking, allow the tagine to come to room temperature before heating.',
    price: 89.99,
    originalPrice: 109.99,
    images: [
      'https://images.unsplash.com/photo-1590730843887-02dd269c9db9?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1577042939454-8b29dd0c941d?ixlib=rb-4.0.3'
    ],
    category: 'Pottery & Ceramics',
    region: 'Fes',
    rating: 4.9,
    reviews: 36,
    stockStatus: 'in_stock',
    materials: ['Clay', 'Natural Pigments', 'Lead-free Glaze'],
    dimensions: '12" diameter x 10" height (30cm x 25cm)',
    craftTechnique: 'Traditional wheel throwing and hand-painting techniques',
    artisan: 'Hassan Pottery Workshop',
    isFeatured: true
  }
};

// Related products
const relatedProducts: ProductCardProps[] = [
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

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Get product by slug - in a real app this would be fetched from API
  const product = slug ? products[slug] : null;
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-heading">Product Not Found</h1>
          <p className="mt-4">Sorry, the product you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  // Stock status display
  const stockStatusDisplay = () => {
    switch (product.stockStatus) {
      case 'in_stock':
        return <span className="text-green-600">In Stock</span>;
      case 'low_stock':
        return <span className="text-amber-600">Low Stock</span>;
      case 'out_of_stock':
        return <span className="text-red-600">Out of Stock</span>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm mb-6 text-gray-500">
          <a href="/" className="hover:text-morocco-terracotta">Home</a> / 
          <a href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-morocco-terracotta"> {product.category}</a> / 
          <span className="text-gray-700"> {product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    index === activeImageIndex ? 'border-morocco-terracotta' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2 text-morocco-blue">{product.category}</div>
            <h1 className="text-3xl font-heading font-semibold text-morocco-charcoal mb-4">
              {product.name}
            </h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= product.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 fill-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-lg mr-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-morocco-terracotta text-2xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            {/* Product Attributes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Region</div>
                <div>{product.region}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Materials</div>
                <div>{product.materials.join(', ')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Dimensions</div>
                <div>{product.dimensions}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Availability</div>
                <div>{stockStatusDisplay()}</div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex items-start gap-4 mb-8">
              <AddToCart product={product} className="flex-1" />
              <button
                onClick={toggleWishlist}
                className="flex items-center justify-center h-12 w-12 border border-gray-300 rounded-md hover:bg-gray-100"
                aria-label="Add to wishlist"
              >
                <Heart 
                  size={20} 
                  className={isWishlist ? "fill-morocco-terracotta text-morocco-terracotta" : "text-gray-400"}
                />
              </button>
            </div>

            {/* Shipping Note */}
            <div className="moroccan-border">
              <div className="flex items-start gap-3">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-morocco-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Free shipping</span> on orders over $150. 
                    Ships within 1-2 business days. Each piece is handcrafted to order and may have slight variations, making it uniquely yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b justify-start">
              <TabsTrigger value="details" className="text-lg">Details</TabsTrigger>
              <TabsTrigger value="artisan" className="text-lg">Artisan & Craft</TabsTrigger>
              <TabsTrigger value="care" className="text-lg">Care Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{product.details}</p>
                <ul className="list-disc pl-5 text-gray-700">
                  {product.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                  <li>Dimensions: {product.dimensions}</li>
                  <li>Made in {product.region}, Morocco</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="artisan" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-heading mb-4">About the Artisan</h3>
                <p className="text-gray-700 mb-4">
                  Created by {product.artisan}, a collective of skilled artisans preserving traditional Moroccan craft techniques.
                </p>
                <h3 className="text-xl font-heading mb-4">Craft Technique</h3>
                <p className="text-gray-700">{product.craftTechnique}</p>
              </div>
            </TabsContent>
            <TabsContent value="care" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-gray-700">{product.care}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-semibold mb-8">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
