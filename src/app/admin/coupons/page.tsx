"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags, Plus, Trash2, Tag, Percent } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  active: boolean;
  created_at: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      if (res.ok) {
        const data = await res.json();
        setCoupons(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch coupons", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCoupons = async (updatedCoupons: Coupon[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCoupons)
      });
      if (res.ok) {
        setCoupons(updatedCoupons);
      }
    } catch (error) {
      console.error("Failed to save coupons", error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newDiscount) return;
    
    const newCoupon: Coupon = {
      id: Math.random().toString(36).substring(7),
      code: newCode.toUpperCase(),
      discount_percentage: parseInt(newDiscount),
      active: true,
      created_at: new Date().toISOString()
    };
    
    saveCoupons([...coupons, newCoupon]);
    setNewCode("");
    setNewDiscount("");
  };

  const handleDelete = (id: string) => {
    const updated = coupons.filter(c => c.id !== id);
    saveCoupons(updated);
  };

  const toggleStatus = (id: string) => {
    const updated = coupons.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    );
    saveCoupons(updated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white mb-2">Coupons</h1>
        <p className="text-[#a3a3a3] font-sans">Create and manage discount codes.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Create Coupon Form */}
        <div className="md:col-span-4">
          <Card className="bg-[#1a1a1a] border-[#333333] sticky top-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#B08D57]" />
                New Coupon
              </CardTitle>
              <CardDescription className="text-[#a3a3a3]">
                Create a new discount code for your customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCoupon} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#a3a3a3] flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Coupon Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    placeholder="e.g. SUMMER20"
                    className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-2.5 rounded-md outline-none focus:border-[#B08D57] transition-colors font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#a3a3a3] flex items-center gap-2">
                    <Percent className="w-4 h-4" /> Discount Percentage
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                    placeholder="20"
                    className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-2.5 rounded-md outline-none focus:border-[#B08D57] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving || !newCode || !newDiscount}
                  className="w-full bg-[#B08D57] hover:bg-[#8e7146] text-white py-2.5 rounded-md font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Create Coupon"}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Coupons List */}
        <div className="md:col-span-8">
          <Card className="bg-[#1a1a1a] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Tags className="w-5 h-5 text-[#B08D57]" />
                Active Coupons
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center text-[#a3a3a3] py-8">Loading coupons...</div>
              ) : coupons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-[#a3a3a3]">
                  <Tags className="h-12 w-12 mb-4 opacity-20" />
                  <p>No coupons created yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="flex items-center justify-between p-4 rounded-md border border-[#333333] bg-[#111111]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#333333] flex items-center justify-center text-[#B08D57]">
                          <Percent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-mono font-bold text-white tracking-wider">{coupon.code}</h3>
                          <p className="text-sm text-[#a3a3a3]">
                            {coupon.discount_percentage}% off • Created {new Date(coupon.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStatus(coupon.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            coupon.active 
                              ? "bg-[#3E7D59]/10 text-[#3E7D59] border-[#3E7D59]/20 hover:bg-[#3E7D59]/20" 
                              : "bg-[#333333] text-[#a3a3a3] border-transparent hover:bg-[#444]"
                          }`}
                        >
                          {coupon.active ? "Active" : "Inactive"}
                        </button>
                        <button
                          onClick={() => handleDelete(coupon.id)}
                          className="p-2 text-[#a3a3a3] hover:text-[#ff4444] transition-colors"
                          aria-label="Delete coupon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
