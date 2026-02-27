// CampaignList.jsx - SEO: section with aria-labelledby, live region for filter results

import { useState } from 'react'
import CampaignCard from './CampaignCard'
import { CAMPAIGNS } from '../data/campaigns'
import { useScrollReveal } from '../hooks/useScrollReveal'

const FILTERS = [
  { label: 'All Causes',    value: 'all' },
  { label: 'Medical',       value: 'medical' },
  { label: 'Education',     value: 'education' },
  { label: 'Disaster',      value: 'disaster' },
  { label: 'Animals',       value: 'animals' },
  { label: 'Environment',   value: 'environment' },
]

export default function CampaignList() {
  const [filter, setFilter] = useState('all')
  const ref = useScrollReveal([filter])
  const visible = filter === 'all' ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.category === filter)

  return (
    <section
      id="campaigns"
      aria-labelledby="campaigns-heading"
      className="py-20 bg-white"
      ref={ref}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="max-w-7xl mx-auto px-6">

        <header className="text-center mb-14 reveal">
          <span className="section-tag" aria-hidden="true">Featured Campaigns</span>
          <h2 id="campaigns-heading" className="section-title" itemProp="name">
            Fundraising Campaigns That Need Your Support
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-base" itemProp="description">
            Real people, real emergencies across India. Every donation — no matter how small — changes a life.
          </p>
        </header>

        {/* Filter controls */}
        <nav aria-label="Filter campaigns by cause" className="flex gap-2 flex-wrap justify-center mb-10 reveal">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              aria-label={`Filter by ${f.label}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-150 ${
                filter === f.value
                  ? 'bg-brand-orange border-brand-orange text-white'
                  : 'border-gray-200 text-gray-500 hover:border-brand-orange hover:text-brand-orange bg-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>

        {/* Live region announces filter changes to screen readers */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {visible.length} {filter === 'all' ? 'campaigns' : `${filter} campaigns`}
        </p>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
          aria-label="Fundraising campaigns"
        >
          {visible.map((c, i) => (
            <div role="listitem" key={c.id} itemProp="itemListElement"
              itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content={String(i + 1)} />
              <CampaignCard campaign={c} delay={i * 0.05} headingLevel={3} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <button
            className="border-2 border-brand-dark text-brand-dark font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark hover:text-white transition-all duration-200"
            aria-label="View all fundraising campaigns"
          >
            View All Campaigns →
          </button>
        </div>
      </div>
    </section>
  )
}
