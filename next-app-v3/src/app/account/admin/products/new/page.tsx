"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/api/categories";
import { getArtisans } from "@/lib/api/artisans";
import { createProduct } from "@/lib/api/products";
import { Category, Artisan } from "@/types";
import { toast } from "react-hot-toast";

export default function NewProduct() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "",
    artisanId: "",
    status: "Active",
    images: [""],
    materials: [""],
    features: [""],
    dimensions: "",
    isFeatured: false,
    isOnSale: false,
    salePrice: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesData, artisansData] = await Promise.all([
          getCategories(),
          getArtisans()
        ]);
        setCategories(categoriesData);
        setArtisans(artisansData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load categories and artisans");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleArrayChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field as keyof typeof prev] as string[])];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field as keyof typeof prev] as string[])];
      newArray.push("");
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const removeArrayItem = (index: number, field: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field as keyof typeof prev] as string[])];
      if (newArray.length > 1) {
        newArray.splice(index, 1);
      }
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    
    if (!formData.price || isNaN(Number(formData.price))) {
      newErrors.price = "Valid price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than zero";
    }
    
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    
    if (!formData.stock || isNaN(Number(formData.stock))) {
      newErrors.stock = "Valid stock quantity is required";
    } else if (Number(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }
    
    if (!formData.artisanId) newErrors.artisanId = "Artisan is required";
    
    if (!formData.images[0]) newErrors.images = "At least one image URL is required";
    
    if (formData.isOnSale && (!formData.salePrice || isNaN(Number(formData.salePrice)) || Number(formData.salePrice) <= 0)) {
      newErrors.salePrice = "Valid sale price is required when product is on sale";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        
        // Format the data for the API
        const productData = {
          ...formData,
          price: Number(formData.price),
          inStock: Number(formData.stock) > 0,
          salePrice: formData.isOnSale ? Number(formData.salePrice) : undefined,
          // Filter out empty strings from arrays
          images: formData.images.filter(img => img.trim() !== ""),
          materials: formData.materials.filter(mat => mat.trim() !== ""),
          features: formData.features.filter(feat => feat.trim() !== "")
        };
        
        await createProduct(productData);
        toast.success("Product created successfully!");
        router.push("/account/admin/products");
      } catch (error) {
        console.error("Error creating product:", error);
        toast.error("Failed to create product. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="bg-amber-50 min-h-screen py-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Link 
                href="/account/admin/products"
                className="mr-4 p-2 rounded-full hover:bg-amber-100"
              >
                <ArrowLeft className="h-5 w-5 text-amber-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600 mt-1">Create a new product listing</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Product Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price (USD)*
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className={`block w-full pl-7 pr-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>

                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock Quantity*
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        className={`mt-1 block w-full border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                      />
                      {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                        Category*
                      </label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="artisanId" className="block text-sm font-medium text-gray-700">
                      Artisan*
                    </label>
                    <select
                      id="artisanId"
                      name="artisanId"
                      value={formData.artisanId}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.artisanId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                    >
                      <option value="">Select an artisan</option>
                      {artisans.map((artisan) => (
                        <option key={artisan.id} value={artisan.id}>
                          {artisan.name}
                        </option>
                      ))}
                    </select>
                    {errors.artisanId && <p className="mt-1 text-sm text-red-600">{errors.artisanId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images URLs*
                    </label>
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => handleArrayChange(index, 'images', e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className={`flex-grow border ${errors.images && index === 0 ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'images')}
                          className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('images')}
                      className="mt-1 px-3 py-1 bg-amber-100 text-amber-600 rounded hover:bg-amber-200"
                    >
                      Add Image URL
                    </button>
                    {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Materials
                    </label>
                    {formData.materials.map((material, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          value={material}
                          onChange={(e) => handleArrayChange(index, 'materials', e.target.value)}
                          placeholder="e.g., Leather, Clay, Wood"
                          className="flex-grow border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'materials')}
                          className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('materials')}
                      className="mt-1 px-3 py-1 bg-amber-100 text-amber-600 rounded hover:bg-amber-200"
                    >
                      Add Material
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features
                    </label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayChange(index, 'features', e.target.value)}
                          placeholder="e.g., Handmade, Eco-friendly"
                          className="flex-grow border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'features')}
                          className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('features')}
                      className="mt-1 px-3 py-1 bg-amber-100 text-amber-600 rounded hover:bg-amber-200"
                    >
                      Add Feature
                    </button>
                  </div>

                  <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      placeholder="e.g., 10 x 5 x 3 inches"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                        Featured Product
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isOnSale"
                        name="isOnSale"
                        checked={formData.isOnSale}
                        onChange={handleChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isOnSale" className="ml-2 block text-sm text-gray-700">
                        On Sale
                      </label>
                    </div>
                  </div>

                  {formData.isOnSale && (
                    <div>
                      <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700">
                        Sale Price (USD)*
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          id="salePrice"
                          name="salePrice"
                          value={formData.salePrice}
                          onChange={handleChange}
                          className={`block w-full pl-7 pr-3 py-2 border ${errors.salePrice ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.salePrice && <p className="mt-1 text-sm text-red-600">{errors.salePrice}</p>}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <Link
                    href="/account/admin/products"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}