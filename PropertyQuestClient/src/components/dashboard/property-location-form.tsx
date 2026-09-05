"use client";
import React from "react";
import { useState, useEffect } from "react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { MapPin } from "lucide-react";
import { PropertyAttr } from "@/interfaces/property.interface";

interface PropertyLocationFormProps {
  data?: Partial<PropertyAttr["location"]>;
  updateData: (data: Partial<PropertyAttr["location"]>) => void;
  onNext: () => void;
  onPrevious: () => void;
  saveDraft: () => void;
}

export default function PropertyLocationForm({
  data = {},
  updateData,
  onNext,
  onPrevious,
  saveDraft,
}: PropertyLocationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    country: data?.country || "",
    city: data?.city || "",
    neighborhood: data?.neighborhood || "",
    zipCode: data?.zipCode || "",
    address: data?.address || "",
    latitude: data?.latitude || 0,
    longitude: data?.longitude || 0,
    locationDescription: data?.locationDescription || "",
    nearbyPlaces: data?.nearbyPlaces || {
      school: "",
      shopping: "",
      transportation: "",
      park: "",
    },
  });

  useEffect(() => {
    if (data) {
      setFormData({
        country: data.country || "",
        city: data.city || "",
        neighborhood: data.neighborhood || "",
        zipCode: data.zipCode || "",
        address: data.address || "",
        latitude: data?.latitude || 0,
        longitude: data?.longitude || 0,
        locationDescription: data.locationDescription || "",
        nearbyPlaces: data.nearbyPlaces || {
          school: "",
          shopping: "",
          transportation: "",
          park: "",
        },
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateData(formData);
    onNext();
  };

  const handleSaveDraft = () => {
    updateData(formData);
    saveDraft();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            value={formData?.country}
            onValueChange={(value) => handleSelectChange("country", value)}
            required
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#dddd]">
              <SelectItem value="Nigeria">Nigeria</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData?.city}
            onChange={handleChange}
            placeholder="e.g. Abuja"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Neighborhood/Area</Label>
          <Input
            id="neighborhood"
            name="neighborhood"
            value={formData?.neighborhood}
            onChange={handleChange}
            placeholder="e.g. Maitama"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip/Postal Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData?.zipCode}
            onChange={handleChange}
            placeholder="e.g. 10001"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="locationDescription">
          Neighborhood/Area Description
        </Label>
        <Textarea
          id="locationDescription"
          name="locationDescription"
          placeholder="Describe the neighborhood, nearby amenities, etc."
          value={formData?.locationDescription}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous: Media
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Next: Pricing"}
          </Button>
        </div>
      </div>
    </form>
  );
}
