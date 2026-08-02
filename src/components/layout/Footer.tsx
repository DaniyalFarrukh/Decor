import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-text text-brand-primary pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-heading text-3xl tracking-tight uppercase mb-6">
              Decornish
            </h2>
            <p className="font-sans text-brand-primary/70 text-sm leading-relaxed mb-6 max-w-xs">
              Curating the art of living. Exclusive home decor, luxury furniture, and curated accessories for the modern home.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-6 text-white">
              Shop
            </h3>
            <ul className="space-y-4 font-sans text-brand-primary/70 text-sm">
              <li><Link href="/new" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
              <li><Link href="/furniture" className="hover:text-brand-gold transition-colors">Furniture</Link></li>
              <li><Link href="/lighting" className="hover:text-brand-gold transition-colors">Lighting</Link></li>
              <li><Link href="/decor" className="hover:text-brand-gold transition-colors">Decor & Accessories</Link></li>
              <li><Link href="/art" className="hover:text-brand-gold transition-colors">Wall Art</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-6 text-white">
              Support
            </h3>
            <ul className="space-y-4 font-sans text-brand-primary/70 text-sm">
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-brand-gold transition-colors">FAQ</Link></li>
              <li><Link href="/care" className="hover:text-brand-gold transition-colors">Product Care</Link></li>
            </ul>
          </div>

          {/* Newsletter & Location */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-6 text-white">
              Newsletter
            </h3>
            <p className="font-sans text-brand-primary/70 text-sm leading-relaxed mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex mb-10 border-b border-white/20 focus-within:border-brand-gold transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full py-2 outline-none text-sm text-white placeholder:text-white/40"
              />
              <button type="submit" className="p-2 hover:text-brand-gold transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-sans text-brand-primary/50 text-xs">
          <p>&copy; {new Date().getFullYear()} Decornish. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
