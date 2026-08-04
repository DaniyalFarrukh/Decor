import WishlistClient from "./client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Decornish",
  description: "View your saved luxury home decor items.",
};

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <WishlistClient />
      <Footer />
    </>
  );
}
