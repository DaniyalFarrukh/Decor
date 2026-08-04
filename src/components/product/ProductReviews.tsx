"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment || !rating) return;
    
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author,
          rating,
          comment,
          product_id: productId,
          product_name: productName
        })
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setAuthor("");
        setComment("");
        setRating(5);
      } else {
        const data = await res.json();
        setSubmitError(data.error || "Failed to submit review");
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (count: number, interactive = false) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        onClick={() => interactive && setRating(i + 1)}
        className={`w-5 h-5 ${interactive ? "cursor-pointer transition-colors" : ""} ${i < count ? "text-[#B08D57] fill-[#B08D57]" : "text-[#d4d4d4]"}`} 
      />
    ));
  };

  return (
    <div className="mt-24 max-w-[800px] mx-auto w-full">
      <div className="border-t border-brand-border pt-16">
        <h2 className="font-heading text-3xl text-brand-text mb-12 text-center">Customer Reviews</h2>
        
        {/* Reviews List */}
        <div className="space-y-8 mb-16">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-md border border-brand-border/50">
              <MessageSquare className="w-12 h-12 text-brand-border mx-auto mb-4" />
              <p className="text-brand-text/70 font-sans">No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-md border border-brand-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-sans font-semibold text-brand-text">{review.author}</h4>
                    <span className="text-xs text-brand-text/50">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-brand-text/80 font-sans italic text-sm leading-relaxed">"{review.comment}"</p>
              </div>
            ))
          )}
        </div>

        {/* Write a Review Form */}
        <div className="bg-[#f9f9f9] p-8 rounded-md border border-brand-border/30">
          <h3 className="font-heading text-2xl text-brand-text mb-6">Write a Review</h3>
          
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-[#3E7D59] mb-4" />
              <h4 className="font-sans text-xl font-medium text-brand-text mb-2">Review Submitted!</h4>
              <p className="text-brand-text/70">Thank you for your feedback. Your review is currently pending approval and will appear shortly.</p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="mt-6 text-brand-gold hover:underline text-sm font-medium"
              >
                Write another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-text/80 block">Your Rating</label>
                <div className="flex gap-2">
                  {renderStars(rating, true)}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="author" className="text-sm font-medium text-brand-text/80 block">Your Name</label>
                <input
                  id="author"
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-brand-border/50 rounded-md px-4 py-3 outline-none focus:border-brand-gold transition-colors font-sans bg-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium text-brand-text/80 block">Your Review</label>
                <textarea
                  id="comment"
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  className="w-full border border-brand-border/50 rounded-md px-4 py-3 outline-none focus:border-brand-gold transition-colors font-sans bg-white resize-y"
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-sm font-medium">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !author || !comment}
                className="w-full bg-brand-text text-white py-4 rounded-md font-button font-medium hover:bg-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
