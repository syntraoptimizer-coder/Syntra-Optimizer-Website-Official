'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId: number
    const onLenisScroll = ({ scroll }: { scroll: number }) => {
      window.dispatchEvent(new CustomEvent<number>('syntra-lenis-scroll', { detail: scroll }))
    }
    lenis.on('scroll', onLenisScroll)

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', onLenisScroll)
      lenis.destroy()
    }
  }, [])

  return null
}
