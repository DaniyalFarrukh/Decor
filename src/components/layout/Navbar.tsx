"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsCartOpen, wishlistItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6 md:px-12",
        scrolled
          ? "py-4 bg-background/80 backdrop-blur-md border-b border-brand-border/50 shadow-sm"
          : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Navigation - Left (Empty for now) */}
        <nav className="hidden lg:flex items-center gap-8"></nav>

        {/* Logo - Center */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 transition-transform duration-500",
          scrolled ? "scale-90" : "scale-100"
        )}>
          <Link href="/">
            <h1 className="font-heading text-3xl md:text-4xl tracking-tight uppercase">
              Decornish
            </h1>
          </Link>
        </div>

        {/* Icons - Right */}
        <div className="flex items-center gap-6">
          <button className="hover:text-brand-gold transition-colors" aria-label="Search">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <Link href="/wishlist" className="hover:text-brand-gold transition-colors relative" aria-label="Wishlist">
            <Heart className="w-5 h-5" strokeWidth={1.5} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <button 
            className="hover:text-brand-gold transition-colors relative" 
            aria-label="Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-text text-brand-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
