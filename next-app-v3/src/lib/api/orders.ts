import { Order } from '@/types';

// API base URL - use env variable only
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to get the auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('morocco_craft_token');
  }
  return null;
};

// Get all orders for a customer
export const getCustomerOrders = async (customerId: string): Promise<any[]> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/orders?customerId=${customerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch orders');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return [];
  }
};

// Get order by ID
export const getOrder = async (id: string): Promise<any | null> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch order');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return null;
  }
};

// Create a new order
export const createOrder = async (orderData: { customer_id: string; items: any[]; total: number }): Promise<any | null> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};