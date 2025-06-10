"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { getProducts } from "@/data/products";
import { BarChart, LineChart, PieChart, ArrowUp, ArrowDown, Calendar, Filter, Package, ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react";

export default function ArtisanAnalytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("30days");
  const [productFilter, setProductFilter] = useState("all");

  // Get products belonging to this artisan
  const allProducts = getProducts();
  // In a real app, we would filter by the actual artisan ID
  // For now, we'll just use the first few products as a simulation
  const artisanProducts = allProducts.slice(0, 6);

  // Mock analytics data
  const salesData = {
    total: 3240,
    change: 12.5, // percentage change from previous period
    trend: "up",
    byProduct: [
      { name: artisanProducts[0].name, value: 1250, percentage: 38.6 },
      { name: artisanProducts[1].name, value: 980, percentage: 30.2 },
      { name: artisanProducts[2].name, value: 650, percentage: 20.1 },
      { name: "Other Products", value: 360, percentage: 11.1 }
    ],
    byMonth: [
      { month: "Jan", value: 220 },
      { month: "Feb", value: 280 },
      { month: "Mar", value: 250 },
      { month: "Apr", value: 310 },
      { month: "May", value: 350 },
      { month: "Jun", value: 420 },
      { month: "Jul", value: 390 },
      { month: "Aug", value: 380 },
      { month: "Sep", value: 410 },
      { month: "Oct", value: 490 },
      { month: "Nov", value: 530 },
      { month: "Dec", value: 580 }
    ]
  };

  const ordersData = {
    total: 68,
    change: 8.2,
    trend: "up",
    byStatus: [
      { status: "Delivered", count: 42, percentage: 61.8 },
      { status: "Shipped", count: 15, percentage: 22.1 },
      { status: "Pending", count: 8, percentage: 11.8 },
      { status: "Cancelled", count: 3, percentage: 4.3 }
    ]
  };

  const customersData = {
    total: 45,
    new: 12,
    returning: 33,
    topLocations: [
      { location: "United States", count: 18, percentage: 40 },
      { location: "United Kingdom", count: 8, percentage: 17.8 },
      { location: "Canada", count: 6, percentage: 13.3 },
      { location: "Germany", count: 5, percentage: 11.1 },
      { location: "France", count: 4, percentage: 8.9 },
      { location: "Other", count: 4, percentage: 8.9 }
    ]
  };

  const productPerformance = artisanProducts.map((product, index) => ({
    id: product.id,
    name: product.name,
    sales: [24, 16, 7][index] || 0,
    revenue: [89.99 * 24, 129.99 * 16, 349.99 * 7][index] || 0,
    views: [320, 280, 190][index] || 0,
    conversionRate: [7.5, 5.7, 3.7][index] || 0
  }));

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  // Helper function to format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <ProtectedRoute allowedRoles={["artisan"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
                <p className="text-gray-600 mt-2">Track your sales performance and customer metrics</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                  >
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                    <option value="year">Last 12 months</option>
                    <option value="allTime">All time</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Products</option>
                    {artisanProducts.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Sales Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-green-100 mr-3">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Total Sales</h2>
                  </div>
                  <span className={`flex items-center text-sm font-medium ${salesData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {salesData.trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {formatPercentage(salesData.change)}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(salesData.total)}</div>
                <p className="text-sm text-gray-600">Based on selected time period</p>
              </div>

              {/* Orders Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-blue-100 mr-3">
                      <ShoppingBag className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
                  </div>
                  <span className={`flex items-center text-sm font-medium ${ordersData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {ordersData.trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {formatPercentage(ordersData.change)}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{ordersData.total}</div>
                <p className="text-sm text-gray-600">Based on selected time period</p>
              </div>

              {/* Customers Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-purple-100 mr-3">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Customers</h2>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    <span className="text-green-600">{customersData.new} new</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{customersData.total}</div>
                <p className="text-sm text-gray-600">{customersData.returning} returning customers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Sales by Product */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <PieChart className="h-6 w-6 text-amber-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Sales by Product</h2>
                </div>
                <div className="space-y-4">
                  {salesData.byProduct.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-amber-600 h-2.5 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{formatPercentage(item.percentage)} of total sales</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders by Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <BarChart className="h-6 w-6 text-amber-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Orders by Status</h2>
                </div>
                <div className="space-y-4">
                  {ordersData.byStatus.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.status}</span>
                        <span className="text-sm font-medium text-gray-900">{item.count} orders</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 
                            item.status === 'Shipped' ? 'bg-blue-500' : 
                            item.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{formatPercentage(item.percentage)} of total orders</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Sales Trend */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center mb-6">
                <LineChart className="h-6 w-6 text-amber-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Monthly Sales Trend</h2>
              </div>
              <div className="h-64 flex items-end space-x-2">
                {salesData.byMonth.map((item, index) => {
                  // Calculate height percentage based on max value
                  const maxValue = Math.max(...salesData.byMonth.map(d => d.value));
                  const heightPercentage = (item.value / maxValue) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-amber-500 rounded-t-sm hover:bg-amber-600 transition-colors"
                        style={{ height: `${heightPercentage}%` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2">{item.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Performance Table */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-amber-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Product Performance</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Conversion Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productPerformance.map((product) => (
                      <tr key={product.id} className="hover:bg-amber-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.sales} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(product.revenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.views}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPercentage(product.conversionRate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customer Locations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-amber-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Customer Locations</h2>
              </div>
              <div className="space-y-4">
                {customersData.topLocations.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.location}</span>
                      <span className="text-sm font-medium text-gray-900">{item.count} customers</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-purple-500 h-2.5 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{formatPercentage(item.percentage)} of total customers</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}