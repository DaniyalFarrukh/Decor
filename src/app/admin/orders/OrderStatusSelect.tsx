"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    await updateOrderStatus(orderId, e.target.value);
    setIsUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'returned': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <select 
      value={currentStatus}
      onChange={handleChange}
      disabled={isUpdating}
      className={`text-xs font-semibold px-2 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${getStatusColor(currentStatus)}`}
    >
      <option value="pending" className="bg-background text-foreground">Pending</option>
      <option value="processing" className="bg-background text-foreground">Processing</option>
      <option value="shipped" className="bg-background text-foreground">Shipped</option>
      <option value="delivered" className="bg-background text-foreground">Delivered</option>
      <option value="cancelled" className="bg-background text-foreground">Cancelled</option>
      <option value="returned" className="bg-background text-foreground">Returned</option>
    </select>
  );
}
