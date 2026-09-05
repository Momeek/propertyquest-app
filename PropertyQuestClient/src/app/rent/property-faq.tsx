import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What's typically included in the rent?",
    answer:
      "What's included in the rent varies by property. Some rentals include utilities like water, electricity, and internet, while others require tenants to pay these separately. Amenities like parking, gym access, and maintenance services may also be included. Always check the lease agreement for specific details.",
  },
  {
    question: "How much is the security deposit?",
    answer:
      "Security deposits typically range from one to two months' rent, depending on the property and local regulations. This deposit is held to cover potential damages beyond normal wear and tear and is generally refundable at the end of the lease if the property is left in good condition.",
  },
  {
    question: "What documents do I need to apply for a rental?",
    answer:
      "Most landlords require proof of income (pay stubs, bank statements, or tax returns), identification (driver's license or passport), rental history, and references. Some may also request a credit check and employment verification. Having these documents ready can speed up the application process.",
  },
  {
    question: "Can I make modifications to the rental property?",
    answer:
      "Most leases restrict significant modifications without landlord approval. Minor changes like hanging pictures are usually allowed, but painting walls, changing fixtures, or making structural alterations typically require permission. Always check your lease agreement and get written approval before making any substantial changes.",
  },
]

export default function PropertyFAQ() {
  return (
    <div className="mt-12 px-6 mb-4 mx-auto w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">
        Frequently Asked Questions About Renting
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="cursor-pointer"
          >
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
