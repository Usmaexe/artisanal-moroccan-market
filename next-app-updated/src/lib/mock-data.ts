// Mock reviews data for frontend development

export interface MockReview {
  review_id: number;
  rating: number;
  comment: string;
  product_id: string;
  customer_id: string;
  customer: {
    name: string;
    email: string;
    image_url?: string;
  };
  created_at: string;
}

export const mockReviews: MockReview[] = [
  {
    review_id: 1,
    rating: 5,
    comment: "This bowl is absolutely stunning! The craftsmanship is exceptional and the colors are vibrant. It has become the centerpiece of my dining table. Highly recommend!",
    product_id: "hand-painted-ceramic-bowl",
    customer_id: "1",
    customer: {
      name: "Customer Demo",
      email: "customer@example.com",
      image_url: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56"
    },
    created_at: "2025-05-15T10:30:00Z"
  },
  {
    review_id: 2,
    rating: 4,
    comment: "Beautiful piece! The only reason I'm giving 4 stars instead of 5 is because the bowl was slightly smaller than I expected. Otherwise, it's perfect!",
    product_id: "hand-painted-ceramic-bowl",
    customer_id: "2",
    customer: {
      name: "Artisan Demo",
      email: "artisan@example.com",
      image_url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857"
    },
    created_at: "2025-05-10T14:20:00Z"
  },
  {
    review_id: 3,
    rating: 5,
    comment: "The quality of this carpet is outstanding. The colors are rich and the craftsmanship is impeccable. It looks even better in person than in the photos!",
    product_id: "handwoven-berber-carpet",
    customer_id: "1",
    customer: {
      name: "Customer Demo",
      email: "customer@example.com",
      image_url: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56"
    },
    created_at: "2025-04-28T09:15:00Z"
  },
  {
    review_id: 4,
    rating: 5,
    comment: "I'm absolutely in love with this leather pouf! The quality is exceptional and it's exactly what I was looking for. The shipping was fast and it arrived in perfect condition.",
    product_id: "moroccan-leather-pouf",
    customer_id: "3",
    customer: {
      name: "Admin Demo",
      email: "admin@example.com",
      image_url: "https://images.unsplash.com/photo-1608137050689-b08b643ea4f4"
    },
    created_at: "2025-05-05T16:40:00Z"
  },
  {
    review_id: 5,
    rating: 3,
    comment: "The lantern is beautiful, but I had some issues with the electrical components. Customer service was helpful in resolving the issue though.",
    product_id: "moroccan-brass-lantern",
    customer_id: "1",
    customer: {
      name: "Customer Demo",
      email: "customer@example.com",
      image_url: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56"
    },
    created_at: "2025-05-20T11:25:00Z"
  }
];
