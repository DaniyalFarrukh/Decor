"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, Check, X, Trash2 } from "lucide-react";

interface Review {
  id: string;
  author: string;
  product: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}


export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const saveReviews = async (updatedReviews: Review[]) => {
    try {
      await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedReviews)
      });
    } catch (error) {
      console.error("Failed to save reviews", error);
    }
  };

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    const updated = reviews.map(r => 
      r.id === id ? { ...r, status } : r
    );
    setReviews(updated);
    saveReviews(updated);
  };

  const handleDelete = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    saveReviews(updated);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? "text-[#B08D57] fill-[#B08D57]" : "text-[#333333]"}`} 
      />
    ));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white mb-2">Reviews</h1>
        <p className="text-[#a3a3a3] font-sans">Moderate customer testimonials and product reviews.</p>
      </div>

      <Card className="bg-[#1a1a1a] border-[#333333]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#B08D57]" />
            Review Moderation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-[#a3a3a3] py-8">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-[#a3a3a3]">
              <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
              <p>No reviews found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-md border border-[#333333] bg-[#111111]">
                  
                  {/* Review Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{review.author}</h3>
                        <p className="text-xs text-[#B08D57] mt-0.5">Purchased: {review.product}</p>
                      </div>
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-[#a3a3a3] text-sm italic">
                      "{review.comment}"
                    </p>
                    <p className="text-xs text-[#666666]">
                      Submitted on {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-3 justify-center md:border-l border-[#333333] md:pl-6 md:min-w-[150px]">
                    {review.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(review.id, "approved")}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#3E7D59]/10 text-[#3E7D59] border border-[#3E7D59]/20 hover:bg-[#3E7D59]/20 rounded-md text-sm font-medium transition-colors"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                        <button
                          onClick={() => updateStatus(review.id, "rejected")}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 rounded-md text-sm font-medium transition-colors"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </>
                    )}
                    
                    {review.status === "approved" && (
                      <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#3E7D59]/10 text-[#3E7D59] border border-[#3E7D59]/20 rounded-md text-sm font-medium">
                        <Check className="w-4 h-4" /> Approved
                      </div>
                    )}
                    
                    {review.status === "rejected" && (
                      <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-sm font-medium">
                        <X className="w-4 h-4" /> Rejected
                      </div>
                    )}

                    <button
                      onClick={() => handleDelete(review.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-[#a3a3a3] hover:text-red-500 transition-colors rounded-md text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
