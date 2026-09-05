import type { Metadata } from "next";
import Image from "next/image";
import PriceTrends from "./price-trends";
import NeighborhoodAnalysis from "./neighborhood-analysis";
import MarketReports from "./market-reports";
import ExpertAnalysis from "./expert-analysis";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Market Insights | PropertyQuest",
  description:
    "Stay informed with the latest real estate market trends, analysis, and investment opportunities",
};

export default function MarketInsightsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[200px]">
          <Image
            src="/insight-banner.jpg"
            alt="Real estate market data"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container h-full flex flex-col justify-center px-6 py-6">
            <div className="max-w-2xl text-white mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Market Insights
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Stay informed with the latest real estate trends, data-driven
                analysis, and investment opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="container py-12 flex flex-col mx-auto justify-center px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Market Overview
              </h2>
              <p className="text-gray-500 mt-1">
                Current real estate market conditions and key indicators
              </p>
            </div>
          </div>
          <PriceTrends />
        </div>

        {/* Neighborhood Analysis */}
        <div className="bg-white py-12 border-y border-[#b6b3b3]">
          <div className="container flex flex-col mx-auto justify-center px-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Neighborhood Analysis
                </h2>
                <p className="text-gray-500 mt-1">
                  Explore market performance across different neighborhoods
                </p>
              </div>
            </div>
            <NeighborhoodAnalysis />
          </div>
        </div>

        {/* Market Reports */}
        <div className="bg-white py-12 border-yborder-[#b6b3b3]">
          <div className="container flex flex-col mx-auto justify-center px-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Market Reports
                </h2>
                <p className="text-gray-500 mt-1">
                  In-depth analysis and quarterly market reports
                </p>
              </div>
            </div>
            <MarketReports />
          </div>
        </div>

        {/* Expert Analysis */}
        <div className="container py-12 flex flex-col mx-auto justify-center px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Expert Analysis
              </h2>
              <p className="text-gray-500 mt-1">
                Insights from our team of real estate experts
              </p>
            </div>
          </div>
          <ExpertAnalysis />
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-black py-16">
          <div className="text-center flex flex-col mx-auto justify-center items-center px-6">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Need Personalized Market Insights?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Connect with our market analysts for customized reports and
              investment advice tailored to your specific needs
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-white hover:bg-gray-200 cursor-pointer w-fit"
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
