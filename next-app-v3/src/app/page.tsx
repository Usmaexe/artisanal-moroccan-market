import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Featured categories
  const categories = [
    {
      id: 1,
      name: "Pottery & Ceramics",
      image: "https://images.unsplash.com/photo-1519644273884-c700741eb5f4",
      slug: "pottery-ceramics"
    },
    {
      id: 2,
      name: "Carpets & Rugs",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843",
      slug: "carpets-rugs"
    },
    {
      id: 3,
      name: "Leather Goods",
      image: "https://images.unsplash.com/photo-1585532299082-a8726e36c780",
      slug: "leather-goods"
    },
    {
      id: 4,
      name: "Jewelry",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
      slug: "jewelry"
    }
  ];

  // Featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Hand-Painted Ceramic Bowl",
      price: 45,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
      slug: "hand-painted-ceramic-bowl"
    },
    {
      id: 2,
      name: "Handwoven Berber Carpet",
      price: 299,
      image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
      slug: "handwoven-berber-carpet"
    },
    {
      id: 3,
      name: "Moroccan Leather Pouf",
      price: 129,
      image: "https://images.unsplash.com/photo-1540638349517-3abd5afc9847",
      slug: "moroccan-leather-pouf"
    },
    {
      id: 4,
      name: "Silver Berber Necklace",
      price: 85,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      slug: "silver-berber-necklace"
    }
  ];

  return (
    <div className="bg-amber-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1548013146-72479768bada"
            alt="Moroccan market"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover Authentic Moroccan Craftsmanship
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Handcrafted treasures from Morocco's finest artisans, bringing centuries of tradition to your home.
            </p>
            <Link 
              href="/products" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium text-lg inline-block"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Explore Categories</h2>
          <p className="text-gray-600 mb-8">Discover our collection of handmade Moroccan treasures</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="relative h-60 overflow-hidden rounded-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Featured Products</h2>
          <p className="text-gray-600 mb-8">Handpicked selection of our finest craftsmanship</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-amber-600 font-bold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              href="/products" 
              className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-3 rounded-md font-medium inline-block transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Artisan Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551448215-38fb4f8c9d5e"
                alt="Moroccan artisan"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Preserving Moroccan Heritage</h2>
              <p className="text-gray-600 mb-6">
                For generations, Moroccan artisans have passed down their craft, preserving techniques that date back centuries. 
                Each piece in our collection represents this rich heritage and the skilled hands that created it.
              </p>
              <p className="text-gray-600 mb-6">
                When you purchase from Moroccan Artisans, you're not just buying a product - you're supporting traditional 
                craftsmanship and helping to sustain these ancient art forms for future generations.
              </p>
              <Link 
                href="/about"
                className="text-amber-600 font-medium flex items-center hover:underline"
              >
                Learn more about our artisans
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
