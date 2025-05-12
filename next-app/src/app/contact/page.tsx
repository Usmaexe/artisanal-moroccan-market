"use client";

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-morocco-charcoal mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Have a question about a product, order, or want to learn more about our artisans? 
          We&apos;d love to hear from you!
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-heading font-semibold mb-6 text-morocco-terracotta">
            Get In Touch
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-morocco-cream p-3 rounded-full mr-4">
                <MapPin className="text-morocco-terracotta" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Our Location</h3>
                <p className="text-gray-600">
                  123 Artisan Street<br />
                  Marrakech Medina<br />
                  40000, Morocco
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-morocco-cream p-3 rounded-full mr-4">
                <Phone className="text-morocco-terracotta" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone Numbers</h3>
                <p className="text-gray-600">
                  +212 555-555-555 (Sales)<br />
                  +212 555-555-556 (Support)
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-morocco-cream p-3 rounded-full mr-4">
                <Mail className="text-morocco-terracotta" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email Address</h3>
                <p className="text-gray-600">
                  info@moroccanartisans.com<br />
                  support@moroccanartisans.com
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-morocco-cream p-3 rounded-full mr-4">
                <Clock className="text-morocco-terracotta" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Business Hours</h3>
                <p className="text-gray-600">
                  Monday-Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-heading font-semibold mb-6 text-morocco-terracotta">
            Send Us a Message
          </h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 mb-6">
              Thank you for your message! We&apos;ll get back to you as soon as possible.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Your subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Write your message here..."
                />
              </div>
              
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-morocco-terracotta">
          Find Us
        </h2>
        <div className="rounded-lg overflow-hidden h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">
            [Interactive map would be embedded here with the store location]
          </p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16 bg-morocco-cream rounded-lg p-8">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-morocco-terracotta text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">How long does shipping take?</h3>
            <p className="text-gray-700">
              International shipping typically takes 7-14 business days, depending on your location and customs processing.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Do you offer returns?</h3>
            <p className="text-gray-700">
              Yes, we offer a 30-day return policy for most items. Custom-made goods cannot be returned unless damaged.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">How do I track my order?</h3>
            <p className="text-gray-700">
              You&apos;ll receive a tracking number by email once your order ships. You can also track it from your account page.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Do you ship internationally?</h3>
            <p className="text-gray-700">
              Yes, we ship to most countries worldwide. Shipping costs vary depending on location and package weight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
