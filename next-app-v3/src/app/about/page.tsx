import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Moroccan Artisans",
  description: "Learn about our mission to support Moroccan artisans and preserve cultural heritage."
};

export default function AboutPage() {
  return (
    <div className="bg-amber-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative Header with Pattern */}
        <div className="relative mb-16 text-center py-10">
          {/* Decorative Border Pattern Top */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-repeat-x" 
               style={{ 
                 backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"24\" height=\"4\" viewBox=\"0 0 24 4\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0H12L8 4H4L0 0Z\" fill=\"%23D97706\"/><path d=\"M12 0H24L20 4H16L12 0Z\" fill=\"%23D97706\"/></svg>')",
                 backgroundSize: "24px 4px" 
               }}></div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">Our Story</h1>
          <p className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl">
            Dedicated to showcasing <span className="text-amber-700 font-medium">authentic Moroccan craftsmanship</span> and supporting the artisans who preserve these generations-old traditions.
          </p>
          
          {/* Decorative Border Pattern Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-repeat-x" 
               style={{ 
                 backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"24\" height=\"4\" viewBox=\"0 0 24 4\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 4H12L8 0H4L0 4Z\" fill=\"%23D97706\"/><path d=\"M12 4H24L20 0H16L12 4Z\" fill=\"%23D97706\"/></svg>')",
                 backgroundSize: "24px 4px" 
               }}></div>
        </div>

        {/* Mission with decorative background */}
        <div className="relative bg-white rounded-xl overflow-hidden mb-20">
          {/* Decorative corner pattern */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-10"
               style={{
                 backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"128\" height=\"128\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0H128V128H112C50.1441 128 0 77.8559 0 16V0Z\" fill=\"%23D97706\"/></svg>')",
                 backgroundSize: "100% 100%"
               }}></div>
          
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1548013146-72479768bada"
                alt="Moroccan marketplace"
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-semibold text-lg">Medina of Marrakech</p>
                <p className="text-sm text-white/80">Where our journey began</p>
              </div>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-amber-600 mr-3">&bull;</span>
                Our Mission
              </h2>
              <p className="text-gray-700 mb-5 text-lg leading-relaxed">
                Moroccan Artisans was founded with a simple yet powerful mission: to connect skilled artisans from Morocco with customers worldwide who appreciate authentic craftsmanship and cultural heritage.
              </p>
              <p className="text-gray-700 mb-5 text-lg leading-relaxed">
                In a world dominated by mass-produced goods, we believe in preserving traditional crafting techniques that have been passed down through generations. Every product in our collection tells a story of cultural heritage and skilled hands that created it.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We work directly with artisans and small family workshops across Morocco, ensuring fair compensation and sustainable practices while bringing their exceptional work to a global audience.
              </p>
              
              {/* Decorative corner pattern (bottom right) */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
                   style={{
                     backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"128\" height=\"128\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M128 128H0V0H16C77.8559 0 128 50.1441 128 112V128Z\" fill=\"%23D97706\"/></svg>')",
                     backgroundSize: "100% 100%"
                   }}></div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-amber-600 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Artisan Support</h3>
              <p className="text-gray-600 text-center">
                We ensure fair compensation for artisans and invest in their communities, providing sustainable livelihoods.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-amber-600 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Cultural Preservation</h3>
              <p className="text-gray-600 text-center">
                We help preserve traditional techniques and cultural practices that might otherwise be lost to industrialization.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-amber-600 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Ethical Business</h3>
              <p className="text-gray-600 text-center">
                We operate with transparency, sustainability, and respect for the cultural traditions represented in our products.
              </p>
            </div>
          </div>
        </div>

        {/* Journey */}
        <div className="relative mb-20">
          <div 
            className="absolute inset-0 bg-amber-800 opacity-10 rounded-xl"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h20v20H0V0zm10 10L0 0v20h20V0L10 10z\" fill=\"%23D97706\" fill-opacity=\"0.2\"/></svg>')",
              backgroundSize: "20px 20px"
            }}
          ></div>
          
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-xl relative z-10 shadow-xl">
            <h2 className="text-3xl font-bold text-amber-800 mb-8 text-center">Our Journey</h2>
            
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Moroccan Artisans began when our founder visited Morocco and was captivated by the incredible craftsmanship in local markets. Seeing these skilled artisans struggle to reach customers beyond local tourism, she envisioned a platform that could connect them to appreciative customers worldwide.
              </p>
              <p className="text-lg leading-relaxed">
                We started with a small collection from just five artisans in Marrakech. Today, we work with over 50 artisans and cooperatives across Morocco, from the blue city of Chefchaouen to the Atlas Mountains and the southern desert regions.
              </p>
              <p className="text-lg leading-relaxed">
                Each piece in our collection is still personally selected and comes with the story of its creation and the artisan behind it. We're proud to have helped many of our partner artisans expand their workshops, train apprentices, and preserve techniques that might otherwise be lost.
              </p>
            </div>
            
            {/* Decorative Moroccan pattern line */}
            <div className="flex justify-center my-8">
              <div className="w-32 h-4 bg-repeat-x" 
                   style={{ 
                     backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"32\" height=\"4\" viewBox=\"0 0 32 4\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0H8L4 4H0V0Z\" fill=\"%23D97706\"/><path d=\"M8 0H16L12 4H4L8 0Z\" fill=\"%23D97706\"/><path d=\"M16 0H24L20 4H12L16 0Z\" fill=\"%23D97706\"/><path d=\"M24 0H32L28 4H20L24 0Z\" fill=\"%23D97706\"/></svg>')",
                     backgroundSize: "32px 4px" 
                   }}></div>
            </div>
          </div>
        </div>

        {/* Team Highlight */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg">
              Our team consists of talented students from the National Institute of Posts and Telecommunications (INPT) with expertise in advanced software engineering.
            </p>
            <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center items-center h-64 bg-amber-50">
                <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <div className="p-6 border-t-4 border-amber-600">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Chahid Hadifi</h3>
                <p className="text-amber-600 font-medium mb-3">Advanced Software Engineering Student</p>
                <p className="text-gray-600">
                  A talented software engineering student at INPT with a passion for creating innovative solutions and preserving cultural heritage through technology.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center items-center h-64 bg-amber-50">
                <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6 border-t-4 border-amber-600">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Oussama Anou</h3>
                <p className="text-amber-600 font-medium mb-3">Advanced Software Engineering Student</p>
                <p className="text-gray-600">
                  A dedicated student at INPT specializing in advanced software engineering, combining technical expertise with a commitment to showcasing Moroccan craftsmanship globally.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA with enhanced design */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative background pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M30 10L40 30L30 50L20 30L30 10Z\" fill=\"%23FFFFFF\"/></svg>')",
              backgroundSize: "60px 60px"
            }}
          ></div>
          
          <div className="bg-gradient-to-r from-amber-700 to-amber-800 relative z-10">
            <div className="grid md:grid-cols-2">
              {/* <div className="relative h-80 md:h-auto overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1590944259990-751c9ab7bdbc"
                  alt="Moroccan crafts"
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-800/50 via-transparent to-transparent"></div>
              </div> */}
              
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-6">Join Our Journey</h2>
                <p className="text-amber-100 mb-8 text-lg leading-relaxed">
                  Discover authentic Moroccan craftsmanship while supporting artisans and preserving cultural heritage. Every purchase makes a difference in the lives of these skilled creators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/products" 
                    className="bg-white text-amber-700 hover:bg-amber-50 py-3 px-8 rounded-lg font-medium text-center shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Shop Collection
                  </Link>
                  <Link 
                    href="/contact" 
                    className="bg-amber-600 border border-amber-500 text-white hover:bg-amber-500 py-3 px-8 rounded-lg font-medium text-center shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}