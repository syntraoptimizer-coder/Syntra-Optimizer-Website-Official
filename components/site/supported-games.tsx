'use client'

import Image from 'next/image'

const GAMES = [
  { name: 'Valorant',    image: '/images/game-valorant.png' },
  { name: 'Fortnite',    image: '/images/game-fortnite.png' },
  { name: 'GTA V',       image: '/images/game-gta5.jpg' },
  { name: 'CS2',         image: '/images/game-cs2.png' },
  { name: 'Apex Legends',image: '/images/game-apex.jpg' },
  { name: 'Minecraft',   image: '/images/game-minecraft.png' },
  { name: 'Cyberpunk',   image: '/images/game-cyberpunk.png' },
  { name: 'Call of Duty',image: '/images/game-cod.jpg' },
  { name: 'Forza',       image: '/images/game-forza.png' },
  { name: 'Roblox',      image: '/images/game-roblox.png' },
]

export function SupportedGames() {
  return (
    <section style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
      background: 'var(--bg-0)',
    }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '72px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>
            <span className="live-dot" />
            100,000+ titles supported
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            marginBottom: 14,
          }}>
            <span style={{ color: 'var(--ink-2)' }}>Works with every game</span>
            <br />
            <span style={{ color: 'var(--ink-0)' }}>you play.</span>
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--ink-2)',
            lineHeight: 1.65,
            maxWidth: '48ch',
            marginInline: 'auto',
          }}>
            Syntra Optimizer applies system-wide performance tweaks that boost every game — from competitive shooters to open worlds. No per-game configuration needed.
          </p>
        </div>

        {/* Game grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
        }}>
          {GAMES.map((game) => (
            <div
              key={game.name}
              className="s-card"
              style={{
                overflow: 'hidden',
                aspectRatio: '16/9',
                position: 'relative',
                cursor: 'default',
                transition: 'transform 0.22s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'
              }}
            >
              <Image
                src={game.image}
                alt={game.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              {/* Game name */}
              <div style={{
                position: 'absolute', bottom: 8, left: 10,
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '-0.01em',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              }}>{game.name}</div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <p style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.78rem',
            color: 'var(--ink-3)',
            fontFamily: 'ui-monospace, monospace',
            letterSpacing: '0.04em',
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
            AND 100,000+ MORE TITLES
            <span style={{ width: 20, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
          </p>
        </div>
      </div>
    </section>
  )
}
