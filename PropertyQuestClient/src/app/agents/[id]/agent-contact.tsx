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

interface AgentContactProps {
  agent: {
    name: string;
    id: string;
  };
}

export default function AgentContact({ agent }: AgentContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
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
    setFormData((prev) => ({ ...prev, inquiryType: value }));
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

      <Select onValueChange={handleSelectChange} value={formData.inquiryType}>
        <SelectTrigger>
          <SelectValue placeholder="Inquiry Type" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-[#dddd]">
          <SelectItem
            className="hover:text-[#16a249]"
            value="buying"
          >{`I'm interested in buying`}</SelectItem>
          <SelectItem
            className="hover:text-[#16a249]"
            value="selling"
          >{`I'm interested in selling`}</SelectItem>
          <SelectItem
            className="hover:text-[#16a249]"
            value="renting"
          >{`I'm interested in renting`}</SelectItem>
          <SelectItem className="hover:text-[#16a249]" value="general">
            General inquiry
          </SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        name="message"
        placeholder={`Message for ${agent.name}...`}
        value={formData.message}
        onChange={handleChange}
        rows={4}
        required
        className="border-[#dddd]"
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
