"use client";
 

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

export function AddToCartActions({ product, selectedVariant }: { product: any, selectedVariant?: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  const handleAdd = () => {
    // If a variant is selected, create a custom payload merging product and variant details
    const cartItem = selectedVariant ? {
      ...product,
      id: `${product.id}-${selectedVariant.id}`, // Unique ID for cart matching
      name: `${product.name} - ${selectedVariant.name}`,
      rawPrice: Number(selectedVariant.price_adjustment),
      price: `Rs. ${Number(selectedVariant.price_adjustment).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      image: selectedVariant.image_url,
      variant: selectedVariant
    } : product;

    addToCart({ ...cartItem, quantity });
  };

  if (!product.inStock) {
    return (
      <div className="flex items-center gap-4 mb-8">
        <button 
          disabled
          className="flex-1 h-12 bg-brand-text/50 text-white font-button font-medium text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed uppercase tracking-wider sm:tracking-widest whitespace-nowrap"
        >
          Out of Stock
        </button>
        <button 
          onClick={() => toggleWishlist(product)}
          className="h-12 w-12 flex items-center justify-center border border-brand-border text-brand-text hover:text-brand-gold transition-colors shrink-0"
          aria-label="Toggle Wishlist"
        >
          <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
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
        className="flex-1 h-12 bg-brand-text text-white font-button font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-brand-gold transition-colors uppercase tracking-wider sm:tracking-widest whitespace-nowrap px-2"
      >
        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> 
        <span>Add to Cart</span>
      </button>
      <button 
        onClick={() => toggleWishlist(product)}
        className="h-12 w-12 flex items-center justify-center border border-brand-border text-brand-text hover:text-brand-gold transition-colors shrink-0"
        aria-label="Toggle Wishlist"
      >
        <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
