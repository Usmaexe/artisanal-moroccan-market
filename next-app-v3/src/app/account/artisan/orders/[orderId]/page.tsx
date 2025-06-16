"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { ArrowLeft, Package, User, CreditCard, MapPin, Calendar, ShoppingBag, Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
    // other product fields
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
    name: string;
    email: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

export default function ArtisanOrderDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderIdParam = params.orderId as string;
  // Extract the numeric part from the order ID (e.g., "ORD-123" -> "123")
  const numericOrderId = orderIdParam.replace(/\D/g, '');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order data
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user?.id || !numericOrderId) return;
      
      try {
        setLoading(true);
        
        // Get token from localStorage
        const token = localStorage.getItem('morocco_craft_token');
        
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }
        
        // Fetch order details
        const response = await axios.get(`http://localhost:5000/api/orders/${numericOrderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.data) {
          throw new Error('Order not found');
        }
        
        // Check if this order contains products from this artisan
        const artisanId = parseInt(user.id, 10);
        const hasArtisanProducts = response.data.items && 
          response.data.items.some((item: OrderItem) => 
            item.product && item.product.artisan_id === artisanId
          );
        
        if (!hasArtisanProducts) {
          throw new Error('This order does not contain any of your products');
        }
        
        // Fetch customer details
        const customerResponse = await axios.get(
          `http://localhost:5000/api/customers/${response.data.customer_id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        // Combine order with customer details
        setOrder({
          ...response.data,
          customer: customerResponse.data
        });
        
        setError(null);
      } catch (err: any) {
        console.error("Error fetching order details:", err);
        setError(err.message || "Failed to load order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [user?.id, numericOrderId]);

  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd HH:mm');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Filter items to only show those made by this artisan
  const getArtisanItems = () => {
    if (!order?.items || !user?.id) return [];
    
    const artisanId = parseInt(user.id, 10);
    return order.items.filter(item => 
      item.product && item.product.artisan_id === artisanId
    );
  };

  // Calculate subtotal for artisan's items only
  const calculateSubtotal = () => {
    const artisanItems = getArtisanItems();
    return artisanItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + (price * item.quantity);
    }, 0);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Generate mock timeline based on order status
  const generateTimeline = (order: Order) => {
    const timeline = [
      { status: "Order Placed", date: order.created_at, note: "Order received" }
    ];
    
    // Add more events based on status
    if (["processing", "shipped", "delivered"].includes(order.status.toLowerCase())) {
      timeline.push({
        status: "Processing", 
        date: new Date(new Date(order.created_at).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        note: "Order is being prepared"
      });
    }
    
    if (["shipped", "delivered"].includes(order.status.toLowerCase())) {
      timeline.push({
        status: "Shipped", 
        date: new Date(new Date(order.created_at).getTime() + 48 * 60 * 60 * 1000).toISOString(),
        note: "Package shipped via Standard Shipping"
      });
    }
    
    if (order.status.toLowerCase() === "delivered") {
      timeline.push({
        status: "Delivered", 
        date: new Date(new Date(order.created_at).getTime() + 96 * 60 * 60 * 1000).toISOString(),
        note: "Package delivered successfully"
      });
    }
    
    if (order.status.toLowerCase() === "cancelled") {
      timeline.push({
        status: "Cancelled", 
        date: new Date(new Date(order.created_at).getTime() + 12 * 60 * 60 * 1000).toISOString(),
        note: "Order was cancelled"
      });
    }
    
    return timeline;
  };

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["artisan"]}>
        <div className="bg-amber-50 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-gray-600">Loading order details...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute allowedRoles={["artisan"]}>
        <div className="bg-amber-50 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center mb-8">
                <Link 
                  href="/account/artisan/orders"
                  className="mr-4 p-2 rounded-full hover:bg-amber-100"
                >
                  <ArrowLeft className="h-5 w-5 text-amber-600" />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Details</h1>
              </div>
              
              <div className="bg-red-50 rounded-lg shadow-md p-6 text-center">
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => router.push('/account/artisan/orders')} 
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Return to Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!order) {
    return (
      <ProtectedRoute allowedRoles={["artisan"]}>
        <div className="bg-amber-50 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center py-12">
              <p className="text-gray-600">Order not found</p>
              <Link 
                href="/account/artisan/orders"
                className="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Return to Orders
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const artisanItems = getArtisanItems();
  const subtotal = calculateSubtotal();
  const timeline = generateTimeline(order);

  return (
    <ProtectedRoute allowedRoles={["artisan"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-8">
              <Link 
                href="/account/artisan/orders"
                className="mr-4 p-2 rounded-full hover:bg-amber-100"
              >
                <ArrowLeft className="h-5 w-5 text-amber-600" />
              </Link>
              <div>
                <div className="flex items-center">
                  <ShoppingBag className="h-6 w-6 text-amber-600 mr-2" />
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order {orderIdParam}</h1>
                </div>
                <p className="text-gray-600 mt-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(order.created_at)}</span>
                </p>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-amber-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Customer</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-medium">{order.customer?.name || 'Customer'}</p>
                  <p className="text-gray-600">{order.customer?.email || 'N/A'}</p>
                  <p className="text-gray-600">{order.customer?.phone || 'N/A'}</p>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Shipping</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-medium">Standard Shipping</p>
                  <div className="text-gray-600">
                    <p>{order.customer?.street || 'N/A'}</p>
                    <p>{order.customer?.city || 'N/A'}{order.customer?.postalCode ? `, ${order.customer.postalCode}` : ''}</p>
                    <p>{order.customer?.country || 'N/A'}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Package className="h-5 w-5 text-amber-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Your Products in This Order</h2>
              </div>
              
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
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {artisanItems.length > 0 ? (
                      artisanItems.map((item) => (
                        <tr key={item.order_item_id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center mr-3">
                                <Package className="h-6 w-6 text-amber-600" />
                              </div>
                              <div className="font-medium text-gray-900">{item.product?.name || 'Product'}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {parseFloat(item.price).toFixed(2)} DH
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {(parseFloat(item.price) * item.quantity).toFixed(2)} DH
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No products found in this order.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-amber-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Order Timeline</h2>
              </div>
              
              <div className="flow-root">
                <ul className="-mb-8">
                  {timeline.map((event, eventIdx) => (
                    <li key={eventIdx}>
                      <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? (
                          <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex items-start space-x-3">
                          <div>
                            <div className="relative px-1">
                              <div className="h-8 w-8 bg-amber-100 rounded-full ring-8 ring-white flex items-center justify-center">
                                <ShoppingBag className="h-4 w-4 text-amber-600" />
                              </div>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 py-0">
                            <div className="text-sm text-gray-500">
                              <div className="font-medium text-gray-900">{event.status}</div>
                              <div className="mt-1">{formatDate(event.date)}</div>
                              <div className="mt-1">{event.note}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}