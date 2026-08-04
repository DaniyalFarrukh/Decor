import CollectionsClient from "./client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Decornish",
  description: "Browse our curated collections of luxury home decor.",
};

export default function CollectionsPage({ categorySlug }: { categorySlug?: string }) {
  return (
    <>
      <Navbar />
      <CollectionsClient categorySlug={categorySlug} />
      <Footer />
    </>
  );
}
