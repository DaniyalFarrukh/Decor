import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage.from("config").download("coupons.json");

    if (error) {
      return NextResponse.json([]);
    }

    const text = await data.text();
    const coupons = JSON.parse(text);
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();
    const body = await req.json(); // Array of coupons
    
    await supabase.storage.createBucket("config", { public: false });
    
    const { error } = await supabase.storage
      .from("config")
      .upload("coupons.json", JSON.stringify(body), {
        upsert: true,
        contentType: "application/json"
      });

    if (error) {
      return NextResponse.json({ error: "Failed to save coupons" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
