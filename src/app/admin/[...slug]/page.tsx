import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default async function AdminPlaceholderPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || ["Module"];
  
  // Convert slug array to title case string (e.g., ['products'] -> 'Products')
  const title = slugArray.join(" ").replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white mb-2">{title}</h1>
        <p className="text-[#a3a3a3] font-sans">Manage your {title.toLowerCase()} here.</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="bg-[#1a1a1a] border-[#333333] max-w-md w-full text-center py-12">
          <CardHeader>
            <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-[#a3a3a3]" />
            </div>
            <CardTitle className="text-white text-2xl">{title} Module</CardTitle>
            <CardDescription className="text-[#a3a3a3] mt-2">
              This module is currently being configured and will be connected to the Supabase backend shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="mt-4 px-6 py-2 bg-[#B08D57] text-white rounded-md text-sm font-medium hover:bg-[#8e7146] transition-colors">
              Initialize Module
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
