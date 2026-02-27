// FAQ.jsx - Renders FAQPage structured data + accessible accordion
// Google uses FAQPage schema for rich results (expanded Q&As in SERP)

import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const FAQS = [
  {
    q: 'How do I start a fundraiser on ImpactGuru?',
    a: 'Starting a fundraiser is free and takes under 10 minutes. Fill in your story, upload a photo, set your goal amount, and launch. Our team reviews and approves campaigns quickly, then helps promote them to millions of donors across India.',
  },
  {
    q: 'Is there a platform fee for medical crowdfunding?',
    a: 'ImpactGuru charges zero platform fee for medical campaigns. A small payment processing fee (2-3%) applies, but you keep the vast majority of every donation you receive.',
  },
  {
    q: 'How quickly will I receive the donated funds?',
    a: 'Funds are transferred to your verified bank account within 5-7 working days. For urgent medical cases, we offer expedited transfers on a case-by-case basis.',
  },
  {
    q: 'Is donating on ImpactGuru safe and secure?',
    a: 'Yes. We use 256-bit SSL encryption and partner with RBI-compliant payment gateways. Donors can pay via UPI, credit/debit cards, net banking, or PayPal. Every transaction is fully secure.',
  },
  {
    q: 'Can I fundraise for someone else&#39;s medical treatment?',
    a: 'Absolutely. You can start a campaign on behalf of a family member, friend, or anyone in need. Simply provide accurate information about the beneficiary and the medical condition to build donor trust.',
  },
  {
    q: 'What types of causes can I raise funds for?',
    a: 'You can raise funds for medical treatment (cancer, transplants, surgeries), education, disaster relief, animal welfare, women empowerment, environmental causes, and registered NGO projects.',
  },
]

function AccordionItem({ faq, index, isOpen, onToggle }) {
  const id = `faq-${index}`
  return (
    <div
      className="border border-gray-100 rounded-2xl overflow-hidden"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        id={`${id}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-150 gap-4"
      >
        <h3
          className="font-semibold text-brand-dark text-sm sm:text-base leading-snug"
          itemProp="name"
        >
          {faq.q}
        </h3>
        <span
          aria-hidden="true"
          className={`text-brand-orange text-xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60' : 'max-h-0'}`}
      >
        <p
          className="px-6 pb-5 pt-1 text-sm text-gray-500 leading-relaxed"
          itemProp="text"
        >
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useScrollReveal()

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 bg-gray-50"
      ref={ref}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-3xl mx-auto px-6">
        <header className="text-center mb-12 reveal">
          <span className="section-tag" aria-hidden="true">Got Questions?</span>
          <h2 id="faq-heading" className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Everything you need to know about starting or donating to a crowdfunding campaign on ImpactGuru.
          </p>
        </header>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <AccordionItem
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
