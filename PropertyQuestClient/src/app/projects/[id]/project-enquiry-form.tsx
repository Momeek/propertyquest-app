"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectEnquiryFormProps {
  projectName: string;
}

export default function ProjectEnquiryForm({
  projectName,
}: ProjectEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, enquiryType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      // Reset form or show success message
    }, 1000);
  };

  return (
    <div className="mt-6 pt-6 border-t border-[#b6b3b3]">
      <h4 className="font-medium mb-4">Interested in this project?</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Select onValueChange={handleSelectChange} value={formData.enquiryType}>
          <SelectTrigger>
            <SelectValue placeholder="Enquiry Type" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#dddd]">
            <SelectItem className="hover:text-[#16a249]" value="general">
              General Enquiry
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="pricing">
              Pricing Information
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="viewing">
              Schedule Viewing
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="investment">
              Investment Opportunity
            </SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          name="message"
          placeholder={`I'm interested in ${projectName}...`}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="border-[#b6b3b3]"
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Request Information"}
        </Button>
      </form>
    </div>
  );
}
