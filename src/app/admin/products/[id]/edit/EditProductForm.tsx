"use client";

import { Save } from "lucide-react";
import { updateProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product, categories }: { product: any, categories: any[] }) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await updateProduct(product.id, formData);
    router.push("/admin/products");
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            defaultValue={product.name}
            required 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category_id" className="text-sm font-medium">Category</label>
          <select 
            id="category_id" 
            name="category_id" 
            defaultValue={product.category_id || ""}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-medium">Update Main Image (Optional)</label>
        {product.images?.[0]?.image_url && (
          <div className="mb-2">
            <img src={product.images[0].image_url} alt="Current" className="h-20 w-20 object-cover rounded-md border" />
          </div>
        )}
        <input 
          type="file" 
          id="image" 
          name="image" 
          accept="image/*"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea 
          id="description" 
          name="description" 
          defaultValue={product.description || ""}
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="base_price" className="text-sm font-medium">Base Price (Optional, Rs.)</label>
          <input 
            type="number" 
            step="0.01"
            id="base_price" 
            name="base_price" 
            defaultValue={product.base_price}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">Status</label>
          <select 
            id="status" 
            name="status" 
            defaultValue={product.status}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-6"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Changes
      </button>
    </form>
  );
}
