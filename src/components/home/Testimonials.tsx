 
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    text: "Decornish completely transformed our living space. The quality of the furniture and the attention to detail in their decor pieces are unparalleled.",
    author: "Sarah Jenkins",
    role: "Interior Designer",
  },
  {
    id: 2,
    text: "An exquisite collection that perfectly balances modern minimalism with warm, inviting textures. My go-to for luxury home styling.",
    author: "Michael Chen",
    role: "Architect",
  },
  {
    id: 3,
    text: "The buying experience was as premium as the products themselves. The white-glove delivery service ensured everything arrived perfectly.",
    author: "Elena Rodriguez",
    role: "Homeowner",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 md:py-32 bg-brand-primary px-6 md:px-12 border-t border-brand-border/50">
      <div className="max-w-4xl mx-auto text-center relative">
        <Quote className="w-12 h-12 md:w-16 md:h-16 text-brand-gold/20 mx-auto mb-8" />
        
        <div className="h-[200px] md:h-[160px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-brand-text leading-relaxed mb-8">
                "{TESTIMONIALS[currentIndex].text}"
              </p>
              <div>
                <p className="font-sans font-semibold text-brand-text mb-1">
                  {TESTIMONIALS[currentIndex].author}
                </p>
                <p className="font-sans text-sm text-brand-text/50 uppercase tracking-widest">
                  {TESTIMONIALS[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button 
            onClick={prev}
            className="w-12 h-12 flex items-center justify-center border border-brand-border rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-brand-gold w-6" : "bg-brand-border"
                }`}
              />
            ))}
          </div>
          <button 
            onClick={next}
            className="w-12 h-12 flex items-center justify-center border border-brand-border rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
