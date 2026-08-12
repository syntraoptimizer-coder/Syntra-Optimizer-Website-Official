'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const FAQS = [
  { q: 'Is Syntra safe to use on my PC?', a: 'Yes. Every change Syntra makes is reversible, and the app creates a restore point before optimizing. You can review and undo any tweak at any time.' },
  { q: 'Which versions of Windows are supported?', a: 'Syntra fully supports Windows 10 and Windows 11 (64-bit). Older versions are not supported.' },
  { q: 'What is your refund policy?', a: 'If Syntra does not improve your system, contact us within 14 days of purchase for a full refund — no questions asked.' },
  { q: 'How does the Done-For-You service work?', a: 'After booking, a Syntra expert connects to your PC through a secure remote tool. They run the full optimization while you watch, then share a before/after report. You can book follow-up sessions whenever you need a refresh.' },
  { q: 'Is remote access safe for the Done-For-You plan?', a: 'Absolutely. Sessions use encrypted, one-time access that you approve and can end instantly. Access is revoked the moment the session finishes.' },
  { q: 'Will optimizing affect my warranty or files?', a: 'No. Syntra only adjusts software settings and clears temporary data — it never touches your personal files or hardware warranty.' },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" style={{ scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px' }}>
        <SectionHeading eyebrow="FAQ" title="Questions," accent="answered." />
        <div style={{ marginTop: 48 }}>
          {FAQS.map((f, i) => (
            <div key={f.q} style={{ borderBottom: '1px solid var(--line)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: 16,
                }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: open === i ? 'var(--ink-0)' : 'var(--ink-1)', letterSpacing: '-0.01em', lineHeight: 1.4 }}>{f.q}</span>
                <Plus style={{
                  width: 15, height: 15, flexShrink: 0,
                  color: 'var(--ink-3)',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }} />
              </button>
              <div style={{
                display: 'grid',
                gridTemplateRows: open === i ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.28s ease',
              }}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ paddingBottom: 18, fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
