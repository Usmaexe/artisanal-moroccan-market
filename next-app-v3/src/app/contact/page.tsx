import { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Instagram, 
  Facebook, 
  Twitter
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Artisanal Moroccan Market",
  description: "Get in touch with us for inquiries about our products, shipping, or collaboration opportunities.",
};

export default function ContactPage() {
  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Have questions about our products or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Tell us how we can help..."
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="h-[250px] bg-amber-100 rounded-xl overflow-hidden relative flex items-center justify-center">
                <div className="text-center px-4">
                  <MapPin className="h-10 w-10 text-amber-600 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Map will be displayed here
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    (In a production app, integrate with Google Maps or Mapbox)
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Our Location</h3>
                      <p className="mt-1 text-gray-600">
                        123 Souk Al Fakharin<br />
                        Marrakech Medina<br />
                        40000 Marrakech, Morocco
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-600">
                        <Mail className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="mailto:info@moroccanmarket.com" className="text-amber-600 hover:text-amber-700">
                          info@moroccanmarket.com
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600">
                        For business inquiries: 
                        <a href="mailto:business@moroccanmarket.com" className="text-amber-600 hover:text-amber-700 ml-1">
                          business@moroccanmarket.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-600">
                        <Phone className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="tel:+212535123456" className="hover:text-amber-600">
                          +212 535 123 456
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-600">
                        <Clock className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                      <p className="mt-1 text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-amber-100 p-3 rounded-full text-amber-600 hover:bg-amber-200">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="bg-amber-100 p-3 rounded-full text-amber-600 hover:bg-amber-200">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="bg-amber-100 p-3 rounded-full text-amber-600 hover:bg-amber-200">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-2 text-gray-600">Have questions? Check out our frequently asked questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">How long does shipping take?</h3>
                <p className="text-gray-600">
                  Shipping times vary by location. Domestic orders typically take 3-5 business days, while international orders may take 7-14 business days.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer returns?</h3>
                <p className="text-gray-600">
                  Yes, we offer returns within 30 days of purchase. Items must be unused and in original packaging.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Are your products handmade?</h3>
                <p className="text-gray-600">
                  Yes, all our products are authentically handmade by skilled Moroccan artisans using traditional techniques.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Do you ship internationally?</h3>
                <p className="text-gray-600">
                  Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Didn't find what you were looking for? <Link href="#" className="text-amber-600 font-medium hover:text-amber-700">Check our full FAQ</Link> or contact our customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 