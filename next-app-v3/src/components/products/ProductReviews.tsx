"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/lib/auth/AuthContext";
import { toast } from "react-hot-toast";

interface Review {
  review_id: number;
  rating: number;
  comment: string;
  product_id: number;
  customer_id: number;
  created_at?: string;
  customer?: {
    email: string;
    name?: string;
  };
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user, token } = useAuth();
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/reviews`);
      const productReviews = response.data.filter(
        (r: any) => r.product_id === parseInt(productId)
      );
      setReviews(productReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to add a review");
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error("Please add a comment");
      return;
    }

    setSubmitting(true);
    try {
      const reviewData = {
        product_id: parseInt(productId),
        customer_id: parseInt(user.id),
        rating: newReview.rating,
        comment: newReview.comment.trim()
      };

      // Include authentication headers
      const headers: any = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      await axios.post("http://localhost:5000/api/reviews", reviewData, { headers });
      
      // Reset form
      setNewReview({ rating: 5, comment: "" });
      setShowAddReview(false);
      
      // Refresh reviews
      await fetchReviews();
      
      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Please login to add a review");
      } else {
        toast.error("Error adding review. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((total / reviews.length).toFixed(1));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const StarRating = ({ rating, size = "w-5 h-5", interactive = false, onRatingChange }: {
    rating: number;
    size?: string;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${size} ${
              star <= rating ? "text-amber-500" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-amber-400" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={() => interactive && onRatingChange?.(star)}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const RatingBar = ({ rating, count, total }: { rating: number; count: number; total: number }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700 w-8">
          {rating}★
        </span>
        <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
          <div 
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 w-8">{count}</span>
      </div>
    );
  };

  const distribution = getRatingDistribution();

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        {user && (
          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
          >
            Write a Review
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Reviews Summary */}
        {reviews.length > 0 && (
          <div className="p-6 border-b border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  {getAverageRating()}
                </div>
                <StarRating rating={getAverageRating()} size="w-6 h-6" />
                <p className="text-gray-600 mt-2">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <RatingBar
                    key={rating}
                    rating={rating}
                    count={distribution[rating as keyof typeof distribution]}
                    total={reviews.length}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Review Form */}
        {showAddReview && (
          <div className="p-6 border-b border-gray-100 bg-amber-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Write a Review for {productName}
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <StarRating
                  rating={newReview.rating}
                  size="w-8 h-8"
                  interactive
                  onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  className="w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your experience with this product!</p>
              {user && !showAddReview && (
                <button
                  onClick={() => setShowAddReview(true)}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
                >
                  Write the First Review
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.review_id}
                  className="border-b border-gray-100 pb-6 last:border-0 transition-all duration-200 hover:bg-gray-50 rounded-lg p-4 -m-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-amber-100 flex-shrink-0">
                      <Image
                        src="/images/artisans/profile.jpg"
                        alt="Customer profile"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-full"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {review.customer?.name || 
                             (review.customer?.email ? review.customer.email.split('@')[0] : `Customer #${review.customer_id}`)}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(review.created_at)}
                          </p>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
