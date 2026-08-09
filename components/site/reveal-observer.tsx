'use client'

import { useEffect } from 'react'

// Global IntersectionObserver that activates all .dt-section-reveal elements
export function RevealObserver() {
  useEffect(() => {
    const activate = () => {
      const targets = document.querySelectorAll('.dt-section-reveal:not(.is-visible)')
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
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      targets.forEach((el) => observer.observe(el))
      return observer
    }

    const observer = activate()
    return () => observer?.disconnect()
  }, [])

  return null
}
