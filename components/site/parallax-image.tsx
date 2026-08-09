'use client'

import { useEffect, useRef } from 'react'

interface ParallaxImageProps {
  children: React.ReactNode
  speed?: number // 0 = no parallax, 0.3 = subtle, 0.5 = classic
  className?: string
  style?: React.CSSProperties
}

export function ParallaxImage({ children, speed = 0.3, className, style }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // How far the element is from the center of the viewport
      const centerY = rect.top + rect.height / 2 - windowH / 2
      const translateY = centerY * speed
      el.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // init on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return (
    <div className={className} style={{ overflow: 'hidden', ...style }}>
      <div ref={ref} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}
