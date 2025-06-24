"use client";

import { useState, useEffect, ChangeEvent, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "react-hot-toast";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  
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

  // Updated categories with numeric IDs that match your database
  const categories = [
    { id: "1", name: "Pottery & Ceramics" },
    { id: "2", name: "Carpets & Rugs" },
    { id: "3", name: "Leather Goods" },
    { id: "4", name: "Woodwork" },
    { id: "5", name: "Metalwork" },
    { id: "6", name: "Textiles" }
  ];

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const product = response.data;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          categoryId: product.category_id?.toString() || "",
          features: product.features?.join('\n') || '',
          dimensions: product.dimensions || '',
          materials: product.materials?.join(', ') || '',
          inStock: product.inStock ?? true
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductNotFound(true);
        toast.error("Failed to load product. Please try again.");
      }
    };
    
    fetchProduct();
  }, [id, token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Process form data - only send fields that exist in the database
      const processedData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        // These fields are not in the database but sent for completeness
        dimensions: formData.dimensions,
        features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
        materials: formData.materials ? formData.materials.split(',').map(m => m.trim()).filter(m => m) : [],
        inStock: formData.inStock
      };
      
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, processedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      toast.success("Product updated successfully!");
      router.push("/account/artisan/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (productNotFound) {
    return (
      <ProtectedRoute allowedRoles={["artisan"]}>
        <div className="bg-amber-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or you don't have permission to edit it.</p>
              <Link 
                href="/account/artisan/products" 
                className="text-amber-600 hover:text-amber-800 font-medium"
              >
                Return to Products
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

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
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
              
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
                      className="mt-1 block text-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
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
                      className="mt-1 block text-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
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
                        className="pl-10 mt-1 block text-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category *</label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                      Dimensions <span className="text-gray-400 text-xs"></span>
                    </label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      placeholder="e.g., 10cm x 15cm x 5cm"
                      className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                      Features <span className="text-gray-400 text-xs"></span>
                    </label>
                    <textarea
                      id="features"
                      name="features"
                      rows={3}
                      value={formData.features}
                      onChange={handleChange}
                      placeholder="Enter each feature on a new line"
                      className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="materials" className="block text-sm font-medium text-gray-700">
                      Materials <span className="text-gray-400 text-xs"></span>
                    </label>
                    <input
                      type="text"
                      id="materials"
                      name="materials"
                      value={formData.materials}
                      onChange={handleChange}
                      placeholder="e.g., Cedar wood, Brass, Leather"
                      className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="inStock"
                        name="inStock"
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={handleChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 text-gray-900 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="inStock" className="font-medium text-gray-700">
                        In Stock <span className="text-gray-400 text-xs"></span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center py-2 px-4 border text-gray-900 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
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