"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/admin";
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-lg border border-[#333333] shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#333333] flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#a3a3a3]" />
          </div>
        </div>
        <h1 className="text-2xl font-heading text-white text-center mb-2 uppercase tracking-wide">
          Admin Portal
        </h1>
        <p className="text-[#a3a3a3] text-sm text-center mb-8">
          Enter your credentials to access the dashboard
        </p>

        <div className="space-y-6" onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSubmit(e as unknown as React.FormEvent)}>
          <div>
            <label className="block text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-3 rounded-md outline-none focus:border-[#B08D57] transition-colors"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit as any}
            disabled={isLoading || !password}
            className="w-full bg-[#B08D57] text-white py-3 rounded-md font-semibold hover:bg-[#c29c61] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
