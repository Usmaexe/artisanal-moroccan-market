import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// GET handler to fetch user data based on role
export async function GET(request: NextRequest) {
  try {
    // Get the token from the request cookies or headers
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Extract user ID from the URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const role = url.searchParams.get('role') || 'customer'; // Default to customer if not specified
    
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // Make request to backend API based on role
    let endpoint = '';
    if (role === 'artisan') {
      endpoint = `${API_BASE_URL}/artisans/${id}`;
    } else if (role === 'customer') {
      endpoint = `${API_BASE_URL}/customers/${id}`;
    } else if (role === 'admin') {
      endpoint = `${API_BASE_URL}/admins/${id}`;
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
    
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(`Error fetching user data:`, error.message);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: error.response?.status || 500 }
    );
  }
}

// PUT handler to update user data
export async function PUT(request: NextRequest) {
  try {
    // Get the token from the request cookies or headers
    const token = request.cookies.get('token')?.value || 
                 request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body
    const data = await request.json();
    
    // Extract user ID and role from the URL or body
    const url = new URL(request.url);
    const id = url.searchParams.get('id') || data.id;
    const role = data.role || 'customer'; // Default to customer if not specified
    
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // Make request to backend API based on role
    let endpoint = '';
    let updateData = { ...data };
    delete updateData.role; // Remove role from data before sending to backend
    
    if (role === 'artisan') {
      endpoint = `${API_BASE_URL}/artisans/${id}`;
      // Only send artisan-specific fields
      updateData = {
        name: data.name,
        phone: data.phone,
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country
      };
    } else if (role === 'customer') {
      endpoint = `${API_BASE_URL}/customers/${id}`;
    } else if (role === 'admin') {
      endpoint = `${API_BASE_URL}/admins/${id}`;
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
    
    const response = await axios.put(endpoint, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(`Error updating user data:`, error.message);
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: error.response?.status || 500 }
    );
  }
}