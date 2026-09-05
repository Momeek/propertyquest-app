"use client";

import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PropertyFAQ from "./property-faq";
import BuyPageContent from "./buy-page-content";

export default function BuyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="bg-cover text-white px-6 py-4 bg-center bg-no-repeat border-b h-44 md:h-46"
          style={{ backgroundImage: "url('/property-buy.jpg')" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Properties for Sale
          </h1>
          <p className="text-gray-100 text-lg">
            Discover your perfect place from our curated selection of properties
          </p>
        </div>

        <Suspense
          fallback={<div className="container py-8 px-6">Loading...</div>}
        >
          <BuyPageContent />
        </Suspense>

        <PropertyFAQ />
      </div>
      <Footer />
    </>
  );
}