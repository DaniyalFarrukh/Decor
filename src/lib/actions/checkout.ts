"use server";
 

import { createAdminClient } from "@/utils/supabase/server";
import { sendCheckoutEmail } from "@/lib/email";

export async function processCheckout(formData: FormData, cartItems: any[], rawTotal: number, couponCode?: string) {
  try {
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const postalCode = formData.get("postalCode") as string;
    const phone = formData.get("phone") as string;

    const supabase = createAdminClient();

    // 1. Create a guest profile or find existing (simplified for storefront checkout)
    // For a real app we'd link to auth.users, but for guest checkout we can just store details in the order
    // Wait, orders table has customer_id which is a foreign key to profiles.
    // If they are not logged in, we can leave customer_id null and add address to shipping_addresses or order metadata.
    // Let's create an address record first.
    const { data: addressObj, error: addressError } = await supabase.from("addresses").insert({
      street: address,
      city: city,
      postal_code: postalCode,
      country: "Pakistan",
      is_default: true
    }).select().single();

    if (addressError) {
      console.error("Address Error:", addressError);
      return { success: false, error: "Failed to save address." };
    }

    // Fetch coupons to validate on the server
    let discountAmount = 0;
    let finalTotal = rawTotal;
    
    if (couponCode) {
      const { data: configData } = await supabase.storage.from("config").download("coupons.json");
      if (configData) {
        try {
          const couponsText = await configData.text();
          const coupons = JSON.parse(couponsText);
          const validCoupon = coupons.find((c: any) => c.code === couponCode && c.active);
          
          if (validCoupon) {
            discountAmount = Math.round(rawTotal * (validCoupon.discount_percentage / 100));
            finalTotal = rawTotal - discountAmount;
          }
        } catch (e) {
          console.error("Failed to parse coupons", e);
        }
      }
    }

    // 2. Create Order
    const { data: order, error: orderError } = await supabase.from("orders").insert({
      customer_id: null, // Guest checkout
      status: "pending",
      subtotal: rawTotal,
      shipping_cost: 0,
      discount_amount: discountAmount,
      total_amount: finalTotal,
      shipping_address_id: addressObj.id,
      guest_email: email,
      guest_name: `${firstName} ${lastName}`,
      guest_phone: phone
    }).select().single();

    if (orderError) {
      console.error("Order Error:", orderError);
      return { success: false, error: "Failed to create order." };
    }

    // 3. Create Order Items
    const orderItemsToInsert = cartItems.map(item => ({
      order_id: order.id,
      variant_id: null, // If variants were fully integrated we'd pass it
      quantity: item.quantity,
      price_at_time: item.rawPrice || 0
    }));

    await supabase.from("order_items").insert(orderItemsToInsert);

    // 4. Send Emails using centralized logic
    await sendCheckoutEmail({
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phone,
      totalAmount: finalTotal,
      cartItems
    });

    return { success: true };
  } catch (err: any) {
    console.error("Checkout Exception:", err);
    return { success: false, error: err.message };
  }
}
