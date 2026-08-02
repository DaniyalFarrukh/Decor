 
import { Card, CardContent } from "@/components/ui/card";
import { getProducts } from "@/lib/actions/products";
import { PackageOpen } from "lucide-react";

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Collections</h2>
        <p className="text-muted-foreground">
          View all your listed products across all categories.
        </p>
      </div>

      {products.length === 0 ? (
        <Card className="bg-background border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <PackageOpen className="h-16 w-16 mb-4 opacity-20" />
            <h3 className="text-xl font-semibold mb-2">No Products in Collection</h3>
            <p>Start listing products in the Products module to see them here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Card key={product.id} className="overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
              {/* Product Image */}
              <div className="aspect-square bg-muted flex items-center justify-center border-b relative overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0].image_url} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <PackageOpen className="h-12 w-12 text-muted-foreground opacity-30" />
                )}
              </div>
              <CardContent className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1" title={product.name}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.category ? product.category.name : "Uncategorized"}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold">Rs. {product.base_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' :
                    product.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {product.status}
                  </span>
                </div>
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                    {product.variants.length} variant{product.variants.length > 1 ? 's' : ''} available
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
