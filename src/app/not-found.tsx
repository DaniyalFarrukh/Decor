import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-primary">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-32 text-center">
        <span className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6 block">
          404 Error
        </span>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-brand-text leading-none tracking-tight mb-8">
          Page Not Found.
        </h1>
        <p className="font-sans text-brand-text/70 max-w-md mx-auto text-lg leading-relaxed mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          href="/"
          className="group relative flex items-center justify-center gap-3 bg-brand-text text-white px-8 py-4 rounded-full font-button font-medium overflow-hidden transition-transform hover:scale-105 mx-auto"
        >
          <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform" />
          <span className="relative z-10">Return to Homepage</span>
        </Link>
      </div>
      
      <Footer />
    </main>
  );
}
