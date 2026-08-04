import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrders } from "@/lib/actions/orders";
import { Users, Mail, Phone, Calendar } from "lucide-react";

export default async function CustomersPage() {
  const orders = await getOrders();
  
  // Aggregate customers from orders
  const customersMap = new Map();
  
  orders.forEach((order: any) => {
    const email = order.customer?.email || order.guest_email;
    if (!email) return;

    if (!customersMap.has(email)) {
      customersMap.set(email, {
        email,
        name: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : order.guest_name || 'Guest',
        phone: order.guest_phone || 'N/A',
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: new Date(order.created_at)
      });
    }

    const customer = customersMap.get(email);
    customer.totalOrders += 1;
    customer.totalSpent += (order.total_amount || 0);
    
    const orderDate = new Date(order.created_at);
    if (orderDate > customer.lastOrder) {
      customer.lastOrder = orderDate;
    }
  });

  const customers = Array.from(customersMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white mb-2">Customers</h1>
        <p className="text-[#a3a3a3] font-sans">View and manage your customer base.</p>
      </div>

      <Card className="bg-[#1a1a1a] border-[#333333]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#B08D57]" />
            Customer Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-[#a3a3a3]">
              <Users className="h-12 w-12 mb-4 opacity-20" />
              <p>No customers found.</p>
              <p className="text-sm">When customers place orders, they will appear here.</p>
            </div>
          ) : (
            <div className="rounded-md border border-[#333333] overflow-x-auto">
              <table className="w-full text-sm text-left text-white">
                <thead className="bg-[#111111] text-[#a3a3a3] border-b border-[#333333]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Total Orders</th>
                    <th className="px-4 py-3 font-medium">Total Spent</th>
                    <th className="px-4 py-3 font-medium">Last Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333333]">
                  {customers.map((customer: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#333333]/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#333333] flex items-center justify-center text-[#B08D57] font-semibold text-xs shrink-0">
                            {(customer.name[0] || '?').toUpperCase()}
                          </div>
                          <span className="font-medium">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#a3a3a3]">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[150px]" title={customer.email}>{customer.email}</span>
                        </div>
                        {customer.phone !== 'N/A' && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>{customer.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-[#333333] text-white px-2.5 py-1 rounded-full text-xs font-medium">
                          {customer.totalOrders}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-[#B08D57]">
                        Rs. {customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-4 text-[#a3a3a3]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {customer.lastOrder.toLocaleDateString()}
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
  );
}
