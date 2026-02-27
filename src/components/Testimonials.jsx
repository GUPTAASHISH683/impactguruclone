// Testimonials.jsx - SEO: Review schema, blockquote, semantic author markup

import { TESTIMONIALS } from '../data/campaigns'
import { useScrollReveal } from '../hooks/useScrollReveal'

const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': 'ImpactGuru Crowdfunding Platform',
  'description': "India's most trusted crowdfunding platform for medical, education and social causes.",
  'url': 'https://www.impactguru.com',
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.8',
    'reviewCount': '48200',
    'bestRating': '5',
    'worstRating': '1',
  },
  'review': TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    'author': {
      '@type': 'Person',
      'name': t.name,
      'address': { '@type': 'PostalAddress', 'addressLocality': t.location },
    },
    'reviewBody': t.quote,
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
    'datePublished': '2024-11-01',
  }))
}

export default function Testimonials() {
  const ref = useScrollReveal()

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-20 bg-hero-gradient"
      ref={ref}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }} />

      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-14 reveal">
          <span
            className="inline-block bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            aria-hidden="true"
          >
            Real Stories
          </span>
          <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            What Our Donors & Campaigners Say
          </h2>
          <p className="text-white/60 text-sm">Rated 4.8/5 by over 48,000 users</p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list" aria-label="User reviews and testimonials">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.id}
              className="reveal bg-white/6 border border-white/10 rounded-2xl p-7 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 list-none"
              style={{ transitionDelay: `${i * 0.1}s` }}
              itemScope
              itemType="https://schema.org/Review"
            >
              <blockquote itemProp="reviewBody">
                <p aria-hidden="true" className="font-display text-5xl text-brand-orange leading-none mb-4">"</p>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  {t.quote}
                </p>
              </blockquote>

              <footer>
                <cite
                  className="flex items-center gap-3 not-italic"
                  itemScope
                  itemType="https://schema.org/Person"
                  itemProp="author"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block" itemProp="name">{t.name}</span>
                    <span className="text-xs text-white/40" itemProp="address">{t.location}</span>
                  </div>
                </cite>

                {/* Machine-readable rating */}
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="sr-only">
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
