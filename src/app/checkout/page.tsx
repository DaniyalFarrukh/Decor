import CheckoutClient from "./client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Decornish",
  description: "Secure checkout for your luxury home decor.",
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <CheckoutClient />
      <Footer />
    </>
  );
}
