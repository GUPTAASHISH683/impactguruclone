// Footer.jsx - SEO: contentinfo landmark, address schema, keyword-rich anchor text, breadcrumb nav

const LINKS = {
  'Fundraise For': [
    { label: 'Medical Treatment Fundraising', href: '/campaigns/medical' },
    { label: 'Cancer Care Crowdfunding',      href: '/campaigns/medical' },
    { label: 'Child Education Fundraising',   href: '/campaigns/education' },
    { label: 'NGO Campaign Fundraising',      href: '/campaigns/ngo' },
    { label: 'Disaster Relief Fund',          href: '/campaigns/disaster' },
  ],
  'Company': [
    { label: 'About ImpactGuru',              href: '/about' },
    { label: 'How Crowdfunding Works',        href: '/how-it-works' },
    { label: 'Platform Pricing',              href: '/pricing' },
    { label: 'Success Stories',               href: '/stories' },
    { label: 'Fundraising Blog',              href: '/blog' },
  ],
  'Support': [
    { label: 'Help Centre',                   href: '/help' },
    { label: 'Contact Us',                    href: '/contact' },
    { label: 'Privacy Policy',                href: '/privacy' },
    { label: 'Terms of Service',              href: '/terms' },
    { label: 'Refund Policy',                 href: '/refund' },
  ],
}

const SOCIALS = [
  { label: 'Follow ImpactGuru on Facebook',  glyph: 'f',  href: 'https://facebook.com/ImpactGuru' },
  { label: 'Follow ImpactGuru on Twitter/X', glyph: '𝕏', href: 'https://twitter.com/ImpactGuru' },
  { label: 'Follow ImpactGuru on Instagram', glyph: '▲', href: 'https://instagram.com/impactguru' },
  { label: 'ImpactGuru on LinkedIn',         glyph: 'in', href: 'https://linkedin.com/company/impactguru' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-brand-dark pt-16 pb-0"
      role="contentinfo"
      aria-label="ImpactGuru site footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div
        className="max-w-7xl mx-auto px-6"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand + address */}
          <div>
            <a
              href="/"
              className="font-display text-2xl font-black inline-block mb-4"
              aria-label="ImpactGuru home"
              itemProp="url"
            >
              <span className="text-white" itemProp="name">Impact</span>
              <span className="text-brand-orange">Guru</span>
            </a>

            <p className="text-sm text-white/40 leading-relaxed mb-3 max-w-xs" itemProp="description">
              India's most trusted crowdfunding platform since 2014. Empowering millions through the power of giving.
            </p>

            <address
              className="text-sm text-white/30 not-italic mb-5 leading-relaxed"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">1601, One BKC, Bandra Kurla Complex</span>,{' '}
              <span itemProp="addressLocality">Mumbai</span>,{' '}
              <span itemProp="addressRegion">Maharashtra</span>{' '}
              <span itemProp="postalCode">400051</span>,{' '}
              <span itemProp="addressCountry">India</span>
            </address>

            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 text-sm font-bold hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-150"
                >
                  <span aria-hidden="true">{s.glyph}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <nav key={heading} aria-label={`${heading} links`}>
              <h3 className="font-display font-bold text-white text-sm mb-5 tracking-wide">{heading}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-white/40 hover:text-brand-orange transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/25">
              © {year} ImpactGuru (Static Demo). All rights reserved.
            </p>
            <nav aria-label="Legal links" className="flex gap-4">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link) => (
                <a key={link} href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <p className="text-xs text-white/15 italic text-center mt-2">
            PayPal integration uses sandbox mode — demo only, no real transactions processed.
          </p>
        </div>
      </div>
    </footer>
  )
}
