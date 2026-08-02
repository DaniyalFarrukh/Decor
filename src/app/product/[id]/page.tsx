import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { getStorefrontProduct } from "@/lib/actions/storefront";
import { AddToCartActions } from "@/components/product/AddToCartActions";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getStorefrontProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-brand-primary">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-text/70 hover:text-brand-gold transition-colors mb-8 font-sans text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Gallery Sticky */}
          <div className="relative">
            <div className="sticky top-32 flex flex-col gap-6">
              <div className="relative aspect-[4/5] bg-brand-secondary overflow-hidden">
                <Image
                  src={product.images[0] || "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=1200"}
                  alt={product.name}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                   {product.images.slice(1, 4).map((imgUrl: string, i: number) => (
                     <div key={i} className="relative aspect-square bg-brand-secondary cursor-pointer hover:opacity-80 transition-opacity">
                       <Image
                          src={imgUrl}
                          alt={`${product.name} Thumbnail ${i + 1}`}
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                     </div>
                   ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-8">
            <span className="text-brand-text/50 uppercase tracking-widest font-semibold text-xs mb-4">{product.category}</span>
            <h1 className="font-heading text-4xl md:text-5xl text-brand-text mb-4">{product.name}</h1>
            <p className="font-sans text-xl text-brand-text mb-8">{product.price}</p>
            
            <p className="font-sans text-brand-text/70 leading-relaxed mb-8">
              {product.description || "No description available for this product."}
            </p>
            
            <AddToCartActions product={product} />
            
            <div className={`flex items-center gap-2 font-sans text-sm font-medium mb-12 ${product.inStock ? "text-brand-success" : "text-red-500"}`}>
              {product.inStock ? (
                <><Check className="w-4 h-4" /> In Stock. Ready to ship.</>
              ) : (
                <>Out of Stock</>
              )}
            </div>
            
            {/* Accordion mockup */}
            <div className="border-t border-brand-border divide-y divide-brand-border">
              {['Specifications', 'Shipping & Returns', 'Care Instructions'].map((tab) => (
                <div key={tab} className="py-4 flex justify-between items-center cursor-pointer group">
                  <span className="font-heading text-lg text-brand-text group-hover:text-brand-gold transition-colors">{tab}</span>
                  <Plus className="w-4 h-4 text-brand-text/50 group-hover:text-brand-gold transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
