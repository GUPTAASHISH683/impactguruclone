// Navbar.jsx – SEO: header landmark, skip-to-content link, aria-current, semantic nav

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Campaigns',    href: '#campaigns',    aria: 'View fundraising campaigns' },
  { label: 'Categories',   href: '#categories',   aria: 'Browse campaign categories' },
  { label: 'How It Works', href: '#how',          aria: 'Learn how crowdfunding works' },
  { label: 'Stories',      href: '#testimonials', aria: 'Read donor success stories' },
  { label: 'FAQ',          href: '#faq',          aria: 'Frequently asked questions' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeHash, setActiveHash] = useState('')

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setActiveHash(href)
    const target = document.querySelector(href)
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Skip to main content – critical for a11y and Lighthouse */}
      <a
        href="#campaigns"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-brand-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'border-b border-black/5'
        }`}
        role="banner"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6"
          aria-label="Main navigation"
          role="navigation"
        >
          {/* Logo */}
          <a
            href="/"
            className="font-display text-2xl font-black flex-shrink-0 select-none"
            aria-label="ImpactGuru – India's crowdfunding platform – Home"
            itemProp="url"
          >
            <span className="text-brand-dark" itemProp="name">Impact</span>
            <span className="text-brand-orange">Guru</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-1 ml-auto" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  aria-label={link.aria}
                  aria-current={activeHash === link.href ? 'page' : undefined}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-150 ${
                    activeHash === link.href
                      ? 'text-brand-orange bg-brand-cream'
                      : 'text-gray-700 hover:bg-brand-cream hover:text-brand-orange'
                  }`}
                  itemProp="url"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex gap-3 flex-shrink-0">
            <a href="#campaigns" onClick={(e) => handleNav(e, '#campaigns')}
              className="btn-outline text-sm py-2 px-4"
              aria-label="Browse fundraising campaigns">
              Explore
            </a>
            <a href="#start" onClick={(e) => handleNav(e, '#start')}
              className="btn-primary text-sm py-2 px-4"
              aria-label="Start your free fundraising campaign">
              Start a Campaign
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden ml-auto flex flex-col gap-1.5 p-1 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 bg-brand-dark transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-brand-dark transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-brand-dark transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-96 border-b border-gray-100 shadow-lg' : 'max-h-0'
          }`}
          aria-hidden={!menuOpen}
        >
          <nav className="px-6 py-4 flex flex-col gap-1 bg-white" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                aria-label={link.aria}
                className="text-sm font-medium text-gray-700 px-3 py-2.5 rounded-lg hover:bg-brand-cream hover:text-brand-orange"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-3 border-t border-gray-100 mt-1">
              <a href="#campaigns" onClick={(e) => handleNav(e, '#campaigns')}
                className="btn-outline text-sm py-2 px-4 flex-1 text-center">Explore</a>
              <a href="#start" onClick={(e) => handleNav(e, '#start')}
                className="btn-primary text-sm py-2 px-4 flex-1 text-center">Start Campaign</a>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
