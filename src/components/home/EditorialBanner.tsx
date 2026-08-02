"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EditorialBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (imageRef.current && containerRef.current && textRef.current) {
      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal on scroll
      gsap.fromTo(
        textRef.current.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-brand-text"
    >
      <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          ref={imageRef}
          src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=2000"
          alt="Editorial Room"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-text/30" />
      </div>

      <div 
        ref={textRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-semibold mb-6">
          The Philosophy
        </span>
        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-8">
          Form Meets <br className="hidden md:block" /> Function.
        </h2>
        <p className="font-sans text-white/80 max-w-xl text-lg md:text-xl leading-relaxed">
          Every piece tells a story of craftsmanship, designed not just to fill a space, but to elevate your daily life.
        </p>
      </div>
    </section>
  );
}
