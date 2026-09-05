import type { Metadata } from "next";
import ProjectSearch from "./project-search";
import FeaturedProjects from "./featured-projects";
import ProjectCategories from "./project-categories";
import ProjectListings from "./project-listings";
import ProjectStats from "./project-stats";
import ProjectDevelopers from "./project-developers";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "New Development Projects | PropertyQuest",
  description:
    "Discover upcoming and newly launched real estate development projects in prime locations",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[500px]">
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

          <div className="relative h-full flex flex-col items-center justify-center">
            <div className="max-w-2xl text-white mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover New Development Projects
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Explore upcoming and newly launched real estate projects in
                prime locations
              </p>
            </div>

            <ProjectSearch />
          </div>
        </section>

        {/* Featured Projects */}
        <div className="container py-12 flex flex-col justify-center px-6 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Featured Projects
              </h2>
              <p className="text-gray-500 mt-1">
                Handpicked premium development projects
              </p>
            </div>
          </div>
          <FeaturedProjects />
        </div>

        {/* Project Categories */}
        <div className="bg-white py-12 border-y border-[#b6b3b3]">
          <div className="container flex flex-col mx-auto justify-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Browse By Category
            </h2>
            <ProjectCategories />
          </div>
        </div>

        {/* Project Listings */}
        <div className="container py-12 flex flex-col mx-auto justify-center px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">All Projects</h2>
              <p className="text-gray-500 mt-1">
                Explore our complete collection of development projects
              </p>
            </div>
          </div>
          <ProjectListings />
        </div>

        {/* Project Stats */}
        <div className="bg-primary/5 py-12 border-y border-[#b6b3b3]">
          <div className="container flex flex-col mx-auto justify-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Market Insights
            </h2>
            <ProjectStats />
          </div>
        </div>

        {/* Project Developers */}
        <div className="container py-12 flex flex-col mx-auto justify-center px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Top Developers</h2>
              <p className="text-gray-500 mt-1">
                Leading real estate developers with exceptional track records
              </p>
            </div>
          </div>
          <ProjectDevelopers />
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-black py-16">
          <div className="text-center flex flex-col mx-auto justify-center items-center px-6">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Invest in Your Future?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Connect with our project specialists to get personalized
              recommendations and exclusive pre-launch offers
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
