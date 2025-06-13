"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import Image from "next/image";
import CartIndicator from "./CartIndicator";
import WishlistIndicator from "./WishlistIndicator";
import SearchIndicator from "./SearchIndicator";
import SearchModal from "./SearchModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Additional navigation items based on user role
  const getAccountNavigation = () => {
    if (!user) return [];
    
    switch (user.role) {
      case "admin":
        return [
          { name: "Admin Dashboard", href: "/account/admin/dashboard" },
          { name: "Manage Products", href: "/account/admin/products" },
          { name: "Manage Users", href: "/account/admin/users" },
          { name: "Orders", href: "/account/admin/orders" },
        ];
      case "artisan":
        return [
          { name: "Artisan Dashboard", href: "/account/artisan/dashboard" },
          { name: "My Products", href: "/account/artisan/products" },
          { name: "Orders", href: "/account/artisan/orders" },
        ];
      default: // customer
        return [
          { name: "My Account", href: "/account/dashboard" },
          { name: "Orders", href: "/account/orders" },
          { name: "Wishlist", href: "/account/wishlist" },
        ];
    }
  };

  const accountNavigation = getAccountNavigation();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-amber-700">Moroccan Artisans</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}              className={`${
                  pathname === item.href
                    ? "text-amber-700 border-b-2 border-amber-700"
                    : "text-amber-600 hover:text-amber-800"
                } px-1 py-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <SearchIndicator />
              <WishlistIndicator />
              <CartIndicator />
            </div>
            
            {user ? (
              <div className="relative">                <button 
                  className="flex items-center space-x-2 text-amber-800 hover:text-amber-600 focus:outline-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <User className="h-full w-full p-1" />
                    )}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="p-3 border-b border-gray-100">                      <p className="text-sm font-medium text-amber-800">{user.name}</p>
                      <p className="text-xs text-amber-600">{user.email}</p>
                      <p className="text-xs font-medium text-amber-600 mt-1 capitalize">{user.role}</p>
                    </div>
                    <div className="py-1">
                      {accountNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-amber-800 hover:bg-amber-50 hover:text-amber-700"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-amber-800 hover:bg-amber-50 hover:text-amber-700"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/login"
                  className="text-amber-600 hover:text-amber-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-amber-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">            <button
              type="button"
              className="text-amber-600 hover:text-amber-800 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 px-4 sm:px-6 lg:px-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${                  pathname === item.href
                    ? "bg-amber-50 text-amber-700"
                    : "text-amber-800 hover:bg-amber-50 hover:text-amber-700"
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {user && (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center px-3 mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300 mr-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <User className="h-full w-full p-1" />
                      )}
                    </div>                    <div>
                      <p className="font-medium text-amber-800">{user.name}</p>
                      <p className="text-xs text-amber-600 capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  {accountNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-amber-800 hover:bg-amber-50 hover:text-amber-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-amber-800 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </>
            )}
              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <SearchIndicator />
                <WishlistIndicator />
                <CartIndicator />
              </div>
              
              {!user && (
                <div className="flex ml-auto space-x-2">
                  <Link
                    href="/auth/login"
                    className="text-amber-600 hover:text-amber-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-amber-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>      )}
      <SearchModal />
    </header>
  );
};

export default Header;