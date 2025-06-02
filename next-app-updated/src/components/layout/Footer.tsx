import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Moroccan Artisans</h3>
            <p className="text-amber-100 text-sm">
              Discover authentic Moroccan artisanal products crafted with traditional techniques and rich cultural heritage.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-amber-100">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/products/featured" className="hover:text-white">Featured Items</Link></li>
              <li><Link href="/products/sale" className="hover:text-white">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-amber-100">
              <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
              <li><Link href="/about/artisans" className="hover:text-white">Meet the Artisans</Link></li>
              <li><Link href="/about/sustainability" className="hover:text-white">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200">
                <Twitter size={20} />
              </a>
            </div>
            <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-amber-100 text-sm rounded-l-md focus:outline-none focus:ring-0 w-full border-amber-600 border-2"
              />
              <button
                type="submit"
                className="bg-amber-600 px-3 py-2 text-sm rounded-r-md hover:bg-amber-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-100 text-sm">
          <p>&copy; {new Date().getFullYear()} Moroccan Artisans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 