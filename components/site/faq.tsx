'use client'

import { useRef, useState } from 'react'
import { SectionHeading } from '@/components/site/section-heading'

const FAQS = [
  { q: 'Is Syntra safe to use on my PC?', a: 'Yes. Every change Syntra makes is reversible, and the app creates a restore point before optimizing. You can review and undo any tweak at any time.' },
  { q: 'Which versions of Windows are supported?', a: 'Syntra fully supports Windows 10 and Windows 11 (64-bit). Older versions are not supported.' },
  { q: 'What is your refund policy?', a: 'If Syntra does not improve your system, contact us within 14 days of purchase for a full refund — no questions asked.' },
  { q: 'How does the Done-For-You service work?', a: 'After booking, a Syntra expert connects to your PC through a secure remote tool. They run the full optimization while you watch, then share a before/after report.' },
  { q: 'Is remote access safe for the Done-For-You plan?', a: 'Absolutely. Sessions use encrypted, one-time access that you approve and can end instantly. Access is revoked the moment the session finishes.' },
  { q: 'Will optimizing affect my warranty or files?', a: 'No. Syntra only adjusts software settings and clears temporary data — it never touches your personal files or hardware warranty.' },
]

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const el = bodyRef.current
    if (!el) return
    if (!isOpen) {
      el.style.height = el.scrollHeight + 'px'
    } else {
      el.style.height = el.scrollHeight + 'px'
      // force reflow
      el.offsetHeight // eslint-disable-line
      el.style.height = '0px'
    }
    setIsOpen(v => !v)
  }

  const handleTransitionEnd = () => {
    if (isOpen && bodyRef.current) {
      bodyRef.current.style.height = 'auto'
    }
  }

  return (
    <div style={{
      borderTop: index === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <button
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '22px 0',
          background: 'none',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: '0.95rem',
          fontWeight: 500,
          color: isOpen ? '#fff' : 'rgba(255,255,255,0.6)',
          letterSpacing: '-0.03em',
          lineHeight: 1.45,
          transition: 'color 0.18s ease',
          flex: 1,
        }}>
          {q}
        </span>

        {/* Icon */}
        <div style={{
          flexShrink: 0,
          width: 28,
          height: 28,
          borderRadius: 8,
          border: `1px solid ${isOpen ? 'rgba(20,77,199,0.5)' : 'rgba(255,255,255,0.1)'}`,
          background: isOpen ? 'rgba(20,77,199,0.15)' : 'rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease, border-color 0.2s ease',
        }}>
          {/* Manual SVG cross — pas de dépendance Lucide pour éviter le bug de rotation */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? '#b8d7ff' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? '#b8d7ff' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {/* Body */}
      <div
        ref={bodyRef}
        onTransitionEnd={handleTransitionEnd}
        style={{
          height: 0,
          overflow: 'hidden',
          transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <p style={{
          margin: 0,
          paddingBottom: 22,
          fontSize: '0.88rem',
          lineHeight: 1.72,
          color: 'rgba(255,255,255,0.42)',
          letterSpacing: '-0.02em',
        }}>
          {a}
        </p>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq" style={{ scrollMarginTop: 80, background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
        <SectionHeading eyebrow="FAQ" title="Questions," accent="answered." />
        <div style={{ marginTop: 48, textAlign: 'left' }}>
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
