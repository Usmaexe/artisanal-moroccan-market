
"use client";

import React from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "The craftsmanship of my Berber rug is extraordinary. It's not just a beautiful piece of decor—it's a conversation starter and the focal point of my living room.",
    author: "Sarah Johnson",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
    rating: 5
  },
  {
    id: 2,
    text: "After visiting Morocco last year, I wanted to bring a piece of its beauty into my home. The ceramics I purchased are stunning and remind me of my travels every day.",
    author: "Michael Chen",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
    rating: 5
  },
  {
    id: 3,
    text: "The leather pouf I ordered arrived perfectly packaged and smells amazing. The quality is outstanding and it's exactly what my space needed.",
    author: "Emma Thompson",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    rating: 4
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 geometric-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-morocco-charcoal mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from customers who have brought the spirit of Morocco into their homes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-6 flex flex-col hover-translate"
            >
              {/* Rating Stars */}
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={i < testimonial.rating ? 0 : 1.5}
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                    />
                  </svg>
                ))}
              </div>              {/* Testimonial Text */}
              <p className="text-gray-700 italic mb-6 flex-grow">&ldquo;{testimonial.text}&rdquo;</p>

              {/* Author Information */}
              <div className="flex items-center">                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 relative">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    fill
                    sizes="48px"
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-morocco-charcoal">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
