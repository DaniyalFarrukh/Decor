import ContactClient from "./client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Decornish",
  description: "Get in touch with the Decornish luxury home decor team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactClient />
      <Footer />
    </>
  );
}
