// CTASection.jsx – SEO: keyword-rich H2, Service schema, ARIA

import { useScrollReveal } from '../hooks/useScrollReveal'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Start a Crowdfunding Campaign – ImpactGuru',
  'provider': { '@type': 'Organization', 'name': 'ImpactGuru' },
  'description': 'Launch a free crowdfunding campaign for medical emergencies, education, and social causes in India.',
  'areaServed': { '@type': 'Country', 'name': 'India' },
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Campaign Types',
    'itemListElement': [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Medical Crowdfunding' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Education Fundraising' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Disaster Relief Fundraising' } },
    ]
  },
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'INR',
    'description': 'Zero platform fee for medical campaigns. Free to start.',
  }
}

export default function CTASection() {
  const ref = useScrollReveal()

  return (
    <section
      id="start"
      aria-labelledby="cta-heading"
      className="py-20 bg-brand-cream"
      ref={ref}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal bg-cta-gradient rounded-3xl p-12 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div aria-hidden="true" className="absolute -right-20 -top-20 w-72 h-72 bg-brand-orange/10 rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-lg">
            <h2 id="cta-heading" className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Start Your Free Crowdfunding Campaign Today
            </h2>
            <p className="text-white/65 text-base mb-6 leading-relaxed">
              Join 5 lakh+ fundraisers who trust ImpactGuru. Zero platform fee for medical campaigns.
              Funds in your account within days.
            </p>
            <ul className="flex gap-5 flex-wrap text-sm text-white/60 list-none" aria-label="Key benefits">
              <li>✅ 100% Secure Payments</li>
              <li>✅ Zero Platform Fee</li>
              <li>✅ 24/7 Fundraising Support</li>
            </ul>
          </div>

          <div className="relative z-10 flex flex-col gap-3 flex-shrink-0">
            <a
              href="#"
              className="bg-brand-orange text-white font-semibold text-base px-10 py-4 rounded-2xl text-center border-2 border-brand-orange hover:bg-brand-orange-dk hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-200"
              aria-label="Start your free fundraising campaign on ImpactGuru"
            >
              Start Your Campaign – It's Free →
            </a>
            <a
              href="#campaigns"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#campaigns')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="bg-transparent border-2 border-gray-600 text-gray-300 font-semibold text-base px-10 py-4 rounded-2xl text-center hover:border-gray-400 hover:text-white transition-all duration-200"
              aria-label="Browse existing fundraising campaigns"
            >
              Explore Campaigns
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
