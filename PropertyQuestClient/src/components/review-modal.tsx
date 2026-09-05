"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  agentName,
}: ReviewModalProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [propertyType, setPropertyType] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Review submitted:", {
        name,
        date,
        propertyType,
        review,
        rating,
      });
      setIsSubmitting(false);
      resetForm();
      onClose();
      // Here you would typically handle the submission to your backend
    }, 1000);
  };

  const resetForm = () => {
    setName("");
    setDate(undefined);
    setPropertyType("");
    setReview("");
    setRating(5);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review for {agentName}</DialogTitle>
          <DialogDescription>
            Share your experience working with this agent to help others make
            informed decisions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date of Interaction</Label>
            <Input
              type="date"
              id="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) => setDate(new Date(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              value={propertyType}
              onValueChange={setPropertyType}
              required
            >
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#dddd]">
                <SelectItem
                  className="hover:text-[#16a249]"
                  value="single-family"
                >
                  Single-Family Home
                </SelectItem>
                <SelectItem className="hover:text-[#16a249]" value="condo">
                  Condominium
                </SelectItem>
                <SelectItem className="hover:text-[#16a249]" value="townhouse">
                  Townhouse
                </SelectItem>
                <SelectItem className="hover:text-[#16a249]" value="apartment">
                  Apartment
                </SelectItem>
                <SelectItem className="hover:text-[#16a249]" value="luxury">
                  Luxury Property
                </SelectItem>
                <SelectItem className="hover:text-[#16a249]" value="commercial">
                  Commercial Property
                </SelectItem>
                <SelectItem className="hover:text-[#16a249]" value="land">
                  Land
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= rating ? "currentColor" : "none"}
                    stroke={star <= rating ? "none" : "currentColor"}
                    className={`h-8 w-8 ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience working with this agent..."
              rows={5}
              required
              className="border-[#dddd]"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
