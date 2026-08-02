import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts, deleteProduct } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { Package, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import ProductForm from "./ProductForm";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground">
          Manage your products, categories, and inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductForm categories={categories} />
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Listed Products</CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mb-4 opacity-20" />
                  <p>No products found.</p>
                  <p className="text-sm">Create your first product using the form.</p>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground border-b">
                      <tr>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Category</th>
                        <th className="px-4 py-3 font-medium">Price</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Variants</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product: any) => (
                        <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-3 font-medium">{product.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {product.category ? product.category.name : "None"}
                          </td>
                          <td className="px-4 py-3">Rs. {product.base_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'active' ? 'bg-green-100 text-green-700' :
                              product.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {product.variants?.length || 0}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link 
                                href={`/admin/products/${product.id}/edit`}
                                className="text-blue-500 hover:text-blue-700 transition-colors p-2"
                              >
                                <Edit className="h-4 w-4" />
                              </Link>
                              <form action={async () => {
                                "use server";
                                await deleteProduct(product.id);
                              }}>
                                <button type="submit" className="text-red-500 hover:text-red-700 transition-colors p-2">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
