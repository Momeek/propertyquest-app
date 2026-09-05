import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  clientImage: string;
  agentName: string;
  agentImage: string;
  rating: number;
  text: string;
  propertyType: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    clientName: "Jennifer Adams",
    clientImage: "/user.jpg",
    agentName: "Sarah Johnson",
    agentImage: "/user.jpg",
    rating: 5,
    text: "Sarah was incredible throughout our entire home buying process. Her knowledge of the local market helped us find the perfect property in our desired neighborhood. She negotiated skillfully and was always available to answer our questions. I couldn't recommend her more highly!",
    propertyType: "Single-Family Home",
    date: "March 2023",
  },
  {
    id: "2",
    clientName: "Robert Chen",
    clientImage: "/user.jpg",
    agentName: "Michael Chen",
    agentImage: "/user.jpg",
    rating: 5,
    text: "Working with Michael to sell our downtown condo was a fantastic experience. His marketing strategy and staging advice helped us receive multiple offers above asking price within the first week. His communication was excellent, and he made the entire process stress-free.",
    propertyType: "Condominium",
    date: "January 2023",
  },
  {
    id: "3",
    clientName: "Maria Garcia",
    clientImage: "/user.jpg",
    agentName: "Emma Rodriguez",
    agentImage: "/user.jpg",
    rating: 5,
    text: "Emma helped us find our dream beachfront property. Her patience and understanding of our specific needs made all the difference. She showed us properties that perfectly matched our criteria and helped us navigate a competitive bidding situation. We're so grateful for her expertise!",
    propertyType: "Beach House",
    date: "February 2023",
  },
];

export default function AgentTestimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="h-full">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={testimonial.clientImage || "/placeholder.svg"}
                    alt={testimonial.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.clientName}</p>
                  <p className="text-xs text-gray-500">{testimonial.date}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative mb-6 mt-2">
              <Quote className="h-8 w-8 text-gray-200 absolute -top-2 -left-2 -z-10" />
              <p className="text-gray-700 text-sm leading-relaxed">
                {testimonial.text}
              </p>
            </div>

            <div className="pt-4 border-t border-[#b6b3b3] flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src={testimonial.agentImage || "/placeholder.svg"}
                    alt={testimonial.agentName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Agent</p>
                  <p className="text-sm font-medium">{testimonial.agentName}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {testimonial.propertyType}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
