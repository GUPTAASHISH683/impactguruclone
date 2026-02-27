// Categories.jsx - SEO: ItemList schema, nav landmark, keyword-rich link text

import { CATEGORIES } from '../data/campaigns'
import { useScrollReveal } from '../hooks/useScrollReveal'

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': 'Crowdfunding Campaign Categories',
  'description': 'Browse crowdfunding campaigns by cause on ImpactGuru India',
  'numberOfItems': CATEGORIES.length,
  'itemListElement': CATEGORIES.map((cat, i) => ({
    '@type': 'ListItem',
    'position': i + 1,
    'name': `${cat.label} Crowdfunding Campaigns`,
    'url': `https://www.impactguru.com/campaigns/${cat.id}`,
    'description': `Browse ${cat.count} ${cat.label.toLowerCase()} crowdfunding campaigns on ImpactGuru`,
  }))
}

export default function Categories() {
  const ref = useScrollReveal()

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="py-20 bg-white"
      ref={ref}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />

      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-14 reveal">
          <span className="section-tag" aria-hidden="true">Browse by Cause</span>
          <h2 id="categories-heading" className="section-title">
            Crowdfunding Categories
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            From medical fundraising to disaster relief — find campaigns that match your values.
          </p>
        </header>

        <nav aria-label="Fundraising campaign categories">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" role="list">
            {CATEGORIES.map((cat, i) => (
              <li key={cat.id} className="reveal list-none" style={{ transitionDelay: `${i * 0.07}s` }}>
                <a
                  href={`/campaigns/${cat.id}`}
                  className={`${cat.bg} border-2 ${cat.border} rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1.5 hover:shadow-lg transition-all duration-200 group block`}
                  aria-label={`Browse ${cat.label} crowdfunding campaigns - ${cat.count} campaigns`}
                >
                  <span aria-hidden="true" className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200 block">
                    {cat.emoji}
                  </span>
                  <span className="font-display font-bold text-brand-dark text-sm mb-1 block">{cat.label}</span>
                  <span className="text-xs text-gray-500">{cat.count} campaigns</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
