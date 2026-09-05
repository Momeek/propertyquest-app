"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ThumbsUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import ReviewModal from "@/components/review-modal";

interface Review {
  id: string;
  clientName: string;
  clientImage: string;
  rating: number;
  date: string;
  text: string;
  propertyType: string;
  helpful: number;
}

// This would typically come from an API based on the agent ID
const agentReviews: Review[] = [
  {
    id: "1",
    clientName: "Jennifer Adams",
    clientImage: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "March 15, 2023",
    text: "Sarah was incredible throughout our entire home buying process. Her knowledge of the local market helped us find the perfect property in our desired neighborhood. She negotiated skillfully and was always available to answer our questions. I couldn't recommend her more highly!",
    propertyType: "Single-Family Home",
    helpful: 12,
  },
  {
    id: "2",
    clientName: "David Wilson",
    clientImage: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "February 8, 2023",
    text: "Working with Sarah to find our dream home was a fantastic experience. She listened carefully to our needs and showed us properties that perfectly matched our criteria. Her expertise in the negotiation process saved us thousands of dollars. She was professional, responsive, and made the entire process smooth and stress-free.",
    propertyType: "Luxury Condo",
    helpful: 8,
  },
  {
    id: "3",
    clientName: "Michael Brown",
    clientImage: "/placeholder.svg?height=100&width=100",
    rating: 4,
    date: "January 22, 2023",
    text: "Sarah helped us sell our home for above asking price in less than a week! Her marketing strategy and staging advice were spot on. She was always available to answer questions and guided us through every step of the process. The only small issue was some delay in paperwork, but overall a great experience.",
    propertyType: "Townhouse",
    helpful: 5,
  },
];

// Calculate rating statistics
const totalReviews = agentReviews.length;
const averageRating =
  agentReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
const ratingCounts = [0, 0, 0, 0, 0];
agentReviews.forEach((review) => {
  ratingCounts[review.rating - 1]++;
});
const ratingPercentages = ratingCounts.map(
  (count) => (count / totalReviews) * 100
);

export default function AgentReviews({ agentId }: { agentId: string }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Find the agent name based on the agentId
  // This is a simplified version - in a real app, you'd fetch this data
  const agentName = "Sarah Johnson"; // Placeholder name
  console.log({ agentId });
  return (
    <div className="bg-white rounded-lg border border-[#dddd] p-6">
      <h2 className="text-xl font-bold mb-6">Client Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-primary mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
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
                <Progress
                  value={ratingPercentages[4 - index]}
                  className="h-2"
                />
              </div>
              <div className="w-12 text-sm text-gray-500 text-right">
                {ratingCounts[4 - index]} (
                {Math.round(ratingPercentages[4 - index])}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {agentReviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-6 last:border-b-0 border-[#dddd] last:pb-0"
          >
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
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700 mb-3">{review.text}</p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Property Type: {review.propertyType}
              </span>
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
        <Button onClick={() => setIsReviewModalOpen(true)}>
          Write a Review
        </Button>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        agentName={agentName}
      />
    </div>
  );
}
