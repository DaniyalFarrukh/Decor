import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { getOrders } from "@/lib/actions/orders";

export default async function AnalyticsPage() {
  const orders = await getOrders();
  
  // Calculate metrics
  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
  const totalOrders = orders.length;
  
  // Get unique customers count
  const uniqueCustomers = new Set();
  orders.forEach((order: any) => {
    if (order.customer?.email) uniqueCustomers.add(order.customer.email);
    else if (order.guest_email) uniqueCustomers.add(order.guest_email);
  });
  
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white mb-2">Analytics</h1>
        <p className="text-[#a3a3a3] font-sans">Overview of your store's performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a3a3a3]">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#B08D57]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Rs. {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-[#a3a3a3] mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a3a3a3]">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-[#B08D57]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalOrders}</div>
            <p className="text-xs text-[#a3a3a3] mt-1">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a3a3a3]">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#B08D57]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Rs. {avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <p className="text-xs text-[#a3a3a3] mt-1">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a3a3a3]">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-[#B08D57]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{uniqueCustomers.size}</div>
            <p className="text-xs text-[#a3a3a3] mt-1">+12 new customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Recent Sales</CardTitle>
            <CardDescription className="text-[#a3a3a3]">Your store's latest transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-[#333333] flex items-center justify-center text-[#B08D57] font-semibold text-xs">
                    {(order.customer?.first_name?.[0] || order.guest_name?.[0] || '?').toUpperCase()}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : order.guest_name || 'Guest'}
                    </p>
                    <p className="text-xs text-[#a3a3a3]">
                      {order.customer?.email || order.guest_email || 'No email provided'}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-white">
                    +Rs. {order.total_amount?.toLocaleString()}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center text-[#a3a3a3] text-sm py-4">No sales data yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-[#a3a3a3]">Monthly revenue graph placeholder.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
             <div className="flex flex-col items-center justify-center text-[#a3a3a3]">
                <BarChart className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm">Connect a charting library to view detailed graphs.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
