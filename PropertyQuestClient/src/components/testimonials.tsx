import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Buyer",
    avatar: "/user.jpg",
    content:
      "HomeQuest made finding my dream home so easy! The search filters were incredibly helpful, and I was able to schedule viewings right through the app. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Investor",
    avatar: "/user.jpg",
    content:
      "As an investor, I need reliable market data and quick access to new properties. HomeQuest delivers on both fronts. The market insights feature is particularly valuable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "First-time Seller",
    avatar: "/user.jpg",
    content:
      "Selling my first property was daunting, but HomeQuest connected me with an amazing agent who guided me through the entire process. Sold above asking price!",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-[#ffffff] flex justify-center px-6">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Discover why thousands of home buyers, sellers, and investors choose
            PropertyQuest for their real estate needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
