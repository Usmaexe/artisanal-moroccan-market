import { NextResponse, NextRequest } from "next/server";
import { withAuth } from "@/lib/api/withAuth";

// Import the shared mock reviews
import { mockReviews } from "../../../../lib/mock-data";

// GET a specific review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = parseInt(params.id);
    
    if (isNaN(reviewId)) {
      return NextResponse.json(
        { error: "Invalid review ID" },
        { status: 400 }
      );
    }
    
    const review = mockReviews.find((r) => r.review_id === reviewId);
    
    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

// UPDATE a review
export const PUT = withAuth(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const reviewId = parseInt(params.id);
    
    if (isNaN(reviewId)) {
      return NextResponse.json(
        { error: "Invalid review ID" },
        { status: 400 }
      );
    }
    
    const reviewIndex = mockReviews.findIndex((r) => r.review_id === reviewId);
    
    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.rating) {
      return NextResponse.json(
        { error: "Rating is required" },
        { status: 400 }
      );
    }
    
    // Update the review
    const existingReview = mockReviews[reviewIndex];
    const updatedReview = {
      ...existingReview,
      rating: body.rating,
      comment: body.comment || existingReview.comment,
      // In a real app, you might add updated_at here
    };
    
    // Replace the review in our mock data
    mockReviews[reviewIndex] = updatedReview;
      return NextResponse.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
});

// DELETE a review
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = parseInt(params.id);
    
    if (isNaN(reviewId)) {
      return NextResponse.json(
        { error: "Invalid review ID" },
        { status: 400 }
      );
    }
    
    const reviewIndex = mockReviews.findIndex((r) => r.review_id === reviewId);
    
    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }
    
    // Remove the review from our mock data
    mockReviews.splice(reviewIndex, 1);
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
