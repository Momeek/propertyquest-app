"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Users,
  MapPin,
  Building,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Share2,
  Award,
  CheckCircle,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  ArrowLeft,
} from "lucide-react"
import AgencyTabs from "./agency-tabs"

// This would typically come from a database or API
const agencies = [
  {
    id: "1",
    name: "Luxury Homes Realty",
    logo: "/agency-logo.png",
    coverImage: "/placeholder.svg?height=600&width=1200",
    rating: 4.8,
    reviewCount: 324,
    agentCount: 45,
    established: 2005,
    description:
      "Luxury Homes Realty is a premier real estate agency specializing in high-end properties across the most desirable neighborhoods. With over 15 years of experience, our team of expert agents is dedicated to providing exceptional service and finding the perfect property for our discerning clients. We pride ourselves on our deep market knowledge, personalized approach, and commitment to excellence in every transaction.",
    locations: ["Downtown", "Uptown", "Beachfront"],
    specialties: ["Luxury", "Residential", "Commercial"],
    propertiesCount: {
      sale: 128,
      rent: 76,
    },
    awards: ["Best Luxury Agency 2022", "Top Seller Award 2021", "Customer Service Excellence 2020"],
    certifications: [
      "Licensed Real Estate Brokerage",
      "National Association of Realtors",
      "Luxury Home Marketing Specialist",
    ],
    contactInfo: {
      phone: "(555) 123-4567",
      email: "info@luxuryhomesrealty.com",
      address: "123 Prestige Avenue, Suite 500, Metro City",
      website: "www.luxuryhomesrealty.com",
    },
    socialMedia: {
      facebook: "https://facebook.com/luxuryhomesrealty",
      instagram: "https://instagram.com/luxuryhomesrealty",
      linkedin: "https://linkedin.com/company/luxuryhomesrealty",
    },
    verified: true,
    featured: true,
  },
  {
    id: "2",
    name: "City Properties Group",
    logo: "/agency-logo.png",
    coverImage: "/placeholder.svg?height=600&width=1200",
    rating: 4.7,
    reviewCount: 286,
    agentCount: 38,
    established: 2008,
    description:
      "City Properties Group is a full-service real estate agency focused on urban properties and new developments. Since 2008, we've helped thousands of clients buy, sell, and rent properties throughout the metropolitan area. Our team specializes in condos, apartments, and townhouses, with particular expertise in first-time buyers and urban living. We combine innovative technology with personalized service to make your real estate experience seamless and successful.",
    locations: ["Downtown", "Midtown", "Suburbs"],
    specialties: ["Residential", "New Developments", "Urban Living"],
    propertiesCount: {
      sale: 95,
      rent: 142,
    },
    awards: ["Top Urban Agency 2022", "Best in Customer Satisfaction 2021"],
    certifications: ["Licensed Real Estate Brokerage", "Urban Development Specialist", "Green Building Certified"],
    contactInfo: {
      phone: "(555) 987-6543",
      email: "info@citypropertiesgroup.com",
      address: "456 Urban Street, Floor 12, Metro City",
      website: "www.citypropertiesgroup.com",
    },
    socialMedia: {
      facebook: "https://facebook.com/citypropertiesgroup",
      instagram: "https://instagram.com/citypropertiesgroup",
      linkedin: "https://linkedin.com/company/citypropertiesgroup",
    },
    verified: true,
    featured: false,
  },
  {
    id: "3",
    name: "Investment Properties Inc.",
    logo: "/agency-logo.png",
    coverImage: "/placeholder.svg?height=600&width=1200",
    rating: 4.9,
    reviewCount: 198,
    agentCount: 22,
    established: 2010,
    description:
      "Investment Properties Inc. specializes in commercial real estate and investment opportunities. Our team of experienced brokers focuses on helping investors identify profitable properties, from office buildings and retail spaces to industrial facilities and multi-family units. With a data-driven approach and deep market analysis, we provide our clients with the insights they need to make informed investment decisions and maximize their returns.",
    locations: ["Financial District", "Commercial Zone", "Industrial Park"],
    specialties: ["Investment", "Commercial", "Industrial", "Multi-Family"],
    propertiesCount: {
      sale: 87,
      rent: 34,
    },
    awards: ["Commercial Broker of the Year 2022", "Investment Advisory Excellence 2021"],
    certifications: [
      "Licensed Commercial Brokerage",
      "Certified Commercial Investment Member",
      "Society of Industrial and Office Realtors",
    ],
    contactInfo: {
      phone: "(555) 456-7890",
      email: "info@investmentpropertiesinc.com",
      address: "789 Business Boulevard, Tower 3, Metro City",
      website: "www.investmentpropertiesinc.com",
    },
    socialMedia: {
      facebook: "https://facebook.com/investmentpropertiesinc",
      instagram: "https://instagram.com/investmentpropertiesinc",
      linkedin: "https://linkedin.com/company/investmentpropertiesinc",
    },
    verified: true,
    featured: true,
  },
]

export default function AgencyDetailPage() {
  const { id } = useParams();
  const agency = agencies.find((a) => a.id === id)

  if (!agency) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={agency.coverImage || "/placeholder.svg"}
          alt={`${agency.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Agency Profile Header */}
      <div className="container relative -mt-24 flex flex-col mx-auto justify-center px-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <Link href="/agencies" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all agencies
            </Link>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Agency Logo */}
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-lg overflow-hidden border-4 border-white shadow-md mx-auto md:mx-0">
                <Image
                  src={agency.logo || "/placeholder.svg"}
                  alt={agency.name}
                  fill
                  className="object-contain bg-white p-2"
                />
              </div>

              {/* Agency Info */}
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold">{agency.name}</h1>
                      {agency.verified && <CheckCircle className="h-5 w-5 text-blue-500" />}
                      {agency.featured && (
                        <Badge className="ml-2 bg-primary">
                          <Award className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-bold">{agency.rating}</span>
                      <span className="text-gray-500 ml-1">({agency.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
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
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{agency.agentCount} Agents</span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Established {agency.established}</span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{agency.locations.join(", ")}</span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{agency.propertiesCount.sale + agency.propertiesCount.rent} Properties</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agency Content */}
      <div className="container mt-8 flex flex-col mx-auto justify-center px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AgencyTabs agency={agency} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-20">
              <h3 className="text-lg font-bold mb-4">Contact {agency.name}</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{agency.contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{agency.contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{agency.contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a
                      href={`https://${agency.contactInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {agency.contactInfo.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                <a
                  href={agency.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </a>
                <a
                  href={agency.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Instagram className="h-5 w-5 text-pink-600" />
                </a>
                <a
                  href={agency.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </a>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Current Listings</h4>
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-gray-500" />
                    <span>For Sale: {agency.propertiesCount.sale}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-gray-500" />
                    <span>For Rent: {agency.propertiesCount.rent}</span>
                  </div>
                </div>

                <Link href={`/agencies/${agency.id}/properties`}>
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
  )
}
