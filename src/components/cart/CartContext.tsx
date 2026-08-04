"use client";
 

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  rawPrice: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  wishlistItems: any[];
  toggleWishlist: (product: any) => void;
  clearCart: () => void;
  updateQuantity: (id: string, delta: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
     
    setMounted(true);
    const savedWishlist = localStorage.getItem("decornish_wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("decornish_wishlist", JSON.stringify(wishlistItems));
      // Clean up legacy cart persistence if it exists
      localStorage.removeItem("decornish_cart");
    }
  }, [wishlistItems, mounted]);

  const addToCart = (product: any) => {
    // If the product comes from the storefront, it has `images` array.
    // If it's already a CartItem being re-added, it has `image`.
    const itemImage = product.image || (product.images && product.images[0]) || "";
    const qtyToAdd = product.quantity && product.quantity > 0 ? product.quantity : 1;
    
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item
        );
      }
      return [...prev, { ...product, image: itemImage, quantity: qtyToAdd }];
    });
    // Optional: open the cart when adding an item
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product: any) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("decornish_cart");
    }
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount, isCartOpen, setIsCartOpen, wishlistItems, toggleWishlist, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
