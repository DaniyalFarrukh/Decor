"use server";
 

import { createAdminClient } from "@/utils/supabase/server";

export async function getStorefrontProducts() {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      base_price,
      status,
      category:categories(name),
      images:product_images(image_url),
      variants(stock_quantity)
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching storefront products:", JSON.stringify(error, null, 2));
    return [];
  }

  // Format the data to match the frontend components expectations
  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    category: (p.category as any)?.name || "Decor",
    price: `Rs. ${p.base_price.toLocaleString()}`,
    rawPrice: p.base_price || 0,
    image: p.images?.[0]?.image_url || "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600",
    inStock: p.variants && p.variants.length > 0 
      ? p.variants.reduce((sum: number, v: any) => sum + (v.stock_quantity || 0), 0) > 0
      : true,
  }));
}

export async function getStorefrontProduct(id: string) {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      base_price,
      status,
      category:categories(name),
      images:product_images(image_url),
      variants(stock_quantity)
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Error fetching storefront product:", error ? JSON.stringify(error, null, 2) : "No data found");
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    category: (data.category as any)?.name || "Decor",
    price: `Rs. ${data.base_price.toLocaleString()}`,
    rawPrice: data.base_price || 0,
    images: data.images?.map((img: any) => img.image_url) || [],
    inStock: data.variants && data.variants.length > 0 
      ? data.variants.reduce((sum: number, v: any) => sum + (v.stock_quantity || 0), 0) > 0
      : true, // Default to true if variants aren't populated yet
  };
}
