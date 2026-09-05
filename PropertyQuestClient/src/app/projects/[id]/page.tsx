"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Building,
  Calendar,
  Home,
  Landmark,
  Leaf,
} from "lucide-react";
import ProjectGallery from "./project-gallery";
import ProjectAmenities from "./project-amenities";
import ProjectLocation from "./project-location";
import ProjectPaymentPlan from "./project-payment-plan";
import ProjectUnits from "./project-units";
import ProjectEnquiryForm from "./project-enquiry-form";
import Footer from "@/components/footer";
import Header from "@/components/header";

// This would typically come from a database or API
const projects = [
  {
    id: "skyline-towers",
    name: "Skyline Towers",
    developer: "Premier Developers",
    developerLogo: "/placeholder.svg?height=100&width=100",
    location: "Downtown, Metro City",
    completionDate: "Q4 2025",
    priceRange: "$500K - $2M",
    propertyTypes: ["Apartments", "Penthouses"],
    images: ["/3.jpg", "/5.jpg", "/4.jpg"],
    status: "Off-Plan",
    featured: true,
    description:
      "Skyline Towers is a premium residential development offering luxury apartments and penthouses with panoramic city views. Located in the heart of Downtown, this iconic twin-tower project combines sophisticated design with state-of-the-art amenities to deliver an unparalleled living experience. Each residence features high-end finishes, smart home technology, and spacious layouts designed for modern urban living.",
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Spa & Sauna",
      "Sky Lounge",
      "Children's Play Area",
      "24/7 Security",
      "Concierge Service",
      "Smart Home Technology",
      "EV Charging Stations",
      "Business Center",
      "Rooftop Garden",
      "Private Theater",
    ],
    unitTypes: [
      {
        type: "1 Bedroom Apartment",
        size: "750-850 sq ft",
        priceRange: "$500K - $650K",
        available: 28,
      },
      {
        type: "2 Bedroom Apartment",
        size: "1,100-1,300 sq ft",
        priceRange: "$750K - $950K",
        available: 42,
      },
      {
        type: "3 Bedroom Apartment",
        size: "1,600-1,800 sq ft",
        priceRange: "$1.1M - $1.4M",
        available: 24,
      },
      {
        type: "Penthouse",
        size: "2,500-3,000 sq ft",
        priceRange: "$1.8M - $2M",
        available: 6,
      },
    ],
    paymentPlan: {
      booking: "10%",
      construction: [
        { milestone: "Foundation Completion", percentage: "10%" },
        { milestone: "Structure Completion", percentage: "20%" },
        { milestone: "Interior Works", percentage: "30%" },
      ],
      handover: "30%",
    },
    features: [
      "Floor-to-ceiling windows",
      "Premium kitchen appliances",
      "Marble countertops",
      "Hardwood flooring",
      "Smart home integration",
      "Private balconies",
      "Walk-in closets",
      "Soundproof walls",
    ],
    sustainability: [
      "LEED Gold certification",
      "Solar panels",
      "Energy-efficient appliances",
      "Water conservation systems",
      "EV charging stations",
      "Sustainable building materials",
    ],
  },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Back Button */}
        <div className="bg-white px-6">
          <div className="container py-4">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all projects
            </Link>
          </div>
        </div>

        {/* Project Header */}
        <div className="bg-white border-b border-[#b6b3b3] px-6">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {project.name}
                  </h1>
                  <Badge className="bg-primary">{project.status}</Badge>
                </div>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xl font-bold text-[#16a249]">
                  {project.priceRange}
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Completion: {project.completionDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 w-full py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2">
              {/* Project Gallery */}
              <ProjectGallery images={project.images} />

              {/* Project Details Tabs */}
              <div className="mt-8 bg-white rounded-lg border border-[#b6b3b3] overflow-hidden">
                <Tabs defaultValue="overview">
                  <TabsList className="w-full border-b rounded-none bg-white p-0">
                    <TabsTrigger
                      value="overview"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="amenities"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Amenities
                    </TabsTrigger>
                    <TabsTrigger
                      value="location"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Location
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Payment Plan
                    </TabsTrigger>
                    <TabsTrigger
                      value="units"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Available Units
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Developer</div>
                            <div className="text-sm text-gray-500">
                              {project.developer}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Home className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Property Types</div>
                            <div className="text-sm text-gray-500">
                              {project.propertyTypes.join(", ")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Landmark className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Status</div>
                            <div className="text-sm text-gray-500">
                              {project.status}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Completion</div>
                            <div className="text-sm text-gray-500">
                              {project.completionDate}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Key Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Sustainability
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.sustainability.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <Leaf className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="amenities" className="p-6">
                    <ProjectAmenities amenities={project.amenities} />
                  </TabsContent>

                  <TabsContent value="location" className="p-6">
                    <ProjectLocation location={project.location} />
                  </TabsContent>

                  <TabsContent value="payment" className="p-6">
                    <ProjectPaymentPlan paymentPlan={project.paymentPlan} />
                  </TabsContent>

                  <TabsContent value="units" className="p-6">
                    <ProjectUnits units={project.unitTypes} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Column - Enquiry Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-[#b6b3b3] p-6 sticky top-20">
                <div className="flex items-center gap-4 pb-4 border-b border-[#b6b3b3]">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                    <Image
                      src={project.developerLogo || "/placeholder.svg"}
                      alt={project.developer}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{project.developer}</h3>
                    <p className="text-sm text-gray-500">Developer</p>
                  </div>
                </div>

                <div className="py-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Starting Price:</span>
                    <span className="font-medium">
                      {project.priceRange.split(" - ")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion:</span>
                    <span className="font-medium">
                      {project.completionDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Property Types:</span>
                    <span className="font-medium">
                      {project.propertyTypes.join(", ")}
                    </span>
                  </div>
                </div>

                <ProjectEnquiryForm projectName={project.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
