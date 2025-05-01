
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Rugs & Carpets', path: '/category/rugs-carpets' },
  { name: 'Pottery & Ceramics', path: '/category/pottery-ceramics' },
  { name: 'Leather Goods', path: '/category/leather-goods' },
  { name: 'Woodwork', path: '/category/woodwork' },
  { name: 'Textiles & Fabrics', path: '/category/textiles-fabrics' },
  { name: 'Jewelry', path: '/category/jewelry' },
  { name: 'Home Decor', path: '/category/home-decor' },
  { name: 'Clothing & Accessories', path: '/category/clothing-accessories' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-morocco-cream shadow-sm">
      {/* Top bar with contact info and language selector */}
      <div className="hidden sm:flex justify-between items-center px-4 py-2 bg-morocco-terracotta text-white text-sm">
        <div className="flex gap-4">
          <span>📞 +212 555-555-555</span>
          <span>📧 contact@moroccanartisans.com</span>
        </div>
        <div className="flex gap-4">
          <select className="bg-transparent border-none outline-none cursor-pointer">
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="es">Español</option>
          </select>
          <span>|</span>
          <select className="bg-transparent border-none outline-none cursor-pointer">
            <option value="mad">MAD</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-morocco-charcoal"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <Link to="/" className="inline-flex items-center">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-morocco-terracotta">
              Moroccan<span className="text-morocco-blue">Artisans</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6">
          <Link to="/" className="font-medium hover:text-morocco-terracotta">Home</Link>
          <div className="relative group">
            <button className="font-medium hover:text-morocco-terracotta flex items-center gap-1">
              Shop <ChevronDown size={14} />
            </button>
            <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-1">
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-morocco-cream"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/artisans" className="font-medium hover:text-morocco-terracotta">Artisans</Link>
          <Link to="/about" className="font-medium hover:text-morocco-terracotta">Our Story</Link>
          <Link to="/contact" className="font-medium hover:text-morocco-terracotta">Contact</Link>
        </nav>

        {/* Search, Cart, User icons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-morocco-charcoal hover:text-morocco-terracotta transition-colors"
          >
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="text-morocco-charcoal hover:text-morocco-terracotta transition-colors">
            <Heart size={20} />
          </Link>
          <Link 
            to="/cart" 
            className="text-morocco-charcoal hover:text-morocco-terracotta transition-colors relative"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-morocco-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link 
            to="/account" 
            className="text-morocco-charcoal hover:text-morocco-terracotta transition-colors"
          >
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-full bg-white transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-heading font-bold text-morocco-terracotta">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} className="text-morocco-charcoal" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/"
              className="py-2 border-b border-gray-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="py-2 border-b border-gray-200">
              <p className="font-medium mb-2">Shop by Category</p>
              <div className="pl-4 flex flex-col space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    className="text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              to="/artisans"
              className="py-2 border-b border-gray-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Artisans
            </Link>
            
            <Link 
              to="/about"
              className="py-2 border-b border-gray-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            
            <Link 
              to="/contact"
              className="py-2 border-b border-gray-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 flex flex-col space-y-2">
              <Link 
                to="/account"
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>My Account</span>
              </Link>
              
              <Link 
                to="/wishlist"
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={18} />
                <span>Wishlist</span>
              </Link>
              
              <Link 
                to="/cart"
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={18} />
                <span>Cart ({cartCount})</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Search overlay */}
      <div className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity",
        searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="container mx-auto px-4 pt-20">
          <div className="bg-white rounded-lg p-4 relative">
            <button 
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>
            <h3 className="font-heading text-lg mb-4">Search Products</h3>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="px-4 py-2 flex-1 outline-none"
              />
              <Button className="rounded-none bg-morocco-terracotta">
                <Search size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
