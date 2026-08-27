'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, MessageCircle, Search } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { HELP_CATEGORIES } from '@/lib/help-data'

export default function HelpPage() {
  const [query, setQuery] = useState('')
  const filteredCategories = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return HELP_CATEGORIES
    return HELP_CATEGORIES.filter(category => `${category.title} ${category.description} ${category.questions.map(([question, answer]) => `${question} ${answer}`).join(' ')}`.toLowerCase().includes(term))
  }, [query])

  return (
    <main className="help-page">
      <Navbar />
      <div className="help-page__glow" aria-hidden="true" />
      <div className="help-page__shell">
        <header className="help-hero">
          <div className="help-hero__eyebrow"><span className="help-live-dot" /> support / help center</div>
          <h1>How can we help?</h1>
          <p>Find guidance for optimizing your PC with confidence.</p>
          <label className="help-search">
            <Search className="size-5" aria-hidden="true" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search questions, tweaks, troubleshooting…" aria-label="Search help center" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
          </label>
          {query && <p className="help-results">Showing {filteredCategories.length} matching categories for <strong>“{query}”</strong></p>}
        </header>

        <div className="help-directory-heading"><div><span className="help-section-kicker">browse by topic</span><h2>What do you need help with?</h2></div><span className="help-directory-count">{filteredCategories.length} / {HELP_CATEGORIES.length} topics</span></div>
        <section className="help-categories" aria-label="Help categories">
          {filteredCategories.map(category => {
            const Icon = category.icon
            return <Link className="help-category" href={`/help/${category.slug}`} key={category.slug}>
              <span className="help-category__top"><span className="help-category__icon"><Icon className="size-5" /></span><span className="help-category__arrow"><ArrowRight className="size-4" /></span></span>
              <span className="help-category__heading"><strong>{category.title}</strong><small>{category.description}</small></span>
              <span className="help-category__footer"><span>{category.questions.length} questions answered</span><span>Explore topic <ArrowRight className="size-3.5" /></span></span>
            </Link>
          })}
        </section>

        {filteredCategories.length === 0 && <div className="help-empty"><Search className="size-5" /><p>No topics found. Try a different search term or ask the community.</p></div>}

        <section className="help-contact">
          <div className="help-contact__icon"><MessageCircle className="size-6" /></div>
          <div className="help-contact__copy"><span className="help-contact__eyebrow">community support</span><h2>Need more help?</h2><p>Join the Syntra community to ask questions, report an issue or share feedback.</p></div>
          <a className="help-contact__button" href="https://discord.gg/PJ6228HQcn" target="_blank" rel="noopener noreferrer">Join Discord <ExternalLink className="size-4" /></a>
        </section>
      </div>
    </main>
  )
}
