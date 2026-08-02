"use client";
 

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export function RoomInspiration({ products = [] }: { products?: any[] }) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = products.slice(0, 3).map((p, index) => ({
    id: index + 1,
    x: index === 0 ? 45 : index === 1 ? 75 : 30,
    y: index === 0 ? 65 : index === 1 ? 55 : 40,
    product: p,
  }));

  if (hotspots.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-brand-secondary px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-brand-text mb-6">
            Shop the Look
          </h2>
          <p className="font-sans text-brand-text/70 max-w-2xl mx-auto text-lg">
            Curated spaces designed to inspire. Explore the pieces that make this room complete.
          </p>
        </div>

        <div className="relative aspect-[4/3] md:aspect-[21/9] w-full max-w-7xl mx-auto overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=2000"
            alt="Room Inspiration"
            fill
            className="object-cover"
            sizes="100vw"
          />
          
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="absolute z-10"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <button
                onClick={() => setActiveHotspot(hotspot.id)}
                className="relative group flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                <div className="relative bg-white rounded-full p-1.5 shadow-lg group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4 text-brand-text" />
                </div>
              </button>

              <AnimatePresence>
                {activeHotspot === hotspot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white p-4 w-64 shadow-2xl z-20"
                  >
                    <button 
                      onClick={() => setActiveHotspot(null)}
                      className="absolute top-2 right-2 text-brand-text/50 hover:text-brand-text"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="relative w-full aspect-square mb-4 bg-brand-secondary">
                      <Image
                        src={hotspot.product.image}
                        alt={hotspot.product.name}
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-heading text-lg text-brand-text mb-1">
                      {hotspot.product.name}
                    </h4>
                    <p className="font-sans text-brand-text/70 text-sm mb-4">
                      {hotspot.product.price}
                    </p>
                    <button className="w-full py-2 bg-brand-text text-white font-button text-sm hover:bg-brand-gold transition-colors">
                      View Details
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
