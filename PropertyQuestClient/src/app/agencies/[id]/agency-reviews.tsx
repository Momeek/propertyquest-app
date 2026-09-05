import Image from "next/image"
import { Star, ThumbsUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface AgencyReviewsProps {
  agencyId: string
}

// This would typically come from an API based on the agency ID
const getAgencyReviews = (agencyId: string) => {
  console.log(agencyId)
  // Sample data - in a real app, this would be filtered by agency from a database
  const reviews = [
    {
      id: "r1",
      clientName: "Jennifer Adams",
      clientImage: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "March 15, 2023",
      text: "Working with Luxury Homes Realty was an exceptional experience from start to finish. Their team of professionals guided us through every step of the buying process with expertise and patience. The agent assigned to us took the time to understand our needs and preferences, showing us properties that perfectly matched our criteria. We found our dream home much faster than expected, and the negotiation process was handled skillfully. I highly recommend their services to anyone looking for a premium real estate experience.",
      propertyType: "Single-Family Home",
      helpful: 12,
    },
    {
      id: "r2",
      clientName: "David Wilson",
      clientImage: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "February 8, 2023",
      text: "I recently sold my property through Luxury Homes Realty and couldn't be more satisfied with the results. Their marketing strategy was impressive, with professional photography, virtual tours, and targeted advertising that attracted numerous potential buyers. The property sold above asking price in less than two weeks! The entire team was responsive, professional, and made what could have been a stressful process smooth and straightforward. Their market knowledge and negotiation skills are truly outstanding.",
      propertyType: "Luxury Condo",
      helpful: 8,
    },
    {
      id: "r3",
      clientName: "Michael Brown",
      clientImage: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "January 22, 2023",
      text: "Overall a positive experience with Luxury Homes Realty. Their agents are knowledgeable and professional, and they have an excellent selection of high-end properties. The only reason I'm not giving five stars is that communication was occasionally delayed during the process. However, they did successfully help us find a beautiful property that met all our requirements, and the closing process was handled efficiently. I would recommend them with the minor caveat about communication.",
      propertyType: "Townhouse",
      helpful: 5,
    },
    {
      id: "r4",
      clientName: "Sarah Johnson",
      clientImage: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "December 10, 2022",
      text: "As first-time homebuyers, we were initially intimidated by the process, but Luxury Homes Realty made it surprisingly easy and even enjoyable. Our agent was patient, educational, and never pushy. They explained each step clearly and advocated for our interests throughout the negotiation. The agency has excellent relationships with lenders, inspectors, and other professionals, which helped streamline the entire process. We're now happily settled in our new home and wouldn't hesitate to work with them again in the future.",
      propertyType: "Condominium",
      helpful: 10,
    },
  ]

  return reviews
}

export default function AgencyReviews({ agencyId }: AgencyReviewsProps) {
  const reviews = getAgencyReviews(agencyId)

  // Calculate rating statistics
  const totalReviews = reviews.length
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++
  })
  const ratingPercentages = ratingCounts.map((count) => (count / totalReviews) * 100)

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-bold mb-6">Client Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-500">{totalReviews} reviews</p>
        </div>

        <div className="md:col-span-2">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center mb-2">
              <div className="w-12 text-sm font-medium">{rating} stars</div>
              <div className="flex-grow mx-3">
                <Progress value={ratingPercentages[4 - index]} className="h-2" />
              </div>
              <div className="w-12 text-sm text-gray-500 text-right">
                {ratingCounts[4 - index]} ({Math.round(ratingPercentages[4 - index])}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={review.clientImage || "/placeholder.svg"}
                    alt={review.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{review.clientName}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700 mb-3">{review.text}</p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Property Type: {review.propertyType}</span>
              <Button variant="ghost" size="sm" className="text-gray-500 gap-1">
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpful})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="mt-8 text-center">
        <Button>Write a Review</Button>
      </div>
    </div>
  )
}
