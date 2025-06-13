import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchShortcuts from "@/components/layout/SearchShortcuts";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { CartProvider } from "@/lib/cart/CartContext";
import { WishlistProvider } from "@/lib/wishlist/WishlistContext";
import { SearchProvider } from "@/lib/search/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artisanal Moroccan Market",
  description: "Discover authentic Moroccan artisanal products",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Tidio Chat Widget */}
        <Script
          src={`//code.tidio.co/${process.env.NEXT_PUBLIC_TIDIO_ID}.js`}
          strategy="lazyOnload"
        />
        <Script id="tidio-init" strategy="lazyOnload">
          {`
            window.tidioChatApi?.on('ready', function() {
              console.log('Tidio chat is ready');
            });
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <Toaster position="top-center" />
                <SearchShortcuts />
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1 bg-white">{children}</main>
                  <Footer />
                </div>
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
