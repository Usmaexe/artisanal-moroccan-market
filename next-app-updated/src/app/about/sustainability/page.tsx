import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sustainability | Moroccan Artisans",
  description: "Learn about our commitment to sustainable practices and ethical sourcing."
};

export default function SustainabilityPage() {
  return (
    <div className="bg-amber-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Commitment to Sustainability</h1>
          <p className="text-lg text-gray-700">
            We believe in preserving traditional crafts while protecting the environment and supporting communities.
          </p>
        </div>

        {/* Environmental Practices */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1590228947498-5639e84ad81d"
                alt="Sustainable materials"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Environmental Responsibility</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our artisans prioritize natural, locally-sourced materials that minimize environmental impact. Many of our products use:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Natural clay from sustainable quarries</li>
                  <li>Vegetable and mineral-based dyes</li>
                  <li>Sustainably harvested wood and palm fibers</li>
                  <li>Recycled materials when possible</li>
                  <li>Minimal packaging made from recycled and biodegradable materials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Social Impact */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2 relative h-80 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6"
                alt="Women's cooperative"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Social Impact</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We partner with artisan cooperatives that provide fair wages and safe working conditions, with special focus on:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Women-led cooperatives that provide economic independence</li>
                  <li>Preserving cultural heritage and traditional skills</li>
                  <li>Fair compensation that reflects the true value of handcrafted work</li>
                  <li>Training programs to pass skills to younger generations</li>
                  <li>Community reinvestment projects funded by a portion of our proceeds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Certifications & Commitments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="bg-amber-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Fair Trade Certified</h3>
            </div>
            <div className="p-4">
              <div className="bg-amber-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Carbon Neutral</h3>
            </div>
            <div className="p-4">
              <div className="bg-amber-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Ethical Sourcing</h3>
            </div>
            <div className="p-4">
              <div className="bg-amber-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Quality Guaranteed</h3>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-amber-600 text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Sustainable Journey</h2>
          <p className="max-w-2xl mx-auto mb-6">
            When you purchase from Moroccan Artisans, you're not just buying beautiful products – 
            you're supporting sustainable practices, preserving cultural heritage, and making a positive impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="bg-white text-amber-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Sustainably
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}