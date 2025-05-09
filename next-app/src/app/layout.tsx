import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";
import ClientLayout from "../../components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MoroccanArtisans - Authentic Handcrafted Moroccan Products",
  description: "Discover authentic Moroccan craftsmanship - handmade rugs, pottery, leather goods, and home decor directly from skilled artisans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ClientProviders>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
