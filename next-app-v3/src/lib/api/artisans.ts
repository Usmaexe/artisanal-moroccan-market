import { Artisan } from '@/types';

// API base URL - adjust this to match your backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get the auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('morocco_craft_token');
  }
  return null;
};

// Get all artisans
export const getArtisans = async (): Promise<Artisan[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/artisans`);
    if (!response.ok) throw new Error('Failed to fetch artisans');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artisans:', error);
    return [];
  }
};

// Get artisan by ID
export const getArtisan = async (id: string): Promise<Artisan | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/artisans/${id}`);
    if (!response.ok) throw new Error('Failed to fetch artisan');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching artisan ${id}:`, error);
    return null;
  }
};

// Create a new artisan (admin only)
export const createArtisan = async (artisanData: Partial<Artisan>): Promise<Artisan> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/artisans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(artisanData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create artisan');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating artisan:', error);
    throw error;
  }
};

// Update an artisan (admin only)
export const updateArtisan = async (id: string, artisanData: Partial<Artisan>): Promise<Artisan> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/artisans/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(artisanData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update artisan');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating artisan ${id}:`, error);
    throw error;
  }
};