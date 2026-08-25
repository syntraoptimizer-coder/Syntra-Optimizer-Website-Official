'use client'

import { useEffect, useState } from 'react'
import { SPAN_STYLES, SPAN_BODY_PRE, SPAN_BODY_POST } from '@/app/span/span-html'
import { PricingSlot } from '@/components/span/pricing-slot'
import { Footer } from '@/components/site/footer'

/**
 * Renders the pixel-perfect port of the downloaded Framer "Span" template
 * (see scripts/build-span-page.mjs) with Syntra Optimizer content applied.
 * The template's own <style> blocks and SSR markup are injected verbatim;
 * the existing Syntra <Pricing /> section is slotted between the template's
 * Integrations and FAQ sections.
 *
 * Extra CSS overrides fix Framer scroll-reveal animation states that the
 * runtime would normally animate into view but are left stuck without it:
 * - Elements with position:absolute and extreme top values (FAQ labels, CTA text)
 * - Logo scroller translateX transform that shifts logos out of view
 */
export function SpanPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SPAN_STYLES }} />
      {/* Framer scroll-reveal fix: neutralize absurd position:absolute top values
          and the logo scroller's stale translateX transform */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Framer SSR variants: hide the inactive breakpoint copies.
           Without the runtime stylesheet, desktop + tablet + mobile navs/heroes
           all render at once (duplicate top bars). */
        @media (min-width: 1200px) {
          .hidden-72rtr7, .hidden-1qpi723 { display: none !important; }
        }
        @media (min-width: 810px) and (max-width: 1199.98px) {
          .hidden-v2tpq8, .hidden-1bpio25 { display: none !important; }
        }
        @media (max-width: 809.98px) {
          .hidden-1kjb6go, .hidden-5xc53b { display: none !important; }
        }

        /* Intro overlay (Syntra™ wordmark + second announcement bar) stays
           visible without the Framer runtime — it stacks on top of the real hero. */
        .framer-19c4v0-container {
          display: none !important;
        }

        /* Fix Framer scroll-reveal elements stuck at position:absolute; top:11312px+
           These are animated by the Framer runtime on scroll; without it, they stay
           at their initial off-screen position. Override to relative/auto. */
        .framer-dfpppx, .framer-v30vy, .framer-1lf64g2,
        .framer-848mnf, .framer-1fyk3f7,
        .framer-8qcs2t, .framer-m1bp1y, .framer-g7w9g7, .framer-1k68mn5,
        .framer-1c204pz {
          position: relative !important;
          top: auto !important;
          left: auto !important;
        }
        /* Fix logo scroller: reset stale translateX from un-ran Framer animation */
        [data-framer-name="Logo Scroller"] ul {
          transform: translateX(0) !important;
        }

        /* Framer CTA is absolutely stacked over the FAQ without the runtime.
           The real closing CTA is rendered below as <Cta />. */
        .framer-1lhws0f,
        [data-framer-name="CTA Section Content"],
        #general-content-inside-the-product {
          display: none !important;
        }
        .framer-278p6r,
        #general-content-faq {
          display: block !important;
          width: 100% !important;
          max-width: none !important;
          height: auto !important;
          min-height: 0 !important;
          overflow: visible !important;
          position: relative !important;
          left: 0 !important;
          right: 0 !important;
          top: auto !important;
          transform: none !important;
        }
        #general-content-faq .syntra-faq {
          width: min(680px, calc(100% - 48px)) !important;
          margin: 0 auto !important;
          padding: 96px 0 110px !important;
        }

        [data-layout-template="true"] a.framer-1cx1864 {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        [data-layout-template="true"] [data-framer-name="Full Logo"],
        [data-layout-template="true"] .framer-gxpyok-container,
        [data-layout-template="true"] .framer-8flibh,
        [data-layout-template="true"] .framer-1avakym-container {
          width: auto !important;
          min-width: 0 !important;
          height: auto !important;
          overflow: visible !important;
        }
        [data-layout-template="true"] .syntra-nav-logo-wrap {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 28px !important;
          height: 28px !important;
          flex-shrink: 0 !important;
          padding: 2px !important;
          border-radius: 8px !important;
          border: 1px solid rgba(255, 255, 255, 0.85) !important;
          background: rgba(0, 3, 9, 0.7) !important;
          overflow: hidden !important;
        }
        [data-layout-template="true"] .syntra-nav-logo {
          display: block !important;
          width: 22px !important;
          height: 22px !important;
          border-radius: 5px !important;
          object-fit: contain !important;
          object-position: center !important;
        }
      ` }} />
      <div dangerouslySetInnerHTML={{ __html: SPAN_BODY_PRE }} />
      <PricingSlot />
      <div dangerouslySetInnerHTML={{ __html: SPAN_BODY_POST }} />
      <Footer />
    </>
  )
}
