"use server";
 

import { createAdminClient } from "@/utils/supabase/server";
import { sendContactEmail } from "@/lib/email";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "All fields are required." };
    }

    const supabase = createAdminClient();

    // 1. Insert into Supabase (if the table exists, otherwise we ignore the DB error so the email can still send)
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
    });

    if (dbError) {
      console.warn("Could not insert message into Supabase. (Make sure you create the contact_messages table):", dbError.message);
      // We don't return an error here, because we still want to try sending the email!
    }

    // 2. Send Emails using centralized logic
    await sendContactEmail({
      name,
      email,
      message
    });

    return { success: true };
  } catch (err: any) {
    console.error("Contact Form Exception:", err);
    return { success: false, error: err.message };
  }
}
