"use client";

import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PropertyFAQ from "./property-faq";
import RentPageContent from "./rent-page-content";

export default function RentPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="bg-cover text-white px-6 py-4 bg-center bg-no-repeat border-b h-44 md:h-46"
          style={{ backgroundImage: "url('/property-rent.jpg')" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Properties for Rent
          </h1>
          <p className="text-gray-100 text-lg">
            Find your perfect rental place from our curated selection of
            properties
          </p>
        </div>

        <Suspense
          fallback={<div className="container py-8 px-6">Loading...</div>}
        >
          <RentPageContent />
        </Suspense>

        <PropertyFAQ />
      </div>
      <Footer />
    </>
  );
}