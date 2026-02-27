// HowItWorks.jsx – SEO: HowTo schema, ordered list, h2/h3 hierarchy

import { useScrollReveal } from '../hooks/useScrollReveal'

const STEPS = [
  {
    num: '01',
    icon: '✍️',
    title: 'Start Your Campaign',
    desc: 'Fill in your story, set a fundraising goal, and launch your campaign in under 10 minutes — completely free.',
  },
  {
    num: '02',
    icon: '📣',
    title: 'Share With Your Network',
    desc: 'Share across WhatsApp, Facebook, and email. Our team helps promote your medical or social campaign to millions.',
  },
  {
    num: '03',
    icon: '💸',
    title: 'Receive Donations Securely',
    desc: 'Donors contribute via UPI, cards, or net banking. Funds are transferred directly and quickly to your account.',
  },
  {
    num: '04',
    icon: '🎉',
    title: 'Make a Lasting Impact',
    desc: 'Use the funds for your cause, update your donors with progress reports, and inspire more giving.',
  },
]

// HowTo JSON-LD
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to Start a Fundraising Campaign on ImpactGuru',
  'description': 'Launch a free crowdfunding campaign for medical, education or social causes in 4 simple steps.',
  'totalTime': 'PT10M',
  'supply': [],
  'tool': [{ '@type': 'HowToTool', 'name': 'ImpactGuru Platform' }],
  'step': STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    'position': i + 1,
    'name': s.title,
    'text': s.desc,
  })),
}

export default function HowItWorks() {
  const ref = useScrollReveal()

  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="py-20 bg-gray-50"
      ref={ref}
    >
      {/* HowTo structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-14 reveal">
          <span className="section-tag" aria-hidden="true">Simple Process</span>
          <h2 id="how-heading" className="section-title">
            How to Start a Crowdfunding Campaign
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            From launch to impact in 4 easy steps — no technical skills needed.
          </p>
        </header>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Fundraising steps">
          {STEPS.map((s, i) => (
            <li
              key={s.num}
              className="reveal bg-white rounded-2xl p-7 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 list-none"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span aria-hidden="true" className="font-display text-5xl font-black text-gray-100 leading-none mb-2 block">{s.num}</span>
              <span aria-hidden="true" className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="font-display font-bold text-brand-dark text-lg mb-3">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
