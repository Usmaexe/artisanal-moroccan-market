// Cart utilities for managing cart state

// Define cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
  // Add more properties as needed (size, color, etc.)
}

// Load cart from localStorage
export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
}

// Save cart to localStorage
export function saveCartItems(items: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

// Add item to cart
export function addToCart(product: any, quantity = 1): void {
  const cartItems = getCartItems();
  
  // Check if product is already in cart
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already exists
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.isOnSale ? (product.salePrice || product.price) : product.price,
      image: product.images[0],
      slug: product.slug,
      quantity
    });
  }
  
  saveCartItems(cartItems);
}

// Remove item from cart
export function removeFromCart(productId: string): void {
  const cartItems = getCartItems().filter(item => item.id !== productId);
  saveCartItems(cartItems);
}

// Update item quantity
export function updateCartItemQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.id === productId);
  
  if (itemIndex >= 0) {
    cartItems[itemIndex].quantity = quantity;
    saveCartItems(cartItems);
  }
}

// Clear cart
export function clearCart(): void {
  saveCartItems([]);
}

// Get cart total
export function getCartTotal(): number {
  return getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
export function getCartItemCount(): number {
  return getCartItems().reduce((count, item) => count + item.quantity, 0);
}