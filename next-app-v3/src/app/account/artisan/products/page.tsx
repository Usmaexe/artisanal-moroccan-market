"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
  isOnSale?: boolean;
  salePrice?: number;
  inStock?: boolean;
}

export default function ArtisanProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchArtisanProducts = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      // Fetch all products
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      
      // Filter products by artisan_id matching the logged-in user's ID
      const artisanProducts = response.data
        .filter((product: any) => product.artisan_id === parseInt(user.id))
        .map((product: any) => ({
          id: product.product_id.toString(),
          name: product.name,
          description: product.description || "",
          price: parseFloat(product.price),
          images: [product.image_url],
          category: {
            name: product.category?.name || "Uncategorized"
          },
          isOnSale: false,
          inStock: true // Assuming all products are in stock by default
        }));
      
      setProducts(artisanProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    // Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }
    
    try {
      setDeleteLoading(productId);
      
      // Get token from localStorage
      const token = localStorage.getItem('morocco_craft_token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      // Make API call to delete product
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update the products list by removing the deleted product
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    fetchArtisanProducts();
  }, [user?.id]);

  return (
    <ProtectedRoute allowedRoles={["artisan"]}>
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
              <p className="text-gray-600">Manage your product listings</p>
            </div>
            <Link 
              href="/account/artisan/products/new" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md inline-flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Product
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              {/* Products Management Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 relative rounded overflow-hidden">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.description.substring(0, 60)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.isOnSale ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-amber-600 font-bold">{product.salePrice} DH</span>
                                  <span className="text-gray-500 text-sm line-through">{product.price} DH</span>
                                </div>
                              ) : (
                                <span className="text-amber-600 font-bold">{product.price} DH</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link 
                                href={`/account/artisan/products/edit/${product.id}`}
                                className="text-amber-600 hover:text-amber-900"
                              >
                                <Edit className="h-5 w-5" />
                              </Link>
                              <button 
                                onClick={() => deleteProduct(product.id)}
                                disabled={deleteLoading === product.id}
                                className={`text-red-600 hover:text-red-900 ${deleteLoading === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                {deleteLoading === product.id ? (
                                  <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Trash2 className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {products.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No products</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                  <div className="mt-6">
                    <Link
                      href="/account/artisan/products/new"
                      className="inline-flex items-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      <PlusCircle className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      New Product
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}