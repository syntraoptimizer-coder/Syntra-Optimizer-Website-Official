'use client'

import { useEffect, useRef } from 'react'

// Hook that adds .is-visible to all .dt-section-reveal elements when they enter the viewport
export function useSectionReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const targets = document.querySelectorAll('.dt-section-reveal')
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}
