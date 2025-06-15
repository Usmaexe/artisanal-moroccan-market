"use client";

import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload } from "lucide-react";

// Define Category interface
interface Category {
  category_id: number;
  name: string;
  image_url: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  interface ProductFormData {
    name: string;
    description: string;
    price: string;
    categoryId: string;
    features: string;
    dimensions: string;
    materials: string;
    inStock: boolean;
    image?: File;
  }
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    features: "",
    dimensions: "",
    materials: "",
    inStock: true
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/categories');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        setFormData(prev => ({
          ...prev,
          image: file
        }));
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };
  
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate image URL based on product name
      let imageUrl = "";
      if (formData.image && formData.name) {
        // Create a sanitized filename from the product name
        const sanitizedName = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        imageUrl = `/images/products/${sanitizedName}.jpg`;
        
        // Upload the image to the server
        const imageFormData = new FormData();
        imageFormData.append('image', formData.image);
        imageFormData.append('path', imageUrl);
        
        // Call the API to upload the image
        const uploadResponse = await fetch('/api/upload', { 
          method: 'POST', 
          body: imageFormData 
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        console.log("Image uploaded successfully to:", imageUrl);
      }
      
      // Process form data to match Product type structure
      const processedData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.categoryId), // Use the actual category_id
        artisan_id: user?.id, // Add the artisan ID from the authenticated user
        image_url: imageUrl, // Add the image URL to the data
        features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
        materials: formData.materials ? formData.materials.split(',').map(m => m.trim()).filter(m => m) : []
      };
      
      // In a real app, this would be an API call to create the product
      console.log("Submitting product:", processedData);
      
      // Get token from AuthContext
      const token = localStorage.getItem('morocco_craft_token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      // Make API call to create product with token
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token from AuthContext
        },
        body: JSON.stringify(processedData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      // Redirect to products list
      router.push("/account/artisan/products");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["artisan"]}>
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link 
                href="/account/artisan/products" 
                className="text-amber-600 hover:text-amber-800 inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Products
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Basic Fields */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-amber-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-amber-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (DH) *</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">DH</span>
                      </div>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="pl-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category *</label>
                    <select
                      id="categoryId"
                      name="categoryId"                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-amber-600"
                      disabled={isLoading}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {isLoading && (
                      <p className="mt-1 text-sm text-gray-500">Loading categories...</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features</label>
                    <p className="text-xs text-gray-500 mb-1">Enter each feature on a new line</p>
                    <textarea
                      id="features"
                      name="features"
                      rows={3}
                      value={formData.features}
                      onChange={handleChange}
                      className="mt-1 block text-amber-600 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Handmade\nFair trade\nEco-friendly"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="mt-1 block w-full text-amber-600 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="e.g. 10cm x 15cm x 5cm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="materials" className="block text-sm font-medium text-gray-700">Materials</label>
                    <p className="text-xs text-gray-500 mb-1">Separate materials with commas</p>
                    <input
                      type="text"
                      id="materials"
                      name="materials"
                      value={formData.materials}
                      onChange={handleChange}
                      className="mt-1 block w-full text-amber-600 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Clay, Ceramic, Glaze"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                      In Stock
                    </label>
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
                    <div 
                      onClick={handleImageClick}
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-amber-500 transition-colors"
                    >
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="mx-auto h-40 w-40 relative">
                            <Image 
                              src={imagePreview} 
                              alt="Product preview" 
                              fill
                              style={{ objectFit: 'contain' }}
                              className="rounded-md"
                            />
                          </div>
                        ) : (
                          <div className="mx-auto h-12 w-12 text-gray-400">
                            <Upload className="mx-auto h-12 w-12" />
                          </div>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none"
                          >
                            <span>{imagePreview ? "Change image" : "Upload an image"}</span>
                            <input
                              id="image-upload"
                              name="image"
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={handleChange}
                              className="sr-only"
                              required
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Creating..." : "Create Product"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}