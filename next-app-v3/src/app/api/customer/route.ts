import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// API base URL from environment variable
console.log(process.env.NEXT_PUBLIC_API_URL);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// GET handler to fetch customer data
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
    
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // Make request to backend API
    const response = await axios.get(`${API_BASE_URL}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching customer data:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch customer data' },
      { status: error.response?.status || 500 }
    );
  }
}

// PUT handler to update customer data
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
    
    // Extract user ID from the URL or body
    const url = new URL(request.url);
    const id = url.searchParams.get('id') || data.id;
    
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // Make request to backend API
    const response = await axios.put(`${API_BASE_URL}/customers/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error updating customer data:', error.message);
    return NextResponse.json(
      { error: 'Failed to update customer data' },
      { status: error.response?.status || 500 }
    );
  }
}