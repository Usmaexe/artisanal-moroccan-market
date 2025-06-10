import { getProducts as fetchProducts, getProductBySlug, getFeaturedProducts, getProductsByCategory, getProductById } from '@/data/products';
import { Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  // In a real application, this would be an API call
  // For now, we're using the local data
  return fetchProducts();
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
  // In a real application, this would be an API call
  // For now, find product by ID
  return getProductById(id);
};

export const getProductBySlugAsync = async (slug: string): Promise<Product | undefined> => {
  // In a real application, this would be an API call
  return getProductBySlug(slug);
};

export const getFeatured = async (): Promise<Product[]> => {
  // In a real application, this would be an API call
  return getFeaturedProducts();
};

export const getByCategory = async (categorySlug: string): Promise<Product[]> => {
  // In a real application, this would be an API call
  return getProductsByCategory(categorySlug);
}; 