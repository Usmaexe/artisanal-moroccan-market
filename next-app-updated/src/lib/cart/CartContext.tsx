'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, getCartItems, saveCartItems, getCartTotal, getCartItemCount } from '@/lib/cart';

interface CartContextType {
  items: CartItem[];
  addItem: (product: any, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  
  // Load cart data from localStorage on initial render
  useEffect(() => {
    const cartItems = getCartItems();
    setItems(cartItems);
    setCartTotal(getCartTotal());
    setItemCount(getCartItemCount());
  }, []);
  
  const addItem = (product: any, quantity = 1) => {
    const existingItemIndex = items.findIndex(item => item.id === product.id);
    let updatedItems;
    
    if (existingItemIndex >= 0) {
      // Create a new array with the updated item
      updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.isOnSale ? (product.salePrice || product.price) : product.price,
        image: product.images[0],
        slug: product.slug,
        quantity
      };
      updatedItems = [...items, newItem];
    }
    
    setItems(updatedItems);
    saveCartItems(updatedItems);
    setCartTotal(updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    setItemCount(updatedItems.reduce((count, item) => count + item.quantity, 0));
  };
  
  const removeItem = (productId: string) => {
    const updatedItems = items.filter(item => item.id !== productId);
    setItems(updatedItems);
    saveCartItems(updatedItems);
    setCartTotal(updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    setItemCount(updatedItems.reduce((count, item) => count + item.quantity, 0));
  };
  
  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    const updatedItems = items.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    
    setItems(updatedItems);
    saveCartItems(updatedItems);
    setCartTotal(updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    setItemCount(updatedItems.reduce((count, item) => count + item.quantity, 0));
  };
  
  const clearCart = () => {
    setItems([]);
    saveCartItems([]);
    setCartTotal(0);
    setItemCount(0);
  };
  
  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateItemQuantity, 
      clearCart,
      cartTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}