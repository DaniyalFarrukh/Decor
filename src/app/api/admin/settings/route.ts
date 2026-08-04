import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage.from("config").download("settings.json");

    if (error) {
      // If file doesn't exist, return empty object
      return NextResponse.json({});
    }

    const text = await data.text();
    const settings = JSON.parse(text);
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();
    const body = await req.json();
    
    // Ensure bucket exists (ignores if it already does)
    await supabase.storage.createBucket("config", { public: false });
    
    // Upload/overwrite settings.json
    const { error } = await supabase.storage
      .from("config")
      .upload("settings.json", JSON.stringify(body), {
        upsert: true,
        contentType: "application/json"
      });

    if (error) {
      console.error("Error saving settings:", error);
      return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Settings POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
