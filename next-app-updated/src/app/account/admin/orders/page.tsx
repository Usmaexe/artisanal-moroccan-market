"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { Search, Filter, ShoppingBag, Eye, Check, X, TruckIcon } from "lucide-react";

export default function AdminOrders() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock order data
  const orders = [
    {
      id: "ORD-2023-1568",
      customer: "John Doe",
      date: "2023-04-15",
      total: 189.99,
      status: "Pending",
      items: 2,
      payment: "Credit Card"
    },
    {
      id: "ORD-2023-1567",
      customer: "Sarah Johnson",
      date: "2023-04-14",
      total: 129.99,
      status: "Shipped",
      items: 1,
      payment: "PayPal"
    },
    {
      id: "ORD-2023-1566",
      customer: "Ahmed Hassan",
      date: "2023-04-14",
      total: 349.99,
      status: "Shipped",
      items: 1,
      payment: "Credit Card"
    },
    {
      id: "ORD-2023-1565",
      customer: "Maria Garcia",
      date: "2023-04-12",
      total: 79.99,
      status: "Delivered",
      items: 1,
      payment: "Credit Card"
    },
    {
      id: "ORD-2023-1564",
      customer: "Mohammed Ali",
      date: "2023-04-10",
      total: 245.98,
      status: "Delivered",
      items: 3,
      payment: "PayPal"
    },
    {
      id: "ORD-2023-1563",
      customer: "Emily Chen",
      date: "2023-04-08",
      total: 124.50,
      status: "Cancelled",
      items: 2,
      payment: "Credit Card"
    }
  ];

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Mock function to update order status
  const handleUpdateStatus = (id: string, newStatus: string) => {
    alert(`Update order ${id} to status: ${newStatus}`);
    // In a real app, this would call an API endpoint
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
                <p className="text-gray-600 mt-2">View and manage customer orders</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by order ID or customer name..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

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
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-amber-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <ShoppingBag className="h-5 w-5 text-amber-600 mr-2" />
                              <span className="font-medium text-gray-900">{order.id}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items} {order.items === 1 ? 'item' : 'items'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <Link 
                                href={`/account/admin/orders/${order.id}`}
                                className="text-amber-600 hover:text-amber-800"
                                title="View Order Details"
                              >
                                <Eye className="h-5 w-5" />
                              </Link>

                              {order.status === "Pending" && (
                                <button 
                                  onClick={() => handleUpdateStatus(order.id, "Shipped")}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Mark as Shipped"
                                >
                                  <TruckIcon className="h-5 w-5" />
                                </button>
                              )}
                              
                              {(order.status === "Pending" || order.status === "Shipped") && (
                                <>
                                  <button 
                                    onClick={() => handleUpdateStatus(order.id, "Delivered")}
                                    className="text-green-600 hover:text-green-800"
                                    title="Mark as Delivered"
                                  >
                                    <Check className="h-5 w-5" />
                                  </button>
                                  
                                  <button 
                                    onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                                    className="text-red-600 hover:text-red-800"
                                    title="Cancel Order"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                          No orders found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 