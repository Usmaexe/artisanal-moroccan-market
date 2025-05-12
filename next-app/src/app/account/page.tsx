"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Eye, EyeOff, Package, Heart, Clock, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  // State for login form
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State for registration form
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle login input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle registration input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', loginCredentials);
    
    // Simulate successful login
    setIsLoggedIn(true);
  };
  
  // Handle registration submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt with:', registerData);
    
    // Normally would validate passwords match, etc.
    // Simulate successful registration and login
    setIsLoggedIn(true);
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  // Mock order data for the account dashboard
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-04-15',
      status: 'Delivered',
      total: 245.50,
      items: 3
    },
    {
      id: 'ORD-12346',
      date: '2023-05-02',
      status: 'Processing',
      total: 127.80,
      items: 2
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-morocco-charcoal mb-8">
        My Account
      </h1>
      
      {isLoggedIn ? (
        // Account Dashboard
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                <div className="bg-morocco-cream p-2 rounded-full">
                  <User size={24} className="text-morocco-terracotta" />
                </div>
                <div>
                  <p className="font-medium">Welcome back,</p>
                  <p className="text-morocco-terracotta">John Doe</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="#dashboard">
                    <Package className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="#orders">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="#wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="#history">
                    <Clock className="mr-2 h-4 w-4" />
                    Order History
                  </Link>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="#settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-heading font-semibold mb-6">Dashboard</h2>
              
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-morocco-cream rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-semibold">{orders.length}</p>
                </div>
                
                <div className="bg-morocco-cream rounded-lg p-4">
                  <p className="text-sm text-gray-600">Wishlist Items</p>
                  <p className="text-2xl font-semibold">5</p>
                </div>
                
                <div className="bg-morocco-cream rounded-lg p-4">
                  <p className="text-sm text-gray-600">Recent Reviews</p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
              </div>
              
              {/* Recent Orders */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-morocco-terracotta">
                            {order.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                            {order.date}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                            <Button variant="link" className="p-0 h-auto" asChild>
                              <Link href={`/orders/${order.id}`}>View Details</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Account Settings Summary */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                    <p className="text-gray-600">John Doe</p>
                    <p className="text-gray-600">johndoe@example.com</p>
                    <Button variant="link" className="p-0 h-auto mt-2">
                      Edit
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Default Shipping Address</h4>
                    <p className="text-gray-600">123 Main Street</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                    <p className="text-gray-600">United States</p>
                    <Button variant="link" className="p-0 h-auto mt-2">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Login/Register Forms
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={loginCredentials.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginCredentials.password}
                        onChange={handleLoginChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-morocco-terracotta focus:ring-morocco-terracotta border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="text-morocco-terracotta hover:text-morocco-rust">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register">
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={registerData.password}
                        onChange={handleRegisterChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-morocco-terracotta focus:ring-morocco-terracotta border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="#" className="text-morocco-terracotta hover:text-morocco-rust">Terms and Conditions</a>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
