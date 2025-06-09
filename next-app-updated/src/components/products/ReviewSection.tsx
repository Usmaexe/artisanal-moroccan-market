"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { StarRating } from "@/components/ui/StarRating";

// Types for reviews
export interface Review {
  review_id: number;
  rating: number;
  comment: string;
  product_id: number;
  customer_id: number;
  customer: {
    name: string;
    email: string;
    image_url?: string;
  };
  created_at: string;
}

interface ReviewSectionProps {
  productId: number;
  productSlug: string;
}

export default function ReviewSection({ productId, productSlug }: ReviewSectionProps) {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [userReview, setUserReview] = useState<Review | null>(null);
  
  // New review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewsPerPage] = useState(5);
  
  // Sorting state
  const [sortOption, setSortOption] = useState<'newest' | 'highest' | 'lowest'>('newest');
  
  // Fetch reviews for this product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // In a real app, this would include pagination params
        const response = await fetch(
          `/api/products/${productSlug}/reviews?page=${currentPage}&limit=${reviewsPerPage}&sort=${sortOption}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        
        const data = await response.json();
        
        // If the API returns paginated data with count
        if (data.reviews && data.totalCount !== undefined) {
          setReviews(data.reviews);
          setTotalReviews(data.totalCount);
        } else {
          // For mock data compatibility
          setReviews(data);
          setTotalReviews(data.length);
        }
        
        // Calculate average rating
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          const reviewsData = data.reviews;
          const avgRating = reviewsData.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviewsData.length;
          setAverageRating(parseFloat(avgRating.toFixed(1)));
        } else if (Array.isArray(data) && data.length > 0) {
          const avgRating = data.reduce((sum: number, review: Review) => sum + review.rating, 0) / data.length;
          setAverageRating(parseFloat(avgRating.toFixed(1)));
        } else {
          setAverageRating(null);
        }
        
        // Check if user has already reviewed this product
        if (isAuthenticated && user) {
          const reviewsToCheck = Array.isArray(data.reviews) ? data.reviews : data;
          const existingReview = reviewsToCheck.find((review: Review) => review.customer_id === Number(user.id));
          if (existingReview) {
            setUserReview(existingReview);
            setRating(existingReview.rating);
            setComment(existingReview.comment || "");
          }
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [productSlug, isAuthenticated, user, currentPage, reviewsPerPage, sortOption]);
  
  // Handle review submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please log in to leave a review");
      return;
    }
    
    try {
      setSubmitting(true);
      
      const reviewData = {
        rating,
        comment,
        product_id: productId,
        customer_id: user?.id,
        customer_name: user?.name,
        customer_email: user?.email,
        customer_image: user?.image
      };
      
      // If user already has a review, update it
      if (userReview) {
        const response = await fetch(`/api/reviews/${userReview.review_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('auth_token') || ''}`
          },
          body: JSON.stringify(reviewData)
        });
        
        if (!response.ok) {
          throw new Error("Failed to update review");
        }
        
        toast.success("Your review has been updated!");
      } else {
        // Create a new review
        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('auth_token') || ''}`
          },
          body: JSON.stringify(reviewData)
        });
        
        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
        
        toast.success("Thank you for your review!");
      }
      
      // Refresh reviews
      const refreshResponse = await fetch(
        `/api/products/${productSlug}/reviews?page=${currentPage}&limit=${reviewsPerPage}&sort=${sortOption}`
      );
      
      const refreshedData = await refreshResponse.json();
      
      // Handle both paginated and non-paginated responses
      if (refreshedData.reviews) {
        setReviews(refreshedData.reviews);
        setTotalReviews(refreshedData.totalCount);
      } else {
        setReviews(refreshedData);
        setTotalReviews(refreshedData.length);
      }
      
      // Calculate new average rating
      const reviewsToCalculate = refreshedData.reviews || refreshedData;
      if (reviewsToCalculate.length > 0) {
        const avgRating = reviewsToCalculate.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviewsToCalculate.length;
        setAverageRating(parseFloat(avgRating.toFixed(1)));
      }
      
      // Update user's review reference
      const updatedUserReview = reviewsToCalculate.find((review: Review) => review.customer_id === Number(user?.id));
      setUserReview(updatedUserReview || null);
      
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle review deletion
  const handleDeleteReview = async () => {
    if (!userReview) return;
    
    if (!confirm("Are you sure you want to delete your review?")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/reviews/${userReview.review_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('auth_token') || ''}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      
      toast.success("Your review has been deleted");
      setUserReview(null);
      setRating(5);
      setComment("");
      
      // Refresh reviews
      const refreshResponse = await fetch(
        `/api/products/${productSlug}/reviews?page=${currentPage}&limit=${reviewsPerPage}&sort=${sortOption}`
      );
      
      const refreshedData = await refreshResponse.json();
      
      // Handle both paginated and non-paginated responses
      if (refreshedData.reviews) {
        setReviews(refreshedData.reviews);
        setTotalReviews(refreshedData.totalCount);
      } else {
        setReviews(refreshedData);
        setTotalReviews(refreshedData.length);
      }
      
      // Recalculate average rating
      const reviewsToCalculate = refreshedData.reviews || refreshedData;
      if (reviewsToCalculate.length > 0) {
        const avgRating = reviewsToCalculate.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviewsToCalculate.length;
        setAverageRating(parseFloat(avgRating.toFixed(1)));
      } else {
        setAverageRating(null);
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review. Please try again.");
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle sort change
  const handleSortChange = (option: 'newest' | 'highest' | 'lowest') => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when sorting changes
  };
  
  // Render star rating input
  const renderStarInput = () => {
    return (
      <div className="flex items-center mb-4">
        <StarRating 
          rating={rating} 
          size={32} 
          interactive={true} 
          onChange={setRating}
        />
        <span className="ml-2 text-gray-700">{rating} out of 5 stars</span>
      </div>
    );
  };
  
  // Render stars for a given rating
  const renderStars = (rating: number) => {
    return <StarRating rating={rating} size={16} />;
  };
  
  // Render pagination controls
  const renderPagination = () => {
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex items-center justify-center mt-8">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
              currentPage === 1
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 border ${
                currentPage === i + 1
                  ? 'bg-amber-600 text-white border-amber-600 z-10'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
              currentPage === totalPages
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="bg-white rounded-lg shadow-md p-6 flex justify-center">
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      {/* Overall Rating Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-2 text-amber-600">Overall Rating</h3>
              {averageRating ? (
                <>
                  <div className="flex items-center justify-center md:justify-start">
                    {renderStars(averageRating)}
                    <span className="ml-2 text-2xl font-bold text-amber-600">{averageRating}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
                </>
              ) : (
                <p className="text-gray-600">No reviews yet</p>
              )}
            </div>
          </div>
          
          {/* Rating Breakdown - can be expanded in future */}
          <div className="w-full md:w-1/2 lg:w-2/3">
            {/* Future enhancement: Show breakdown of 5-star, 4-star, etc. */}
          </div>
        </div>
      </div>
      
      {/* Review Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-amber-600">
          {userReview ? "Update Your Review" : "Write a Review"}
        </h3>
        
        {isAuthenticated ? (
          <form onSubmit={handleSubmitReview}>
            {renderStarInput()}
            
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 text-amber-900 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={4}
                placeholder="Share your experience with this product..."
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition disabled:opacity-50"
              >
                {submitting ? "Submitting..." : userReview ? "Update Review" : "Submit Review"}
              </button>
              
              {userReview && (
                <button
                  type="button"
                  onClick={handleDeleteReview}
                  className="border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition"
                >
                  Delete Review
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="p-4 bg-amber-50 rounded-md">
            <p className="text-amber-800">
              Please <a href="/auth/login" className="text-amber-600 font-semibold underline">log in</a> to leave a review.
            </p>
          </div>
        )}
      </div>
      
      {/* Sort Options */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 text-amber-600">Sort reviews by:</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => handleSortChange('newest')}
              className={`text-sm ${sortOption === 'newest' ? 'text-amber-600 font-medium' : 'text-gray-500 hover:text-amber-600'}`}
            >
              Newest
            </button>
            <button
              onClick={() => handleSortChange('highest')}
              className={`text-sm ${sortOption === 'highest' ? 'text-amber-600 font-medium' : 'text-gray-500 hover:text-amber-600'}`}
            >
              Highest Rating
            </button>
            <button
              onClick={() => handleSortChange('lowest')}
              className={`text-sm ${sortOption === 'lowest' ? 'text-amber-600 font-medium' : 'text-gray-500 hover:text-amber-600'}`}
            >
              Lowest Rating
            </button>
          </div>
        </div>
      </div>
      
      {/* Review List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-amber-600">
          {totalReviews > 0 ? 'All Reviews' : 'Be the first to review this product'}
        </h3>
        
        {totalReviews > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.review_id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
                      {review.customer.image_url ? (
                        <Image
                          src={review.customer.image_url}
                          alt={review.customer.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-amber-800 font-medium">
                          {review.customer.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-gray-900">{review.customer.name}</h4>
                    
                    {review.comment && (
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    )}
                    
                    {/* If the review belongs to the current user, show edit option */}
                    {isAuthenticated && user && Number(user.id) === review.customer_id && (
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            setRating(review.rating);
                            setComment(review.comment || "");
                            // Scroll to review form
                            document.getElementById("comment")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-sm text-amber-600 hover:text-amber-800"
                        >
                          Edit your review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Pagination */}
            {renderPagination()}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet for this product.</p>
        )}
      </div>
    </div>
  );
}
