"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-morocco-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">MoroccanArtisans</h3>
            <p className="text-gray-300 mb-4">
              Connecting global customers with authentic Moroccan craftsmanship. Every purchase supports traditional artisans and preserves cultural heritage.
            </p>            <div className="flex space-x-3">
              <Link href="#" className="text-white hover:text-morocco-amber transition-colors">
                <Facebook />
              </Link>
              <Link href="#" className="text-white hover:text-morocco-amber transition-colors">
                <Instagram />
              </Link>
              <Link href="#" className="text-white hover:text-morocco-amber transition-colors">
                <Twitter />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Meet Our Artisans
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-morocco-amber transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest products, promotions, and Moroccan craft stories.
            </p>
            <div className="flex flex-col gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button className="bg-morocco-terracotta hover:bg-morocco-rust w-full">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} MoroccanArtisans. All rights reserved.
            </p>            <div className="flex items-center space-x-4">
              <div className="h-6 w-10 relative">
                <Image src="https://via.placeholder.com/40x25" alt="Visa" width={40} height={25} />
              </div>
              <div className="h-6 w-10 relative">
                <Image src="https://via.placeholder.com/40x25" alt="Mastercard" width={40} height={25} />
              </div>
              <div className="h-6 w-10 relative">
                <Image src="https://via.placeholder.com/40x25" alt="PayPal" width={40} height={25} />
              </div>
              <div className="h-6 w-10 relative">
                <Image src="https://via.placeholder.com/40x25" alt="Apple Pay" width={40} height={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
