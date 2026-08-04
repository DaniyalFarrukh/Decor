"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Mail, MapPin, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    contact_email: "",
    address: "",
    instagram_url: "",
    facebook_url: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setFormData({
              contact_email: data.contact_email || "",
              address: data.address || "",
              instagram_url: data.instagram_url || "",
              facebook_url: data.facebook_url || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ text: "Settings saved successfully!", type: "success" });
        router.refresh();
      } else {
        setMessage({ text: "Failed to save settings.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-[#B08D57] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-[#a3a3a3] font-sans">Manage your store's global configuration.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md font-medium text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Contact Information */}
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#B08D57]" />
              Store Information
            </CardTitle>
            <CardDescription className="text-[#a3a3a3]">
              This information is displayed in the footer of your storefront.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#a3a3a3]">Contact Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="e.g. contact@decornish.com"
                className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-2.5 rounded-md outline-none focus:border-[#B08D57] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#a3a3a3]">Store Address (Accepts HTML/JSX)</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 123 Luxury Avenue\nNew York, NY"
                rows={3}
                className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-2.5 rounded-md outline-none focus:border-[#B08D57] transition-colors resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <svg className="w-5 h-5 text-[#B08D57]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Social Media
            </CardTitle>
            <CardDescription className="text-[#a3a3a3]">
              Links to your social media profiles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#a3a3a3] flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg> Instagram URL
              </label>
              <input
                type="url"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/decornish"
                className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-2.5 rounded-md outline-none focus:border-[#B08D57] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#a3a3a3] flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> Facebook URL
              </label>
              <input
                type="url"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/decornish"
                className="w-full bg-[#111111] border border-[#333333] text-white px-4 py-2.5 rounded-md outline-none focus:border-[#B08D57] transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security / Password */}
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#B08D57]" />
              Admin Security
            </CardTitle>
            <CardDescription className="text-[#a3a3a3]">
              Admin portal access is currently secured via environment variables. To change your admin password, update the <code>ADMIN_PASSWORD</code> variable in your <code>.env.local</code> file and restart the server.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button
              type="button"
              disabled
              className="px-6 py-2 bg-[#333333] text-[#a3a3a3] rounded-md text-sm font-medium cursor-not-allowed"
            >
              Update Password
            </button>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 bg-[#B08D57] text-white rounded-md font-medium hover:bg-[#c29c61] transition-colors disabled:opacity-50 shadow-lg"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save Settings
          </button>
        </div>

      </form>
    </div>
  );
}
