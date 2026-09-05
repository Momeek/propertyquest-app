"use client";
import { useState } from "react";
import SearchForm from "@/components/search-form";
// import FeaturedProjects from "@/components/featured-projects";
import PropertyListings from "@/components/property-listings";
// import MarketInsights from "@/components/market-insights";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthModals from "@/components/auth/auth-modals";

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
  };

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/property-b1.jpg"
            alt="Modern home exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <div className="max-w-2xl text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Discover thousands of properties for sale and rent across the
              country
            </p>
          </div>

          <SearchForm />
        </div>
      </section>

      {/* Featured Projects */}
      {/* <FeaturedProjects /> */}

      {/* Property Listings */}
      <PropertyListings />

      {/* Market Insights */}
      {/* <MarketInsights /> */}

      {/* App Download Section */}
      <section className="py-16 bg-primary text-black flex justify-center px-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl text-white font-bold mb-4">
                Download Our Mobile App
              </h2>
              <p className="text-white/80 mb-6">
                Take PropertyQuest with you wherever you go. Search properties,
                save favorites, and get instant notifications on price drops and
                new listings.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  className="gap-2 bg-white hover:bg-gray-200 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  App Store
                </Button>
                <Button
                  variant="secondary"
                  className="gap-2 bg-white hover:bg-gray-200 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Google Play
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative h-[400px] w-[200px]">
                {/* <Image
                  src=""
                  alt="PropertyQuest mobile app"
                  fill
                  className="object-contain"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 bg-[#ffffff] flex justify-center px-6">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who found their perfect
            property with PropertyQuest
          </p>
          <Button onClick={handleSignUpClick} size="lg" className="gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />

      <AuthModals
        isSignInOpen={false}
        isSignUpOpen={isSignUpOpen}
        onSignInOpenChange={() => {}}
        onSignUpOpenChange={setIsSignUpOpen}
        onSwitchToSignUp={() => {}}
        onSwitchToSignIn={() => {}}
      />
    </div>
  );
}
