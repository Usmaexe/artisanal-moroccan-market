"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { Search, Filter, ShoppingBag, Eye, Package } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

interface OrderItem {
  order_item_id: number;
  quantity: number;
  price: string;
  product_id: number;
  product: {
    product_id: number;
    name: string;
    price: string;
    artisan_id: number;
    image_url?: string;
    description?: string;
  };
}

interface Order {
  order_id: number;
  status: string;
  total: string;
  created_at: string;
  customer_id: number;
  items: OrderItem[];
  customer?: {
    customer_id: number;
    name: string;
    email: string;
    phone?: string;
  };
}

export default function ArtisanOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch all orders and filter those containing artisan's products
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // Get token from localStorage
        const token = localStorage.getItem('morocco_craft_token');
        
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }
        
        // Fetch all orders with their items and product details
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Validate response data
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid order data received from server');
        }

        console.log('Orders from API:', response.data);
        
        // Get product details for each order item
        const ordersWithProducts = await Promise.all(
          response.data.map(async (order: Order) => {
            // Skip if order has no items
            if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
              return order;
            }
            
            // Get product details for each item
            const itemsWithProducts = await Promise.all(
              order.items.map(async (item) => {
                try {
                  // Fetch product details if not already included
                  if (!item.product) {
                    const productResponse = await axios.get(
                      `http://localhost:5000/api/products/${item.product_id}`,
                      {
                        headers: {
                          'Authorization': `Bearer ${token}`
                        }
                      }
                    );
                    
                    return {
                      ...item,
                      product: productResponse.data
                    };
                  }
                  return item;
                } catch (err) {
                  console.error(`Error fetching product for item ${item.order_item_id}:`, err);
                  // Return item without product details rather than failing completely
                  return item;
                }
              })
            );
            
            return {
              ...order,
              items: itemsWithProducts
            };
          })
        );
        
        // Filter orders that contain products made by this artisan
        const artisanId = parseInt(user.id, 10);
        
        if (isNaN(artisanId)) {
          throw new Error('Invalid artisan ID');
        }
        
        const artisanOrders = ordersWithProducts.filter((order: Order) => {
          // Ensure order has items array
          if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            return false;
          }
          
          // Check if any order item contains a product made by this artisan
          return order.items.some(item => {
            return item.product && 
                   typeof item.product.artisan_id === 'number' && 
                   item.product.artisan_id === artisanId;
          });
        });

        console.log('Filtered artisan orders:', artisanOrders);
        
        // Fetch customer details for each order
        const ordersWithCustomers = await Promise.all(
          artisanOrders.map(async (order: Order) => {
            try {
              const customerResponse = await axios.get(
                `http://localhost:5000/api/customers/${order.customer_id}`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
              
              return {
                ...order,
                customer: customerResponse.data
              };
            } catch (err) {
              console.error(`Error fetching customer for order ${order.order_id}:`, err);
              // Return order without customer details rather than failing completely
              return {
                ...order,
                customer: {
                  customer_id: order.customer_id,
                  name: 'Unknown Customer',
                  email: 'N/A'
                }
              };
            }
          })
        );
        
        // Sort orders by creation date (newest first)
        const sortedOrders = ordersWithCustomers.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError("Your session has expired. Please log in again.");
          } else if (err.response?.status === 403) {
            setError("You don't have permission to view orders.");
          } else {
            setError(err.response?.data?.message || "Failed to load orders. Please try again later.");
          }
        } else {
          setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const orderId = `ORD-${order.order_id}`;
    const customerName = order.customer?.name?.toLowerCase() || "";
    const customerEmail = order.customer?.email?.toLowerCase() || "";
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      orderId.toLowerCase().includes(searchLower) || 
      customerName.includes(searchLower) ||
      customerEmail.includes(searchLower);
    
    const matchesStatus = filterStatus === "All" || 
      order.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date from ISO string
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Count items in an order that belong to this artisan
  const countArtisanItems = (items: OrderItem[]) => {
    if (!user?.id || !items || !Array.isArray(items)) return 0;
    
    const artisanId = parseInt(user.id, 10);
    return items.filter(item => 
      item.product && 
      typeof item.product.artisan_id === 'number' && 
      item.product.artisan_id === artisanId
    ).length;
  };

  // Calculate total revenue from artisan's items in an order
  const calculateArtisanRevenue = (items: OrderItem[]) => {
    if (!user?.id || !items || !Array.isArray(items)) return 0;
    
    const artisanId = parseInt(user.id, 10);
    return items
      .filter(item => 
        item.product && 
        typeof item.product.artisan_id === 'number' && 
        item.product.artisan_id === artisanId
      )
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.price || '0');
        return total + (itemPrice * item.quantity);
      }, 0);
  };

  // Get unique statuses for filter dropdown
  const availableStatuses = Array.from(new Set(orders.map(order => order.status)));

  return (
    <ProtectedRoute allowedRoles={["artisan"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600 mt-2">View and manage orders containing your products</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-amber-600 mr-2" />
                    <span className="text-sm text-gray-600">Total Orders: </span>
                    <span className="font-semibold text-gray-900 ml-1">{orders.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by order ID, customer name, or email..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center min-w-[200px]">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="All">All Statuses</option>
                    {availableStatuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 rounded-md p-4 text-center">
                  <p className="text-red-600">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Orders Table */}
              {!loading && !error && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Your Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Your Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order.order_id} className="hover:bg-amber-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <ShoppingBag className="h-5 w-5 text-amber-600 mr-2" />
                                <span className="font-medium text-gray-900">ORD-{order.order_id}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                  {order.customer?.name || "Unknown Customer"}
                                </div>
                                <div className="text-gray-500">
                                  {order.customer?.email || "N/A"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {parseFloat(order.total || '0').toFixed(2)} DH
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                              {calculateArtisanRevenue(order.items).toFixed(2)} DH
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="font-medium">{countArtisanItems(order.items)}</span>
                              <span className="text-gray-400 ml-1">
                                {countArtisanItems(order.items) === 1 ? 'item' : 'items'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link 
                                href={`/account/artisan/orders/ORD-${order.order_id}`}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-amber-600 bg-amber-100 hover:bg-amber-200 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                                title="View Order Details"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center">
                              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                              <p className="text-gray-500">
                                {searchTerm || filterStatus !== "All" 
                                  ? "No orders match your current search or filter criteria."
                                  : "You don't have any orders containing your products yet."
                                }
                              </p>
                              {(searchTerm || filterStatus !== "All") && (
                                <button
                                  onClick={() => {
                                    setSearchTerm("");
                                    setFilterStatus("All");
                                  }}
                                  className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                                >
                                  Clear filters
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}