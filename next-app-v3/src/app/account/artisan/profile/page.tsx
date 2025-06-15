'use client';

import { useState, useEffect, useRef } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Phone, MapPin, Save, Camera, Upload, FileText, MapPinIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function ArtisanProfilePage() {
  const { user, token, updateUser } = useAuth();
  
  // Initialize form state with user data
  interface FormData {
    name: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    image_url?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Morocco',
    image_url: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch artisan data and update form
  useEffect(() => {
    const fetchArtisanData = async () => {
      if (!user?.id) return;      
      
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/artisans/${user.id}`);
        const artisanData = response.data;
        
        setFormData({
          name: artisanData.name || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: artisanData.bio || '',
          location: artisanData.location || '',
          street: user.street || '',
          city: user.city || '',
          state: user.state || '',
          postalCode: user.postalCode || '',
          country: user.country || 'Morocco',
          image_url: artisanData.image_url || ''
        });
      } catch (err) {
        setError('Failed to load artisan data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanData();
  }, [user]);

  const [isEditing, setIsEditing] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPG, PNG or WEBP images allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be smaller than 2MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('path', `images/artisans/${Date.now()}_${file.name}`);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const { path } = await response.json();
      
      // Update profile with new image
      const updateResponse = await axios.put(`http://localhost:5000/api/artisans/${user?.id}`, 
        { image_url: path },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!updateResponse.data) throw new Error('Profile update failed');
      
      // Update local state
      setFormData(prev => ({ ...prev, image_url: path }));
      
      // Update auth context
      updateUser({ image_url: path });
      
      toast.success('Profile image updated!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update artisan-specific fields
      const artisanResponse = await axios.put(
        `http://localhost:5000/api/artisans/${user?.id}`,
        {
          name: formData.name,
          bio: formData.bio,
          location: formData.location
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      // Update user fields
      const userResponse = await fetch(`/api/user?id=${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          // Include role for the backend to determine which table to update
          role: 'artisan',
          // Don't send email as it shouldn't be changed
          email: undefined
        }),
      });

      if (!artisanResponse.data || !userResponse.ok) {
        throw new Error('Failed to update profile');
      }

      // Update auth context with new user data
      updateUser({
        name: formData.name,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={['artisan']}>
        <div className="bg-amber-50 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center py-12">
              <p className="text-lg">Loading profile information...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute allowedRoles={['artisan']}>
        <div className="bg-amber-50 min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center py-12">
              <p className="text-lg text-red-600">{error}</p>
              <Link 
                href="/account/artisan/dashboard" 
                className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-medium"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['artisan']}>
      <div className="bg-amber-50 min-h-screen py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">My Artisan Profile</h1>
              <Link 
                href="/account/artisan/dashboard" 
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Back to Dashboard
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-amber-600 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white mr-4">
                    {formData.image_url ? (
                      <Image
                        src={formData.image_url.startsWith('http') ? 
                          formData.image_url : 
                          formData.image_url.startsWith('/') ?
                            formData.image_url :
                            `/images/artisans/${formData.image_url.split('/').pop() || formData.image_url}`}
                        alt={formData.name || 'Profile'}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="h-full w-full bg-amber-100 flex items-center justify-center">
                        <User className="h-10 w-10 text-amber-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{formData.name}</h2>
                    <p className="text-amber-100">{formData.email}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className="bg-white text-amber-600 p-2 rounded-full hover:bg-amber-50 transition-colors"
                    title="Change profile picture"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Upload className="h-5 w-5 animate-pulse" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative text-gray-900">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative text-gray-900">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={true} // Email should not be editable
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="relative text-gray-900">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <div className="relative text-gray-900">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="e.g. Marrakech, Fez"
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <div className="relative text-gray-900">
                          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                            <FileText className="h-5 w-5 text-gray-400" />
                          </div>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            value={formData.bio}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Tell customers about yourself and your craft..."
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <div className="relative text-gray-900">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="block text-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="block text-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="block text-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="block text-gray-900 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100 disabled:text-gray-500"
                        >
                          <option value="Morocco">Morocco</option>
                          <option value="Algeria">Algeria</option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  {isEditing ? (
                    <div className="space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}