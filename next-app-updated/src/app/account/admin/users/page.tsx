"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { Users, Search, Filter, Edit, UserPlus, Shield, UserX } from "lucide-react";

export default function AdminUsers() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  // Mock user data
  const users = [
    {
      id: "u1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "customer",
      status: "Active",
      joinDate: "2023-01-15",
      orders: 7
    },
    {
      id: "u2",
      name: "Mohammed Alaoui",
      email: "m.alaoui@example.com",
      role: "artisan",
      status: "Active",
      joinDate: "2023-02-10",
      products: 12
    },
    {
      id: "u3",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "customer",
      status: "Active",
      joinDate: "2023-02-18",
      orders: 3
    },
    {
      id: "u4",
      name: "Fatima Zahra",
      email: "f.zahra@example.com",
      role: "artisan",
      status: "Active",
      joinDate: "2023-01-05",
      products: 8
    },
    {
      id: "u5",
      name: "Ahmed Hassan",
      email: "a.hassan@example.com",
      role: "customer",
      status: "Inactive",
      joinDate: "2023-03-20",
      orders: 0
    },
    {
      id: "u6",
      name: "Maria Garcia",
      email: "admin@example.com",
      role: "admin",
      status: "Active",
      joinDate: "2023-01-01",
      orders: null
    }
  ];

  // Filter users based on search and role
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || u.role === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // Mock function to handle user status change
  const handleToggleStatus = (id: string, currentStatus: string) => {
    alert(`Toggle user ${id} status from ${currentStatus} to ${currentStatus === 'Active' ? 'Inactive' : 'Active'}`);
    // In a real app, this would call an API endpoint
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
                <p className="text-gray-600 mt-2">View and manage all users on the platform</p>
              </div>
              <Link
                href="/account/admin/users/new"
                className="mt-4 md:mt-0 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center justify-center w-full md:w-auto"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add New User
              </Link>
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
                    placeholder="Search by name or email..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-amber-600"
                  />
                </div>

                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select 
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-amber-600"
                  >
                    <option value="All">All Roles</option>
                    <option value="Customer">Customers</option>
                    <option value="Artisan">Artisans</option>
                    <option value="Admin">Admins</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-amber-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                <span className="font-medium text-amber-700">
                                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {user.role === "admin" ? (
                                <Shield className="h-4 w-4 text-purple-600 mr-1" />
                              ) : user.role === "artisan" ? (
                                <Users className="h-4 w-4 text-blue-600 mr-1" />
                              ) : (
                                <Users className="h-4 w-4 text-green-600 mr-1" />
                              )}
                              <span className="capitalize text-sm text-gray-900">
                                {user.role}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.role === "customer" ? (
                              `${user.orders} orders`
                            ) : user.role === "artisan" ? (
                              `${user.products} products`
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <Link 
                                href={`/account/admin/users/${user.id}`}
                                className="text-amber-600 hover:text-amber-800"
                              >
                                <Edit className="h-5 w-5" />
                              </Link>
                              <button 
                                onClick={() => handleToggleStatus(user.id, user.status)}
                                className={`${
                                  user.status === "Active" ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"
                                }`}
                                disabled={user.role === "admin" && user.id === "u6"}
                                title={user.status === "Active" ? "Deactivate user" : "Activate user"}
                              >
                                <UserX className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No users found matching your search.
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