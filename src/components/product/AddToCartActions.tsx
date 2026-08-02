"use client";
 

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

export function AddToCartActions({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  const handleAdd = () => {
    // Add multiple items if quantity > 1
    // The cart context currently increments by 1 if existing, 
    // or adds { quantity: 1 }. We can pass quantity if we update CartContext,
    // or just call addToCart multiple times (hacky).
    // Let's just modify the cart context later if needed, but for now we'll pass quantity inside the product object.
    addToCart({ ...product, quantity });
  };

  if (!product.inStock) {
    return (
      <div className="flex items-center gap-4 mb-8">
        <button 
          disabled
          className="flex-1 h-12 bg-brand-text/50 text-white font-button font-medium flex items-center justify-center gap-2 cursor-not-allowed uppercase tracking-widest"
        >
          Out of Stock
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center border border-brand-border h-12">
        <button 
          onClick={handleDecrease}
          className="px-4 text-brand-text/50 hover:text-brand-text transition-colors h-full flex items-center"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-sans font-medium text-brand-text">{quantity}</span>
        <button 
          onClick={handleIncrease}
          className="px-4 text-brand-text/50 hover:text-brand-text transition-colors h-full flex items-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button 
        onClick={handleAdd}
        className="flex-1 h-12 bg-brand-text text-white font-button font-medium flex items-center justify-center gap-2 hover:bg-brand-gold transition-colors uppercase tracking-widest"
      >
        <ShoppingBag className="w-4 h-4" /> Add to Cart
      </button>
    </div>
  );
}
