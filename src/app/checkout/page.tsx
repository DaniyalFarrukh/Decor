"use client";

import { useCart } from "@/components/cart/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { processCheckout } from "@/lib/actions/checkout";

export default function CheckoutPage() {
  const { items, setIsCartOpen } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const total = items.reduce((acc, item) => {
    return acc + (item.rawPrice || 0) * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const result = await processCheckout(formData, items, total);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSubmitted(true);
      // Optional: Clear cart in context here if desired
    } else {
      setError(result.error || "Something went wrong.");
    }
  };

  if (isSubmitted) {
    return (
      <main className="flex min-h-screen flex-col bg-brand-primary">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center">
          <CheckCircle2 className="w-20 h-20 text-brand-gold mb-6" />
          <h1 className="font-heading text-4xl text-brand-text mb-4">Order Confirmed!</h1>
          <p className="text-brand-text/70 max-w-md mb-8">
            Thank you for shopping with Decornish. Your luxury pieces are being prepared for dispatch.
          </p>
          <Link 
            href="/" 
            className="bg-brand-text text-white px-8 py-3 rounded-md font-button hover:bg-brand-gold transition-colors"
          >
            Return Home
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-brand-primary">
      <Navbar />
      <div className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <h1 className="font-heading text-4xl text-brand-text mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div className="bg-white p-6 rounded-md shadow-sm border">
                <h2 className="font-sans font-semibold text-lg mb-4 border-b pb-2">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Email</label>
                    <input required name="email" type="email" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-brand-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">First Name</label>
                      <input required name="firstName" type="text" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-brand-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Last Name</label>
                      <input required name="lastName" type="text" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-brand-gold" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white p-6 rounded-md shadow-sm border">
                <h2 className="font-sans font-semibold text-lg mb-4 border-b pb-2">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Address</label>
                    <input required name="address" type="text" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-brand-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">City</label>
                      <input required name="city" type="text" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-brand-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Postal Code</label>
                      <input required name="postalCode" type="text" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-brand-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Phone</label>
                    <input required name="phone" type="tel" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-brand-gold" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-brand-text text-white py-4 rounded-md font-button font-semibold text-lg hover:bg-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order - Rs. ${total.toLocaleString()}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-md shadow-sm border sticky top-32">
              <h2 className="font-sans font-semibold text-lg mb-6 border-b pb-2">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image src={item.image || "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600"} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <span className="absolute -top-2 -right-2 bg-brand-text text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium border-2 border-white z-10">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-brand-text/70 text-xs mt-1">{item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 text-sm border-t pt-4 border-dashed">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
