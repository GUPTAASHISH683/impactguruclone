// Hero.jsx – SEO: h1 with primary keyword, semantic landmark, ARIA labels

const STATS = [
  { num: '₹1,200 Cr+', label: 'Total Raised',      schema: 'fundraising total' },
  { num: '5,00,000+',  label: 'Active Campaigns',   schema: 'campaigns count' },
  { num: '20M+',       label: 'Lives Impacted',     schema: 'beneficiaries count' },
]

const FLOAT_CARDS = [
  { emoji: '👦', title: "Rohan's Cancer Treatment", pct: 72, bg: 'linear-gradient(135deg,#FF6B6B,#FF8E53)' },
  { emoji: '📚', title: 'Education for Tribal Kids', pct: 89, bg: 'linear-gradient(135deg,#4facfe,#00c6ff)' },
]

function FloatCard({ card }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden w-56 shadow-2xl animate-float-slow"
      aria-hidden="true"
    >
      <div className="h-28 flex items-center justify-center text-5xl" style={{ background: card.bg }}>
        <span role="img" aria-label={card.title}>{card.emoji}</span>
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-brand-dark mb-2 leading-tight">{card.title}</p>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1" role="progressbar"
          aria-valuenow={card.pct} aria-valuemin="0" aria-valuemax="100"
          aria-label={`${card.pct}% funded`}>
          <div className="h-full bg-gradient-to-r from-brand-teal to-brand-teal-lt rounded-full"
            style={{ width: `${card.pct}%` }} />
        </div>
        <span className="text-xs text-brand-teal font-semibold">{card.pct}% funded</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      aria-label="ImpactGuru – India's crowdfunding platform for medical and social causes"
      className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden pt-16"
    >
      {/* Decorative backgrounds – aria-hidden */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 25% 55%, rgba(255,87,34,.13) 0%, transparent 55%)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full flex items-center gap-16 py-20">
        <div className="flex-1 animate-fade-up">

          {/* Trust badge */}
          <p className="inline-block bg-orange-500/15 border border-orange-400/40 text-orange-300 text-sm font-medium px-5 py-2 rounded-full mb-6 tracking-wide">
            🌟 Trusted by 2M+ donors across India
          </p>

          {/* H1 – primary keyword: "crowdfunding platform India" */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-5">
            India's&nbsp;#1<br />
            <span className="text-brand-orange">Crowdfunding Platform</span>
          </h1>

          {/* Subtitle – secondary keywords */}
          <p className="text-lg text-white/70 mb-10 max-w-md leading-relaxed">
            Raise funds for <strong className="text-white/90">medical emergencies</strong>, education,
            and social causes. Over ₹1,200 Cr raised. Start your campaign free in minutes.
          </p>

          <div className="flex gap-4 flex-wrap mb-14">
            <a href="#campaigns" onClick={(e) => handleScroll(e, '#campaigns')}
              className="bg-white text-brand-orange font-semibold text-base px-8 py-3.5 rounded-xl border-2 border-white transition-all duration-200 hover:bg-brand-cream hover:-translate-y-0.5 hover:shadow-lg"
              aria-label="Donate to a campaign now">
              Donate Now
            </a>
            <a href="#start" onClick={(e) => handleScroll(e, '#start')}
              className="btn-ghost text-base px-8 py-3.5 rounded-xl"
              aria-label="Start your free fundraising campaign">
              Start Fundraising →
            </a>
          </div>

          {/* Stats – wrapped in dl for semantic key-value meaning */}
          <dl className="flex items-center gap-8 flex-wrap">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                {i > 0 && <div aria-hidden="true" className="w-px h-9 bg-white/20" />}
                <div>
                  <dt className="text-xs text-white/50 uppercase tracking-widest order-2">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold text-white order-1">{s.num}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Floating preview cards – decorative, hidden from AT */}
        <div className="hidden xl:flex flex-col gap-5 flex-shrink-0" aria-hidden="true">
          {FLOAT_CARDS.map((card, i) => (
            <FloatCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
