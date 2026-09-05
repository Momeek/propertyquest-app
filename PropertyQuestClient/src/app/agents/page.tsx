import type { Metadata } from "next";
import AgentSearch from "./agent-search";
import FeaturedAgents from "./featured-agents";
import AgentCategories from "./agent-categories";
import TopAgencies from "./top-agencies";
import AgentsByLocation from "./agents-by-location";
import AgentTestimonials from "./agent-testimonials";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import Image from "next/image";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Find Real Estate Agents | PropertyQuest",
  description:
    "Connect with top-rated real estate agents to help you buy, sell, or rent your next property",
};

export default function AgentsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-5">
          <div className="absolute inset-0">
            <Image
              src="/agents-banner.jpg"
              alt="Modern home exterior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 hero-gradient" />
          </div>

          <div className="relative h-full flex flex-col items-center justify-center px-6">
            <div className="max-w-2xl text-white mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Find Your Perfect Real Estate Partner
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Connect with experienced agents who will guide you through every
                step of your property journey
              </p>
            </div>

            <AgentSearch />
          </div>
        </section>

        {/* Featured Agents Section */}
        <div className="container py-12 flex flex-col mx-auto justify-center px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Top-Rated Agents
              </h2>
              <p className="text-gray-500 mt-1">
                Our highest-performing real estate professionals
              </p>
            </div>
            <Link href="/agents/all">
              <Button variant="outline">View All Agents</Button>
            </Link>
          </div>
          <FeaturedAgents />
        </div>

        {/* Agent Categories */}
        <div className="bg-white py-12 border-y border-[#b6b3b3]">
          <div className="container flex flex-col mx-auto justify-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Find Agents By Specialty
            </h2>
            <AgentCategories />
          </div>
        </div>

        {/* Top Agencies */}
        <div className="container py-12 flex flex-col mx-auto justify-center px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Leading Agencies
              </h2>
              <p className="text-gray-500 mt-1">
                Partner with established real estate companies
              </p>
            </div>
            <Link href="/agencies">
              <Button variant="outline">View All Agencies</Button>
            </Link>
          </div>
          <TopAgencies />
        </div>

        {/* Agents By Location */}
        <div className="bg-white py-12 border-y border-[#b6b3b3]">
          <div className="container flex flex-col mx-auto justify-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Find Agents By Location
            </h2>
            <AgentsByLocation />
          </div>
        </div>

        {/* Testimonials */}
        <div className="container py-12 flex flex-col mx-auto justify-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What Our Clients Say
          </h2>
          <AgentTestimonials />
        </div>

        {/* Become an Agent CTA */}
        <div className="bg-primary text-black py-16">
          <div className="container flex flex-col mx-auto justify-center px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Are You a Real Estate Professional?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join our network of top agents and get connected with clients
                looking for your expertise
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white hover:bg-gray-200 cursor-pointer w-fit"
              >
                <UserPlus className="h-5 w-5" />
                Join as an Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
