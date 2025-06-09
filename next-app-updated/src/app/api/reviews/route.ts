import { NextResponse, NextRequest } from "next/server";
import { getProductBySlug } from "@/data/products";
import { withAuth } from "@/lib/api/withAuth";

// Access the same mock reviews data we defined in the product-specific route
// In a real app, this would be a database call
import { mockReviews } from "../../../lib/mock-data";

// POST a new review
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.rating || !body.product_id || !body.customer_id) {
      return NextResponse.json(
        { error: "Rating, product ID, and customer ID are required" },
        { status: 400 }
      );
    }
    
    // Validate product exists
    const product = getProductBySlug(body.product_id);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Check if user has already reviewed this product
    const existingReview = mockReviews.find(
      (review) => 
        review.product_id === body.product_id && 
        review.customer_id === body.customer_id
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
      product_id: body.product_id,
      customer_id: body.customer_id,
      customer: {
        name: body.customer_name || "Anonymous",
        email: body.customer_email || "",
        image_url: body.customer_image || ""
      },
      created_at: new Date().toISOString()
    };
    
    mockReviews.push(newReview);
      return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
});

// GET all reviews (for admin purposes)
export async function GET() {
  try {
    return NextResponse.json(mockReviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
