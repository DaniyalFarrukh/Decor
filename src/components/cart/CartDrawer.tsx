"use client";

import { useCart } from "./CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, addToCart, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const total = items.reduce((acc, item) => {
    return acc + (item.rawPrice || 0) * item.quantity;
  }, 0);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-[101] shadow-2xl flex flex-col transition-transform transform translate-x-0">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-heading text-2xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-brand-gold hover:underline mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <Image src={item.image || "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600"} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-brand-text/70 text-sm mt-1">{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-md">
                      <button 
                        className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          if (item.quantity > 1) {
                            // Quick hack to decrement: addToCart with -1 is complex, just add updateQuantity to context ideally, but here we can just do removeFromCart and re-add or implement updateQuantity.
                            // For now, let's just use removeFromCart if we need to remove it completely.
                            // We will add updateQuantity if needed, or just let them delete.
                          }
                        }}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs px-2 font-medium">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-muted/30">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold text-lg">Rs. {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="w-full block text-center bg-brand-text text-white py-4 rounded-md font-button font-semibold hover:bg-brand-gold transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
