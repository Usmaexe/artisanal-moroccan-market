   // filepath: c:\Users\AdMin\Desktop\W A N D E R E R\ASEDS\PFA\artisanal-moroccan-market\next-app-updated\src\app\products\featured\page.tsx
   import Image from "next/image";
   import Link from "next/link";
   import { getFeaturedProducts } from "@/data/products"; // Assume this function exists

   export const metadata = {
     title: "Featured Items | Moroccan Artisans",
     description: "Discover our featured artisanal products."
   };

   export default function FeaturedItemsPage() {
     const featuredProducts = getFeaturedProducts(); // Fetch featured products

     return (
       <div className="bg-amber-50 py-8">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-8">
             <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Items</h1>
             <p className="text-gray-600">Explore our selection of featured artisanal products.</p>
           </div>

           {/* Products Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {featuredProducts.map((product) => (
               <Link 
                 key={product.id} 
                 href={`/products/${product.slug}`} 
                 className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
               >
                 <div className="relative h-60 overflow-hidden">
                   <Image
                     src={product.images[0]}
                     alt={product.name}
                     fill
                     style={{ objectFit: "cover" }}
                     className="group-hover:scale-105 transition-transform duration-300"
                   />
                 </div>
                 <div className="p-4">
                   <h3 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h3>
                   <span className="text-amber-600 font-bold">${product.price}</span>
                 </div>
               </Link>
             ))}
           </div>
         </div>
       </div>
     );
   }