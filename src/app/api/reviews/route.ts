import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const supabase = createAdminClient();
    const { data, error } = await supabase.storage.from("config").download("reviews.json");

    if (error) {
      return NextResponse.json([]);
    }

    const text = await data.text();
    const allReviews = JSON.parse(text);

    // Filter for approved reviews for the specific product (or all approved if no ID provided)
    const approvedReviews = allReviews.filter((r: any) => 
      r.status === "approved" && (!productId || r.product_id === productId)
    );

    return NextResponse.json(approvedReviews);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();
    const newReview = await req.json();

    // Force required fields
    if (!newReview.product_id || !newReview.author || !newReview.rating || !newReview.comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Prepare the new review object
    const reviewToSave = {
      id: Math.random().toString(36).substring(7),
      author: newReview.author,
      product: newReview.product_name || "Unknown Product", // Name for admin display
      product_id: newReview.product_id, // ID for storefront filtering
      rating: Number(newReview.rating),
      comment: newReview.comment,
      status: "pending", // All new reviews require moderation!
      created_at: new Date().toISOString()
    };

    // Fetch existing reviews
    let existingReviews: any[] = [];
    const { data: existingData } = await supabase.storage.from("config").download("reviews.json");
    if (existingData) {
      try {
        const text = await existingData.text();
        existingReviews = JSON.parse(text);
      } catch (e) {
        // Ignore parse error, start fresh
      }
    }

    // Append new review
    const updatedReviews = [...existingReviews, reviewToSave];

    // Ensure bucket exists
    await supabase.storage.createBucket("config", { public: false });
    
    // Save back to storage
    const { error: uploadError } = await supabase.storage
      .from("config")
      .upload("reviews.json", JSON.stringify(updatedReviews), {
        upsert: true,
        contentType: "application/json"
      });

    if (uploadError) {
      return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Review submitted for moderation." });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
