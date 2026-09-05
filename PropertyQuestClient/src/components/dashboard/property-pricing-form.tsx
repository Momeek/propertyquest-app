"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyAttr } from "@/interfaces/property.interface";
import { formatAmount } from "@/utils/utils";

interface PropertyPricingFormProps {
  data?: Partial<PropertyAttr["pricing"]>;
  updateData: (data: Partial<PropertyAttr["pricing"]>) => void;
  onPrevious: () => void;
  onSubmit: () => void;
  saveDraft: () => void;
  isEditing?: boolean;
}

export default function PropertyPricingForm({
  data = {},
  updateData,
  onPrevious,
  onSubmit,
  saveDraft,
  isEditing = false,
}: PropertyPricingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingType, setListingType] = useState("sale");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedRentPrice, setFormattedRentPrice] = useState("");
  const [formattedSecurityDeposit, setFormattedSecurityDeposit] = useState("");
  const [formattedPricePerSqFt, setFormattedPricePerSqFt] = useState("");

  // Format price values on component mount and when data changes
  useEffect(() => {
    if (data?.price) {
      setFormattedPrice(formatNumberWithCommas(data.price.toString()));
    } else {
      setFormattedPrice("");
    }

    if (data?.rentPrice) {
      setFormattedRentPrice(formatNumberWithCommas(data.rentPrice.toString()));
    } else {
      setFormattedRentPrice("");
    }

    if (data?.securityDeposit) {
      setFormattedSecurityDeposit(
        formatNumberWithCommas(data.securityDeposit.toString())
      );
    } else {
      setFormattedSecurityDeposit("");
    }

    if (data?.pricePerSqFt) {
      setFormattedPricePerSqFt(
        formatNumberWithCommas(data.pricePerSqFt.toString())
      );
    } else {
      setFormattedPricePerSqFt("");
    }
  }, [data]);

  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-digit characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, "");

    if (!numericValue) return "";

    // Split into whole and decimal parts
    const parts = numericValue.split(".");
    let wholePart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : "";

    // Add commas to whole number part
    wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return wholePart + decimalPart;
  };

  const parseFormattedNumber = (formattedValue: string): number => {
    // Remove commas and convert to number
    const numericString = formattedValue.replace(/,/g, "");
    return numericString ? parseFloat(numericString) : 0;
  };

  const handlePriceChange = (field: string, formattedValue: string) => {
    const numericValue = parseFormattedNumber(formattedValue);

    // Update the formatted display value
    switch (field) {
      case "price":
        setFormattedPrice(formattedValue);
        break;
      case "rentPrice":
        setFormattedRentPrice(formattedValue);
        break;
      case "securityDeposit":
        setFormattedSecurityDeposit(formattedValue);
        break;
      case "pricePerSqFt":
        setFormattedPricePerSqFt(formattedValue);
        break;
    }

    // Update the actual data with numeric value
    updateData({
      ...data,
      [field]: numericValue,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = formatNumberWithCommas(value);

    handlePriceChange(name, formattedValue);
  };

  const handleSelectChange = (name: string, value: string) => {
    updateData({
      ...data,
      [name]: value,
    });
  };

  const handleListingTypeChange = (value: string) => {
    setListingType(value);
    // Don't update listingType in pricing data since it's not part of the pricing interface
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit();
  };

  const handleSaveDraft = () => {
    saveDraft();
  };

  // Helper function to safely format amounts
  const safeFormatAmount = (amount: number | undefined): string => {
    return amount ? formatAmount(amount) : formatAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="listingType">Listing Type</Label>
        <Select
          value={listingType}
          onValueChange={handleListingTypeChange}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listingType === "sale" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={formattedPrice}
                onChange={handleInputChange}
                placeholder="e.g. 450,000"
                required
              />
              {data?.price && data.price > 0 && (
                <p className="text-sm text-gray-500">
                  {safeFormatAmount(data.price)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerSqFt">Price per sq ft</Label>
              <Input
                id="pricePerSqFt"
                name="pricePerSqFt"
                value={formattedPricePerSqFt}
                onChange={handleInputChange}
                placeholder="e.g. 3,500"
              />
              {data?.pricePerSqFt && data.pricePerSqFt > 0 && (
                <p className="text-sm text-gray-500">
                  {safeFormatAmount(data.pricePerSqFt)} per sq ft
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="rentPrice">Monthly Rent</Label>
              <Input
                id="rentPrice"
                name="rentPrice"
                value={formattedRentPrice}
                onChange={handleInputChange}
                placeholder="e.g. 250,000"
                required
              />
              {data?.rentPrice && data.rentPrice > 0 && (
                <p className="text-sm text-gray-500">
                  {safeFormatAmount(data.rentPrice)} per month
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentPeriod">Rental Period</Label>
              <Select
                value={data?.rentPeriod || ""}
                onValueChange={(value) =>
                  handleSelectChange("rentPeriod", value)
                }
              >
                <SelectTrigger id="rentPeriod">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#dddd]">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Security Deposit</Label>
              <Input
                id="securityDeposit"
                name="securityDeposit"
                value={formattedSecurityDeposit}
                onChange={handleInputChange}
                placeholder="e.g. 250,000"
              />
              {data?.securityDeposit && data.securityDeposit > 0 && (
                <p className="text-sm text-gray-500">
                  {safeFormatAmount(data.securityDeposit)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="leaseTerm">Lease Term</Label>
              <Select
                value={data?.leaseTerm || ""}
                onValueChange={(value) =>
                  handleSelectChange("leaseTerm", value)
                }
              >
                <SelectTrigger id="leaseTerm">
                  <SelectValue placeholder="Select lease term" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#dddd]">
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="2years">2+ Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="featured" className="text-base font-medium">
              Featured Listing
            </Label>
            <p className="text-sm text-gray-500">
              Featured listings appear at the top of search results and get more
              visibility
            </p>
          </div>
          <Switch
            id="featured"
            checked={data?.isFeatured || false}
            onCheckedChange={(checked) =>
              updateData({
                ...data,
                isFeatured: checked,
              })
            }
          />
        </div>

        {data?.isFeatured && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm">
              Featured listings use 1 credit from your subscription. You have 3
              featured listings remaining.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 mt-6">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm">
          I confirm that I have the right to list this property and all
          information provided is accurate.
        </Label>
      </div>

      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous: Location
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditing
              ? "Update Listing"
              : "Publish Listing"}
          </Button>
        </div>
      </div>
    </form>
  );
}