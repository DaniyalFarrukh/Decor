import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag } from "lucide-react";
import { getOrders } from "@/lib/actions/orders";
import { getProducts } from "@/lib/actions/products";

export default async function AdminDashboard() {
  const orders = await getOrders() || [];
  const products = await getProducts() || [];

  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
  const totalSales = orders.length;
  
  const uniqueCustomers = new Set(orders.map((o: any) => o.customer?.email).filter(Boolean));
  const customersCount = uniqueCustomers.size;

  const recentOrders = orders.slice(0, 5).map((order: any) => ({
    name: order.customer ? `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim() || 'Guest' : 'Guest',
    email: order.customer?.email || 'N/A',
    amount: `Rs ${order.total_amount?.toLocaleString() || 0}`,
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1)
  }));

  const inventoryAlerts = products
    .flatMap((product: any) => {
      if (!product.variants || product.variants.length === 0) return [];
      return product.variants
        .filter((v: any) => v.stock_quantity < 2)
        .map((v: any) => ({
          name: product.name + (product.variants.length > 1 ? ` - ${v.name}` : ''),
          stock: v.stock_quantity
        }));
    })
    .slice(0, 5);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white mb-2">Dashboard</h1>
        <p className="text-[#a3a3a3] font-sans">Overview of your store's performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a3a3a3]">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[#a3a3a3]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Rs {(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-[#a3a3a3] mt-1">
              Based on all orders
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a3a3a3]">
              Sales
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-[#a3a3a3]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalSales}</div>
            <p className="text-xs text-[#a3a3a3] mt-1">
              Total orders placed
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a3a3a3]">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-[#a3a3a3]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customersCount}</div>
            <p className="text-xs text-[#a3a3a3] mt-1">
              Unique customers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-[#1a1a1a] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentOrders.length === 0 ? (
                <div className="text-[#a3a3a3] text-sm">No recent orders found.</div>
              ) : (
                recentOrders.map((order: any, i: number) => (
                  <div key={i} className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-[#333333] flex items-center justify-center text-white text-sm font-medium">
                      {order.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{order.name}</p>
                      <p className="text-sm text-[#a3a3a3]">{order.email}</p>
                    </div>
                    <div className="ml-auto flex flex-col items-end gap-1">
                      <p className="text-sm font-medium text-white">{order.amount}</p>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-[#3E7D59]/20 text-[#3E7D59]' :
                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-[#B08D57]/20 text-[#B08D57]'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-[#1a1a1a] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Inventory Alerts</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
                {inventoryAlerts.length === 0 ? (
                  <div className="text-[#a3a3a3] text-sm">All inventory levels are healthy.</div>
                ) : (
                  inventoryAlerts.map((alert: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between border-b border-[#333333] pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-white line-clamp-1 max-w-[200px]">{alert.name}</p>
                        <p className={`text-sm ${alert.stock === 0 ? 'text-red-400' : 'text-[#a3a3a3]'}`}>
                          {alert.stock === 0 ? 'Out of stock' : `${alert.stock} left in stock`}
                        </p>
                      </div>
                      <button className="text-xs font-medium text-[#B08D57] hover:text-white transition-colors">Restock</button>
                    </div>
                  ))
                )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
