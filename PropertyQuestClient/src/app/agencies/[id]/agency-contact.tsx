"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AgencyContactProps {
  agency: {
    name: string
    id: string
  }
}

export default function AgencyContact({ agency }: AgencyContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      // Reset form or show success message
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />

      <Input
        name="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} />

      <Select onValueChange={handleSelectChange} value={formData.inquiryType}>
        <SelectTrigger>
          <SelectValue placeholder="Inquiry Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="buying">{`I'm interested in buying`}</SelectItem>
          <SelectItem value="selling">{`I'm interested in selling`}</SelectItem>
          <SelectItem value="renting">{`I'm interested in renting`}</SelectItem>
          <SelectItem value="general">General inquiry</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        name="message"
        placeholder={`Message for ${agency.name}...`}
        value={formData.message}
        onChange={handleChange}
        rows={4}
        required
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
