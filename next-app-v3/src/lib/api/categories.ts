import { Category } from '@/types';

// API base URL - adjust this to match your backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get the auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('morocco_craft_token');
  }
  return null;
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get category by ID
export const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
};

// Create a new category (admin only)
export const createCategory = async (categoryData: Partial<Category>): Promise<Category> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(categoryData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create category');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};