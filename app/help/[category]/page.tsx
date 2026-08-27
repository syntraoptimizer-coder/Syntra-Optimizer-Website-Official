'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ExternalLink, MessageCircle } from 'lucide-react'
import { notFound, useParams } from 'next/navigation'
import { Navbar } from '@/components/site/navbar'
import { getHelpCategory } from '@/lib/help-data'

export default function HelpCategoryPage() {
  const params = useParams<{ category: string }>()
  const category = getHelpCategory(params.category)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  if (!category) notFound()
  const Icon = category.icon

  return (
    <main className="help-page help-detail-page">
      <Navbar />
      <div className="help-page__glow" aria-hidden="true" />
      <div className="help-detail__shell">
        <Link className="help-back" href="/help"><ArrowLeft className="size-4" /> All help topics</Link>
        <header className="help-detail__hero">
          <div className="help-detail__icon"><Icon className="size-7" /></div>
          <div><span className="help-hero__eyebrow">help center / topic</span><h1>{category.title}</h1><p>{category.description}</p></div>
        </header>
        <div className="help-detail__meta"><span>{category.questions.length} questions</span><span>Everything you need to know</span></div>
        <section className="help-detail__questions" aria-label={`${category.title} questions`}>
          {category.questions.map(([question, answer], index) => {
            const isOpen = openQuestion === index
            return <article className={`help-detail__question${isOpen ? ' is-open' : ''}`} key={question}>
              <button onClick={() => setOpenQuestion(isOpen ? null : index)} aria-expanded={isOpen}><span className="help-detail__number">0{index + 1}</span><span>{question}</span><ChevronDown className="size-5" /></button>
              {isOpen && <div className="help-detail__answer"><p>{answer}</p></div>}
            </article>
          })}
        </section>
        <section className="help-contact">
          <div className="help-contact__icon"><MessageCircle className="size-6" /></div>
          <div className="help-contact__copy"><span className="help-contact__eyebrow">community support</span><h2>Still need help?</h2><p>Ask the Syntra community and get help from other PC enthusiasts.</p></div>
          <a className="help-contact__button" href="https://discord.gg/PJ6228HQcn" target="_blank" rel="noopener noreferrer">Join Discord <ExternalLink className="size-4" /></a>
        </section>
      </div>
    </main>
  )
}
