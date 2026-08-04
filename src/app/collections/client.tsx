"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getStorefrontProducts } from "@/lib/actions/storefront";

export default function CollectionsPage({ categorySlug }: { categorySlug?: string } = {}) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getStorefrontProducts().then(setProducts);
  }, []);

  const displayedProducts = categorySlug 
    ? products.filter(p => p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug.toLowerCase())
    : products;

  return (
    <div className="flex min-h-screen flex-col bg-brand-primary">
      
      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        <h1 className="font-heading text-5xl md:text-6xl text-brand-text mb-6">
          {categorySlug ? categorySlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Explore Collection"}
        </h1>
        <p className="font-sans text-brand-text/70 max-w-2xl text-lg">
          Discover our curated selection of premium furniture and home decor designed to elevate your living spaces.
        </p>
      </div>
      
      {/* Filters Bar */}
      <div className="sticky top-20 z-40 bg-brand-primary/90 backdrop-blur-md border-y border-brand-border px-6 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 font-button font-medium text-sm text-brand-text hover:text-brand-gold transition-colors uppercase tracking-widest"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters {filtersOpen ? "-" : "+"}
            </button>
            <span className="text-brand-text/30">|</span>
            <span className="font-sans text-sm text-brand-text/70">{displayedProducts.length} Products</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-button font-medium uppercase tracking-widest">
              Sort By <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 border-l border-brand-border pl-6">
              <button onClick={() => setView("grid")} className={`p-2 transition-colors ${view === "grid" ? "text-brand-text" : "text-brand-text/30"}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setView("list")} className={`p-2 transition-colors ${view === "list" ? "text-brand-text" : "text-brand-text/30"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 px-6 md:px-12 max-w-[1600px] mx-auto w-full py-12 flex relative">
        
        {/* Sidebar Filters */}
        <AnimatePresence>
          {filtersOpen && (
             <motion.div 
               initial={{ width: 0, opacity: 0, marginRight: 0 }}
               animate={{ width: 280, opacity: 1, marginRight: 48 }}
               exit={{ width: 0, opacity: 0, marginRight: 0 }}
               className="hidden md:block overflow-hidden flex-shrink-0"
             >
               <div className="w-[280px] pr-8 space-y-8">
                 {/* Filter Groups */}
                 {['Category', 'Color', 'Material', 'Price Range'].map((group) => (
                   <div key={group} className="border-b border-brand-border pb-6">
                     <h3 className="font-heading text-xl mb-4 text-brand-text">{group}</h3>
                     <div className="space-y-3">
                       {[1, 2, 3].map((item) => (
                         <label key={item} className="flex items-center gap-3 cursor-pointer group/label">
                           <div className="w-4 h-4 border border-brand-border group-hover/label:border-brand-gold flex items-center justify-center transition-colors">
                             {/* Checkmark icon could go here if selected */}
                           </div>
                           <span className="font-sans text-sm text-brand-text/70 group-hover/label:text-brand-text transition-colors">
                             Option {item}
                           </span>
                         </label>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className={`w-full ${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "flex flex-col gap-8"}`}>
          {displayedProducts.length === 0 ? (
            <div className="w-full text-center py-24 text-brand-text/50 col-span-full">
              No products available in this category.
            </div>
          ) : (
            displayedProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                className={`group flex ${view === "grid" ? "flex-col" : "flex-row gap-8 items-center border border-brand-border p-4 hover:border-brand-gold transition-colors"}`}
              >
                <div className={`relative bg-brand-secondary overflow-hidden ${view === "grid" ? "aspect-[4/5] mb-4" : "aspect-square w-48 flex-shrink-0"}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className={view === "list" ? "flex-1" : ""}>
                  <p className="text-brand-text/50 text-xs uppercase tracking-widest font-semibold mb-2">
                    {product.category}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl text-brand-text group-hover:text-brand-gold transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="font-sans font-medium text-brand-text">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
