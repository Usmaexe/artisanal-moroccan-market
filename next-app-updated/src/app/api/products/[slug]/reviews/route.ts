import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";
import { mockReviews } from "../../../../../lib/mock-data";

// GET reviews for a specific product
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = getProductBySlug(params.slug);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Get pagination and sorting parameters from URL
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');
    const sort = url.searchParams.get('sort') || 'newest';
    
    // In a real app, you would query the database for reviews
    // For now, we'll filter our mock data
    let productReviews = mockReviews.filter(
      (review) => review.product_id === params.slug
    );
    
    // Apply sorting
    if (sort === 'newest') {
      productReviews = productReviews.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sort === 'highest') {
      productReviews = productReviews.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      productReviews = productReviews.sort((a, b) => a.rating - b.rating);
    }
    
    // Get total count before pagination
    const totalCount = productReviews.length;
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = productReviews.slice(startIndex, endIndex);
    
    return NextResponse.json({
      reviews: paginatedReviews,
      totalCount: totalCount,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST a new review for this product
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = getProductBySlug(params.slug);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.rating || !body.customer_id) {
      return NextResponse.json(
        { error: "Rating and customer ID are required" },
        { status: 400 }
      );
    }
    
    // Check if user has already reviewed this product
    const existingReview = mockReviews.find(
      (review) => 
        review.product_id === params.slug && 
        review.customer_id === String(body.customer_id)
    );
    
    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }
    
    // In a real app, you would save to the database
    // For our mock implementation, we'll add to our array
    const newReview = {
      review_id: mockReviews.length + 1,
      rating: body.rating,
      comment: body.comment || "",
      product_id: params.slug,
      customer_id: String(body.customer_id),
      customer: {
        name: body.customer_name || "Anonymous",
        email: body.customer_email || "",
        image_url: body.customer_image || ""
      },
      created_at: new Date().toISOString()
    };
    
    mockReviews.push(newReview);
    
    // Get pagination parameters from URL to return consistent response format
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');
    const sort = url.searchParams.get('sort') || 'newest';
    
    // Filter and sort reviews for this product
    let productReviews = mockReviews.filter(
      (review) => review.product_id === params.slug
    );
    
    // Apply sorting
    if (sort === 'newest') {
      productReviews = productReviews.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sort === 'highest') {
      productReviews = productReviews.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      productReviews = productReviews.sort((a, b) => a.rating - b.rating);
    }
    
    const totalCount = productReviews.length;
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = productReviews.slice(startIndex, endIndex);
    
    return NextResponse.json({
      review: newReview,
      reviews: paginatedReviews,
      totalCount: totalCount,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalCount / limit)
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
