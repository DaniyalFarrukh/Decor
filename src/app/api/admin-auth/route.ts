import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'decornish2026';

    if (password === ADMIN_PASSWORD) {
      const response = new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      
      response.cookies.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return new NextResponse(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
