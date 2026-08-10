'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

const GAMES = [
  { name: 'Valorant',     image: '/images/game-valorant.png' },
  { name: 'Fortnite',     image: '/images/game-fortnite.png' },
  { name: 'GTA V',        image: '/images/game-gta5.jpg' },
  { name: 'CS2',          image: '/images/game-cs2.png' },
  { name: 'Apex Legends', image: '/images/game-apex.jpg' },
  { name: 'Minecraft',    image: '/images/game-minecraft.png' },
  { name: 'Cyberpunk',    image: '/images/game-cyberpunk.png' },
  { name: 'Call of Duty', image: '/images/game-cod.jpg' },
  { name: 'Forza',        image: '/images/game-forza.png' },
  { name: 'Roblox',       image: '/images/game-roblox.png' },
]

export function SupportedGames() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0))
    setScrollLeft(trackRef.current?.scrollLeft ?? 0)
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing'
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 1.2
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  const stopDrag = () => {
    setIsDragging(false)
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  return (
    <section style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg-0)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 14 }}>
              <span className="live-dot" />
              100,000+ titles supported
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              margin: 0,
            }}>
              <span style={{ color: 'var(--ink-2)' }}>Works with every game </span>
              <span style={{ color: 'var(--ink-0)' }}>you play.</span>
            </h2>
          </div>
          <p style={{
            fontSize: '0.83rem', color: 'var(--ink-3)',
            fontFamily: 'ui-monospace, monospace',
            letterSpacing: '0.04em',
          }}>
            ← drag to explore →
          </p>
        </div>
        <p style={{
          marginTop: 14, fontSize: '0.9rem', color: 'var(--ink-2)',
          lineHeight: 1.65, maxWidth: '56ch',
        }}>
          Syntra applies system-wide tweaks that benefit every title — competitive shooters, open worlds, and everything in between. No per-game setup needed.
        </p>
      </div>

      {/* Draggable carousel */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          display: 'flex',
          gap: 10,
          overflowX: 'auto',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          cursor: 'grab',
          paddingLeft: 'max(24px, calc((100vw - 1088px) / 2))',
          paddingRight: 'max(24px, calc((100vw - 1088px) / 2))',
          paddingBottom: 60,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          userSelect: 'none',
        }}
      >
        {GAMES.map((game) => (
          <div
            key={game.name}
            style={{
              flexShrink: 0,
              width: 280,
              height: 160,
              borderRadius: 6,
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Image
              src={game.image}
              alt={game.name}
              fill
              className="object-cover"
              draggable={false}
              sizes="280px"
            />
            {/* Gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.3) 45%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            {/* Name */}
            <div style={{
              position: 'absolute', bottom: 12, left: 14,
              fontSize: '0.875rem', fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              textShadow: '0 1px 8px rgba(0,0,0,0.9)',
            }}>{game.name}</div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: 'center', paddingBottom: 56, marginTop: -24 }}>
        <p style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: '0.72rem', color: 'var(--ink-3)',
          fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
          And 100,000+ more titles
          <span style={{ width: 24, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
        </p>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
