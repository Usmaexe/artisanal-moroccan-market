export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  categoryId: string;
  features: string[];
  dimensions?: string;
  materials: string[];
  inStock: boolean;
  artisan: Artisan;
  artisanId: string;
  isFeatured: boolean;
  isOnSale: boolean;
  salePrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Artisan {
  id: string;
  name: string;
  slug: string;
  image: string;
  bio: string;
  location: string;
  specialty: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  address?: Address;
  orders?: Order[];
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentId?: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number; // Price at the time of purchase
}

export type OrderStatus = 
  | "pending" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled"; 