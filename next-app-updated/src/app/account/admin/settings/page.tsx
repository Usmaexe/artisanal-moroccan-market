"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { 
  Settings, Save, Globe, Mail, CreditCard, Truck, 
  Users, Palette, ChevronDown, Toggle 
} from "lucide-react";

export default function AdminSettings() {
  const { user } = useAuth();
  
  const [activeSection, setActiveSection] = useState("general");
  const [formState, setFormState] = useState({
    // General Settings
    siteName: "Artisanal Moroccan Market",
    siteDescription: "Authentic handmade Moroccan products from local artisans",
    contactEmail: "contact@moroccanmarket.com",
    contactPhone: "+212 522 123 456",
    
    // Email Settings
    notifyNewOrder: true,
    notifyNewUser: true,
    notifyLowStock: true,
    orderConfirmationTemplate: "Thank you for your order #{order_id}. We'll process it shortly.",
    
    // Payment Settings
    allowCreditCard: true,
    allowPaypal: true,
    allowBankTransfer: false,
    currencySymbol: "$",
    currencyCode: "USD",
    
    // Shipping Settings
    defaultShippingRate: "15.00",
    freeShippingThreshold: "100.00",
    shippingOriginCountry: "Morocco",
    
    // User Settings
    allowUserRegistration: true,
    requireEmailVerification: true,
    artisanApprovalRequired: true,
    defaultUserRole: "customer",
    
    // Appearance Settings
    primaryColor: "#d97706", // amber-600
    logoUrl: "/images/logo.png",
    bannerUrl: "/images/banner.jpg",
    footerText: "© 2023 Artisanal Moroccan Market. All rights reserved."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkboxes
    if (type === 'checkbox') {
      setFormState({
        ...formState,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormState({
        ...formState,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully!");
    // In a real app, this would call an API endpoint
  };

  const renderSection = () => {
    switch(activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <input                type="text"
                name="siteName"
                id="siteName"
                value={formState.siteName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
              />
            </div>
            
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                Site Description
              </label>
              <textarea                name="siteDescription"
                id="siteDescription"
                rows={3}
                value={formState.siteDescription}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"                  name="contactEmail"
                  id="contactEmail"
                  value={formState.contactEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
                />
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                  Contact Phone
                </label>
                <input
                  type="text"
                  name="contactPhone"                  id="contactPhone"
                  value={formState.contactPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
                />
              </div>
            </div>
          </div>
        );
        
      case "email":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notifyNewOrder"
                  id="notifyNewOrder"
                  checked={formState.notifyNewOrder}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="notifyNewOrder" className="ml-2 block text-sm text-gray-700">
                  Notify admin on new orders
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notifyNewUser"
                  id="notifyNewUser"
                  checked={formState.notifyNewUser}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="notifyNewUser" className="ml-2 block text-sm text-gray-700">
                  Notify admin on new user registrations
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notifyLowStock"
                  id="notifyLowStock"
                  checked={formState.notifyLowStock}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="notifyLowStock" className="ml-2 block text-sm text-gray-700">
                  Notify admin on low stock alerts
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="orderConfirmationTemplate" className="block text-sm font-medium text-gray-700">
                Order Confirmation Email Template
              </label>
              <textarea
                name="orderConfirmationTemplate"                id="orderConfirmationTemplate"
                rows={5}
                value={formState.orderConfirmationTemplate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
              />
              <p className="mt-2 text-xs text-gray-500">
                Available variables: {"{order_id}"}, {"{customer_name}"}, {"{order_total}"}, {"{shipping_address}"}
              </p>
            </div>
          </div>
        );
        
      case "payment":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="allowCreditCard"
                  id="allowCreditCard"
                  checked={formState.allowCreditCard}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="allowCreditCard" className="ml-2 block text-sm text-gray-700">
                  Allow Credit Card payments
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="allowPaypal"
                  id="allowPaypal"
                  checked={formState.allowPaypal}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="allowPaypal" className="ml-2 block text-sm text-gray-700">
                  Allow PayPal payments
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="allowBankTransfer"
                  id="allowBankTransfer"
                  checked={formState.allowBankTransfer}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="allowBankTransfer" className="ml-2 block text-sm text-gray-700">
                  Allow Bank Transfer payments
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  name="currencySymbol"
                  id="currencySymbol"
                  value={formState.currencySymbol}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              <div>
                <label htmlFor="currencyCode" className="block text-sm font-medium text-gray-700">
                  Currency Code
                </label>
                <input
                  type="text"                  name="currencyCode"
                  id="currencyCode"
                  value={formState.currencyCode}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
                />
              </div>
            </div>
          </div>
        );
        
      case "shipping":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="defaultShippingRate" className="block text-sm font-medium text-gray-700">
                  Default Shipping Rate ($)
                </label>
                <input
                  type="text"
                  name="defaultShippingRate"
                  id="defaultShippingRate"
                  value={formState.defaultShippingRate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              <div>
                <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700">
                  Free Shipping Threshold ($)
                </label>
                <input
                  type="text"
                  name="freeShippingThreshold"
                  id="freeShippingThreshold"
                  value={formState.freeShippingThreshold}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Orders above this amount qualify for free shipping
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="shippingOriginCountry" className="block text-sm font-medium text-gray-700">
                Shipping Origin Country
              </label>
              <input
                type="text"
                name="shippingOriginCountry"
                id="shippingOriginCountry"
                value={formState.shippingOriginCountry}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        );
        
      case "users":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="allowUserRegistration"
                  id="allowUserRegistration"
                  checked={formState.allowUserRegistration}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="allowUserRegistration" className="ml-2 block text-sm text-gray-700">
                  Allow new user registrations
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="requireEmailVerification"
                  id="requireEmailVerification"
                  checked={formState.requireEmailVerification}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-700">
                  Require email verification
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="artisanApprovalRequired"
                  id="artisanApprovalRequired"
                  checked={formState.artisanApprovalRequired}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="artisanApprovalRequired" className="ml-2 block text-sm text-gray-700">
                  Require admin approval for artisan accounts
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700">
                Default User Role
              </label>
              <select                name="defaultUserRole"
                id="defaultUserRole"
                value={formState.defaultUserRole}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
              >
                <option value="customer">Customer</option>
                <option value="artisan">Artisan</option>
              </select>
            </div>
          </div>
        );
        
      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="flex items-center mt-1">
                <input
                  type="color"
                  name="primaryColor"
                  id="primaryColor"
                  value={formState.primaryColor}
                  onChange={handleChange}
                  className="h-8 w-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={formState.primaryColor}
                  onChange={handleChange}
                  className="ml-2 block w-40 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                  Logo URL
                </label>
                <input
                  type="text"
                  name="logoUrl"
                  id="logoUrl"
                  value={formState.logoUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              <div>
                <label htmlFor="bannerUrl" className="block text-sm font-medium text-gray-700">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  name="bannerUrl"
                  id="bannerUrl"
                  value={formState.bannerUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="footerText" className="block text-sm font-medium text-gray-700">
                Footer Text
              </label>
              <textarea
                name="footerText"                id="footerText"
                rows={2}
                value={formState.footerText}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-amber-600"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="h-7 w-7 text-amber-600 mr-2" />
                Platform Settings
              </h1>
              <p className="text-gray-600 mt-2">Configure your marketplace settings</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {/* Settings Navigation Sidebar */}
                <div className="p-6 bg-gray-50 rounded-t-lg md:rounded-tr-none md:rounded-l-lg">
                  <ul className="space-y-1">
                    <li>
                      <button 
                        onClick={() => setActiveSection("general")}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeSection === "general" 
                            ? "bg-amber-100 text-amber-800" 
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Globe className="h-5 w-5 mr-2" />
                        General
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveSection("email")}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeSection === "email" 
                            ? "bg-amber-100 text-amber-800" 
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Mail className="h-5 w-5 mr-2" />
                        Email
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveSection("payment")}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeSection === "payment" 
                            ? "bg-amber-100 text-amber-800" 
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Payment
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveSection("shipping")}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeSection === "shipping" 
                            ? "bg-amber-100 text-amber-800" 
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Truck className="h-5 w-5 mr-2" />
                        Shipping
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveSection("users")}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeSection === "users" 
                            ? "bg-amber-100 text-amber-800" 
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Users className="h-5 w-5 mr-2" />
                        Users
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveSection("appearance")}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeSection === "appearance" 
                            ? "bg-amber-100 text-amber-800" 
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Palette className="h-5 w-5 mr-2" />
                        Appearance
                      </button>
                    </li>
                  </ul>
                </div>
                
                {/* Settings Content Area */}
                <div className="p-6 md:col-span-3">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 capitalize">
                    {activeSection} Settings
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    {renderSection()}
                    
                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 