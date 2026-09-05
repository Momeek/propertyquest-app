"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Award,
  CheckCircle,
  MapPin,
  Languages,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Share2,
  FileText,
  Home,
  Building,
  Briefcase,
  User,
  ThumbsUp,
} from "lucide-react";
import AgentProperties from "./agent-properties";
import AgentReviews from "./agent-reviews";
import AgentContact from "./agent-contact";
import Footer from "@/components/footer";
import Header from "@/components/header";

// This would typically come from a database or API
const agents = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Real Estate Consultant",
    photo: "/user.jpg",
    coverPhoto: "/placeholder.svg?height=600&width=1200",
    agency: "Luxury Homes Realty",
    agencyLogo: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviewCount: 124,
    bio: "With over 8 years of experience in luxury real estate, I specialize in helping clients find their dream homes in the most desirable neighborhoods. My background in interior design gives me a unique perspective on property potential, and I'm dedicated to providing personalized service tailored to each client's specific needs.",
    specialties: [
      "Luxury Properties",
      "Waterfront Homes",
      "Investment Properties",
    ],
    certifications: [
      "Certified Luxury Home Marketing Specialist",
      "Accredited Buyer's Representative",
    ],
    languages: ["English", "Spanish"],
    areas: ["Downtown", "Uptown", "Beachfront"],
    experience: 8,
    transactions: 215,
    propertiesCount: {
      sale: 28,
      rent: 12,
    },
    contactInfo: {
      phone: "(555) 123-4567",
      email: "sarah.johnson@luxuryhomes.com",
      office: "123 Main Street, Suite 400",
    },
    socialMedia: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      instagram: "https://instagram.com/sarahjohnsonrealty",
      facebook: "https://facebook.com/sarahjohnsonrealty",
    },
    verified: true,
    featured: true,
    awards: ["Top Producer 2022", "5-Star Agent 2021, 2022"],
  },
  {
    id: "2",
    name: "Michael Smith",
    title: "Real Estate Broker",
    photo: "/user.jpg",
    coverPhoto: "/placeholder.svg?height=600&width=1200",
    agency: "Prime Realty Group",
    agencyLogo: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviewCount: 98,
    bio: "As a seasoned real estate broker, I have helped countless families and investors find the perfect properties. My expertise lies in market analysis and negotiation, ensuring my clients get the best deals possible.",
    specialties: [
      "Residential Properties",
      "Commercial Properties",
      "First-Time Buyers",
    ],
    certifications: [
      "Certified Residential Specialist",
      "Real Estate Negotiation Expert",
    ],
    languages: ["English"],
    areas: ["Suburbs", "Downtown"],
    experience: 10,
    transactions: 300,
    propertiesCount: {
      sale: 35,
      rent: 20,
    },
    contactInfo: {
      phone: "(555) 987-6543",
      email: "michael.smith@primerealty.com",
      office: "456 Elm Street, Suite 200",
    },
    socialMedia: {
      linkedin: "https://linkedin.com/in/michaelsmith",
      instagram: "https://instagram.com/michaelsmithrealty",
    },
    verified: true,
    featured: false,
    awards: ["Top Broker 2021"],
  },
  {
    id: "3",
    name: "Emily Davis",
    title: "Luxury Property Specialist",
    photo: "/user.jpg",
    coverPhoto: "/placeholder.svg?height=600&width=1200",
    agency: "Elite Estates",
    agencyLogo: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviewCount: 110,
    bio: "Specializing in luxury estates and high-end properties, I bring a wealth of knowledge and a passion for excellence to every transaction. My goal is to provide a seamless and enjoyable experience for my clients.",
    specialties: ["Luxury Estates", "Vacation Homes", "High-End Rentals"],
    certifications: [
      "Luxury Home Specialist",
      "Certified International Property Specialist",
    ],
    languages: ["English", "French"],
    areas: ["Hillside", "Coastal"],
    experience: 7,
    transactions: 180,
    propertiesCount: {
      sale: 22,
      rent: 15,
    },
    contactInfo: {
      phone: "(555) 456-7890",
      email: "emily.davis@eliteestates.com",
      office: "789 Pine Avenue, Suite 300",
    },
    socialMedia: {
      linkedin: "https://linkedin.com/in/emilydavis",
      instagram: "https://instagram.com/emilydavisluxury",
    },
    verified: true,
    featured: true,
    awards: ["Luxury Agent of the Year 2022"],
  },
  {
    id: "4",
    name: "James Brown",
    title: "Investment Property Advisor",
    photo: "/user.jpg",
    coverPhoto: "/placeholder.svg?height=600&width=1200",
    agency: "Smart Investments Realty",
    agencyLogo: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    reviewCount: 85,
    bio: "With a focus on investment properties, I help clients maximize their returns by identifying lucrative opportunities in the market. My analytical approach and dedication to client success set me apart.",
    specialties: [
      "Investment Properties",
      "Multi-Family Homes",
      "Fix-and-Flip",
    ],
    certifications: ["Certified Investment Property Specialist"],
    languages: ["English"],
    areas: ["Urban", "Suburban"],
    experience: 12,
    transactions: 250,
    propertiesCount: {
      sale: 40,
      rent: 10,
    },
    contactInfo: {
      phone: "(555) 654-3210",
      email: "james.brown@smartinvestments.com",
      office: "321 Oak Street, Suite 500",
    },
    socialMedia: {
      linkedin: "https://linkedin.com/in/jamesbrown",
      facebook: "https://facebook.com/jamesbrownrealty",
    },
    verified: false,
    featured: false,
    awards: ["Investor's Choice Award 2020"],
  },
];

export default function AgentProfilePage() {
  const { id } = useParams();
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Cover Photo */}
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src={agent.coverPhoto || "/placeholder.svg"}
            alt={`${agent.name} cover`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        {/* Agent Profile Header */}
        <div className="container relative -mt-24 flex flex-col mx-auto justify-center px-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Agent Photo */}
                <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-lg overflow-hidden border-4 border-white shadow-md mx-auto md:mx-0">
                  <Image
                    src={agent.photo || "/placeholder.svg"}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Agent Info */}
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold">
                          {agent.name}
                        </h1>
                        {agent.verified && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                        {agent.featured && (
                          <Badge className="ml-2 bg-primary">
                            <Award className="h-3 w-3 mr-1" />
                            Top Agent
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 mt-1">{agent.title}</p>
                    </div>

                    <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
                      <div className="flex items-center mr-4">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-bold">{agent.rating}</span>
                        <span className="text-gray-500 ml-1">
                          ({agent.reviewCount})
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 relative mr-2">
                        <Image
                          src={agent.agencyLogo || "/placeholder.svg"}
                          alt={agent.agency}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>{agent.agency}</span>
                    </div>

                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{agent.areas.join(", ")}</span>
                    </div>

                    <div className="flex items-center text-gray-500">
                      <Languages className="h-4 w-4 mr-1" />
                      <span>{agent.languages.join(", ")}</span>
                    </div>

                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{agent.experience} years experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Content */}
        <div className="container mt-8 flex flex-col mx-auto justify-center px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="w-full">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <div className="bg-white rounded-lg border border-[#dddd] p-6">
                    <h2 className="text-xl font-bold mb-4">
                      About {agent.name}
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {agent.bio}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-[#16a249]" />
                          Specialties
                        </h3>
                        <ul className="space-y-2">
                          {agent.specialties.map((specialty) => (
                            <li key={specialty} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-[#16a249] mr-2" />
                              {specialty}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-[#16a249]" />
                          Certifications
                        </h3>
                        <ul className="space-y-2">
                          {agent.certifications.map((certification) => (
                            <li
                              key={certification}
                              className="flex items-center"
                            >
                              <CheckCircle className="h-4 w-4 text-[#16a249] mr-2" />
                              {certification}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#b6b3b3]">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <User className="h-6 w-6 mx-auto mb-2 text-[#16a249]" />
                        <p className="text-2xl font-bold">{agent.experience}</p>
                        <p className="text-gray-500 text-sm">
                          Years Experience
                        </p>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Home className="h-6 w-6 mx-auto mb-2 text-[#16a249]" />
                        <p className="text-2xl font-bold">
                          {agent.transactions}
                        </p>
                        <p className="text-gray-500 text-sm">Transactions</p>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <ThumbsUp className="h-6 w-6 mx-auto mb-2 text-[#16a249]" />
                        <p className="text-2xl font-bold">{agent.rating}</p>
                        <p className="text-gray-500 text-sm">Average Rating</p>
                      </div>
                    </div>

                    {agent.awards.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-[#b6b3b3]">
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-[#16a249]" />
                          Awards & Recognition
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {agent.awards.map((award) => (
                            <Badge
                              key={award}
                              variant="secondary"
                              className="px-3 py-1"
                            >
                              {award}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="properties" className="mt-6">
                  <AgentProperties agentId={agent.id} />
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <AgentReviews agentId={agent.id} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-[#dddd] p-6 sticky top-20">
                <h3 className="text-lg font-bold mb-4">Contact {agent.name}</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{agent.contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{agent.contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Office</p>
                      <p>{agent.contactInfo.office}</p>
                    </div>
                  </div>
                </div>

                <AgentContact agent={agent} />

                <div className="mt-6 pt-6 border-t border-[#dddd]">
                  <h4 className="font-medium mb-3">Current Listings</h4>
                  <div className="flex justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1 text-gray-500" />
                      <span>For Sale: {agent.propertiesCount.sale}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1 text-gray-500" />
                      <span>For Rent: {agent.propertiesCount.rent}</span>
                    </div>
                  </div>

                  <Link href={`/agents/${agent.id}/properties`}>
                    <Button variant="outline" className="w-full">
                      View All Properties
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
