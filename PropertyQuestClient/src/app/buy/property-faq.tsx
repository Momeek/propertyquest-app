import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What's the process of buying a property?",
    answer:
      "The process typically involves finding a property, making an offer, getting approved for a mortgage, conducting property inspections, and closing the deal. Working with a real estate agent can help streamline this process.",
  },
  {
    question: "How much deposit do I need to buy a property?",
    answer:
      "The typical deposit requirement ranges from 5% to 20% of the property's purchase price. However, this can vary depending on the type of property, your location, and the type of mortgage you're applying for.",
  },
  {
    question: "What additional costs should I consider?",
    answer:
      "Beyond the purchase price, you should consider costs such as property taxes, insurance, maintenance, utilities, and potential homeowners association fees. There are also closing costs, which typically range from 2% to 5% of the purchase price.",
  },
  {
    question: "How long does it take to buy a property?",
    answer:
      "The timeline can vary significantly, but typically it takes 2-3 months from having an offer accepted to closing the deal. This can be longer or shorter depending on various factors such as mortgage approval, property inspections, and legal requirements.",
  },
]

export default function PropertyFAQ() {
  return (
    <div className="mt-12 px-6 mb-4 mx-auto w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
