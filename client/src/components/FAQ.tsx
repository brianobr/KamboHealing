import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Is Kambo safe?",
      answer: "When administered by a trained practitioner following proper protocols, Kambo has an excellent safety record. Matt maintains rigorous safety standards including pre-session health screening, proper dosing, constant monitoring, and emergency preparedness. All sessions include comprehensive preparation and integration support."
    },
    {
      question: "What does a Kambo ceremony involve?",
      answer: "The ceremony begins with setting intentions and creating sacred space. Small burns (called gates) are made on the skin, typically on the arm or leg. The Kambo secretion is applied to these points. Effects begin within minutes and typically last 15-45 minutes, including purging (vomiting), intense but temporary discomfort, followed by a period of rest and integration."
    },
    {
      question: "Who should not receive Kambo?",
      answer: "Kambo is not suitable for pregnant or breastfeeding women, people with serious heart conditions, those on blood pressure medications, individuals with eating disorders, or anyone with severe mental health conditions without proper medical clearance. A thorough health screening is conducted before every session."
    },
    {
      question: "How should I prepare for a session?",
      answer: "Preparation begins 3 days before your session with specific dietary guidelines, avoiding alcohol and substances, staying well-hydrated, and mental/emotional preparation. You'll receive detailed preparation materials and have a consultation call to address any questions or concerns."
    },
    {
      question: "What happens after the ceremony?",
      answer: "Integration is crucial for lasting benefits. You'll receive integration guidance materials, dietary recommendations for optimal recovery, and a follow-up integration call within a week. Many people report feeling effects for days to weeks after their session as the medicine continues to work in the system."
    },
    {
      question: "How many sessions do I need?",
      answer: "This varies greatly depending on individual needs and goals. Some people experience profound shifts from a single session, while others benefit from a series of 2-3 sessions spaced weeks apart. Matt will discuss recommendations based on your specific situation during your consultation."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-green mb-6">
            Frequently Asked Questions
          </h2>
          <p className="font-lora text-xl text-earth-brown">
            Common questions about Kambo medicine and what to expect
          </p>
        </div>

        <div className="fade-in">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-warm-beige rounded-xl px-6">
                <AccordionTrigger className="font-lora text-xl font-semibold text-forest-green hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-dark-olive pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}