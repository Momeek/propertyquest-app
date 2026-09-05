"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyAttr, PropertyType } from "@/interfaces/property.interface";
import { X } from "lucide-react";

interface PropertyDetailsFormProps {
  data?: Partial<PropertyAttr["details"]>;
  updateData: (data: Partial<PropertyAttr["details"]>) => void;
  onNext: () => void;
  saveDraft: () => void;
}

export default function PropertyDetailsForm({
  data = {},
  updateData,
  onNext,
  saveDraft,
}: PropertyDetailsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomBedrooms, setShowCustomBedrooms] = useState(false);
  const [showCustomBathrooms, setShowCustomBathrooms] = useState(false);
  const [customBedrooms, setCustomBedrooms] = useState("");
  const [customBathrooms, setCustomBathrooms] = useState("");
  const [customFeature, setCustomFeature] = useState("");
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<PropertyAttr["details"]>>({
    title: data?.title || "",
    propertyType: (data?.propertyType as PropertyType) || undefined,
    listingType: data?.listingType || "sale",
    status: data?.status || "",
    bedrooms: data?.bedrooms || "",
    bathrooms: data?.bathrooms || "",
    area_sq_ft: data?.area_sq_ft || 0,
    yearBuilt: data?.yearBuilt || 0,
    description: data?.description || "",
    features: data?.features || {},
  });

  useEffect(() => {
    if (data) {
      const bedrooms = data?.bedrooms || "";
      const bathrooms = data?.bathrooms || "";

      setFormData({
        title: data?.title || "",
        propertyType: (data?.propertyType as PropertyType) || undefined,
        listingType: data?.listingType || "sale",
        status: data?.status || "",
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        area_sq_ft: data?.area_sq_ft || 0,
        yearBuilt: data?.yearBuilt || 0,
        description: data?.description || "",
        features: data?.features || {},
      });

      // Show custom input if value is 5 or greater
      if (bedrooms && parseInt(bedrooms) >= 5) {
        setShowCustomBedrooms(true);
        setCustomBedrooms(bedrooms);
      }
      if (bathrooms && parseInt(bathrooms) >= 5) {
        setShowCustomBathrooms(true);
        setCustomBathrooms(bathrooms);
      }

      // Extract custom features from features object
      const defaultFeatures = [
        "parking",
        "airConditioning",
        "balcony",
        "pool",
        "gym",
        "security",
        "furnished",
        "elevator",
        "garden",
      ];

      const customFeaturesList: string[] = [];
      if (data.features) {
        Object.keys(data.features).forEach((feature) => {
          if (!defaultFeatures.includes(feature) && data.features?.[feature]) {
            customFeaturesList.push(feature);
          }
        });
        setCustomFeatures(customFeaturesList);
      }
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
    if (name === "bedrooms") {
      if (value === "5") {
        setShowCustomBedrooms(true);
        setCustomBedrooms("5"); // Start with 5 as default
        setFormData((prev) => ({
          ...prev,
          bedrooms: "5",
        }));
      } else {
        setShowCustomBedrooms(false);
        setFormData((prev) => ({
          ...prev,
          bedrooms: value,
        }));
      }
    } else if (name === "bathrooms") {
      if (value === "5") {
        setShowCustomBathrooms(true);
        setCustomBathrooms("5"); // Start with 5 as default
        setFormData((prev) => ({
          ...prev,
          bathrooms: "5",
        }));
      } else {
        setShowCustomBathrooms(false);
        setFormData((prev) => ({
          ...prev,
          bathrooms: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "propertyType" ? (value as PropertyType) : value,
      }));
    }
  };

  const handleCustomBedroomsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomBedrooms(value);
    setFormData((prev) => ({
      ...prev,
      bedrooms: value,
    }));
  };

  const handleCustomBathroomsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomBathrooms(value);
    setFormData((prev) => ({
      ...prev,
      bathrooms: value,
    }));
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev?.features,
        [feature]: checked,
      },
    }));
  };

  const handleAddCustomFeature = () => {
    if (
      customFeature.trim() &&
      !customFeatures.includes(customFeature.trim())
    ) {
      const newFeature = customFeature.trim();
      const updatedCustomFeatures = [...customFeatures, newFeature];
      setCustomFeatures(updatedCustomFeatures);

      // Also add to formData features
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev?.features,
          [newFeature]: true,
        },
      }));

      setCustomFeature("");
    }
  };

  const handleRemoveCustomFeature = (feature: string) => {
    const updatedCustomFeatures = customFeatures.filter((f) => f !== feature);
    setCustomFeatures(updatedCustomFeatures);

    // Also remove from formData features
    setFormData((prev) => {
      const updatedFeatures = { ...prev?.features };
      delete updatedFeatures[feature];
      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomFeature();
    }
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
          <Label htmlFor="title">Property Title</Label>
          <Input
            id="title"
            name="title"
            value={formData?.title}
            onChange={handleChange}
            placeholder="e.g. Modern Apartment with City View"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            value={formData?.propertyType}
            onValueChange={(value) => handleSelectChange("propertyType", value)}
            required
          >
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#dddd]">
              <SelectItem value="offPlan_projects">Off plan</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="terraces">Terrace</SelectItem>
              <SelectItem value="duplexes">Duplexe</SelectItem>
              <SelectItem value="lands">Land</SelectItem>
              <SelectItem value="commercial_properties">Commercial</SelectItem>
              <SelectItem value="self_contain">Self Contain</SelectItem>
              <SelectItem value="mansions">Mansions</SelectItem>
              <SelectItem value="office_spaces">office Space</SelectItem>
              <SelectItem value="flats/apartments">Flats/Apartment</SelectItem>
              <SelectItem value="shop">Shop</SelectItem>
              <SelectItem value="studio_apartment">Studio Apartment</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="shared_apartment">Shared Apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="listingType">Listing Type</Label>
          <Select
            value={formData?.listingType}
            onValueChange={(value) => handleSelectChange("listingType", value)}
            required
          >
            <SelectTrigger id="listingType">
              <SelectValue placeholder="Select listing type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#dddd]">
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Property Status</Label>
          <Select
            value={formData?.status}
            onValueChange={(value) => handleSelectChange("status", value)}
            required
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#dddd]">
              <SelectItem value="ready">Ready to Move</SelectItem>
              <SelectItem value="under_construction">
                Under Construction
              </SelectItem>
              <SelectItem value="offPlan">Off Plan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select
            value={showCustomBedrooms ? "5" : formData?.bedrooms}
            onValueChange={(value) => handleSelectChange("bedrooms", value)}
            required
          >
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Select number of bedrooms" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#dddd]">
              <SelectItem value="0">Studio</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4">4 Bedrooms</SelectItem>
              <SelectItem value="5">5+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
          {showCustomBedrooms && (
            <div className="mt-2">
              <Input
                type="number"
                placeholder="Enter number of bedrooms (5 or more)"
                value={customBedrooms}
                onChange={handleCustomBedroomsChange}
                min="5"
                required
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Select
            value={showCustomBathrooms ? "5" : formData?.bathrooms}
            onValueChange={(value) => handleSelectChange("bathrooms", value)}
            required
          >
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Select number of bathrooms" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#dddd]">
              <SelectItem value="1">1 Bathroom</SelectItem>
              <SelectItem value="2">2 Bathrooms</SelectItem>
              <SelectItem value="3">3 Bathrooms</SelectItem>
              <SelectItem value="4">4 Bathrooms</SelectItem>
              <SelectItem value="5">5+ Bathrooms</SelectItem>
            </SelectContent>
          </Select>
          {showCustomBathrooms && (
            <div className="mt-2">
              <Input
                type="number"
                placeholder="Enter number of bathrooms (5 or more)"
                value={customBathrooms}
                onChange={handleCustomBathroomsChange}
                min="5"
                required
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area (sq ft)</Label>
          <Input
            id="area_sq_ft"
            name="area_sq_ft"
            value={formData?.area_sq_ft}
            onChange={handleChange}
            type="number"
            placeholder="e.g. 1200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearBuilt">Year Built</Label>
          <Input
            id="yearBuilt"
            name="yearBuilt"
            value={formData?.yearBuilt}
            onChange={handleChange}
            type="number"
            placeholder="e.g. 2020"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData?.description}
          onChange={handleChange}
          placeholder="Describe your property in detail..."
          rows={6}
          required
          className="border border-[#dddd]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Features & Amenities</h3>

        {/* Default Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-600">
            Default Features
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "parking",
              "airConditioning",
              "balcony",
              "pool",
              "gym",
              "security",
              "furnished",
              "elevator",
              "garden",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={!!formData?.features?.[feature]}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle(feature, !!checked)
                  }
                />
                <Label htmlFor={feature} className="text-sm">
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-600">
            Additional Features
          </h4>
          <div className="flex gap-2">
            <Input
              placeholder="Add custom feature (e.g. Fireplace, Jacuzzi, etc.)"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCustomFeature}
              disabled={!customFeature.trim()}
            >
              Add
            </Button>
          </div>

          {/* Display Custom Features */}
          {customFeatures.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {customFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomFeature(feature)}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={handleSaveDraft}>
          Save as Draft
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Next: Media"}
        </Button>
      </div>
    </form>
  );
}