'use client'

import Image from 'next/image'

const GAMES = [
  { name: 'Valorant',      image: '/images/game-valorant.png',  w: 460, h: 215 },
  { name: 'Fortnite',      image: '/images/game-fortnite.png',  w: 460, h: 215 },
  { name: 'GTA V',         image: '/images/game-gta5.jpg',      w: 460, h: 215 },
  { name: 'CS2',           image: '/images/game-cs2.png',       w: 460, h: 215 },
  { name: 'Apex Legends',  image: '/images/game-apex.jpg',      w: 460, h: 215 },
  { name: 'Minecraft',     image: '/images/game-minecraft.png', w: 300, h: 215 },
  { name: 'Cyberpunk',     image: '/images/game-cyberpunk.png', w: 460, h: 215 },
  { name: 'Rocket League', image: '/images/game-rocket.jpg',    w: 460, h: 215 },
  { name: 'Forza',         image: '/images/game-forza.png',     w: 460, h: 215 },
  { name: 'Roblox',        image: '/images/game-roblox.png',    w: 300, h: 215 },
]

const TRACK = [...GAMES, ...GAMES, ...GAMES]

export function SupportedGames() {
  return (
    <section style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg-0)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Ambient glow top center */}
      <div aria-hidden="true" className="glow glow-soft" style={{
        position: 'absolute', left: '50%', top: '30%',
        width: 700, height: 400, opacity: 0.18, zIndex: 0,
      }} />

      {/* Header — centered */}
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '80px 24px 52px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 18 }}>
          <span className="live-dot" />
          100,000+ titles supported
        </span>
        <h2 style={{
          fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
          fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.08,
          margin: '0 0 16px',
        }}>
          <span style={{ color: 'var(--ink-2)' }}>Works with every game</span><br />
          <span style={{ color: 'var(--ink-0)' }}>you play.</span>
        </h2>
        <p style={{
          fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.65,
          maxWidth: '52ch', marginInline: 'auto',
        }}>
          Syntra applies system-wide tweaks that benefit every title — competitive shooters, open worlds, and everything in between. No per-game setup needed.
        </p>
      </div>

      {/* Infinite marquee */}
      <div style={{
        overflow: 'hidden',
        position: 'relative', zIndex: 1,
        maskImage: 'linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)',
      }}>
        <div
          className="games-track"
          style={{ display: 'flex', gap: 10, width: 'max-content', animation: 'games-marquee 44s linear infinite' }}
        >
          {TRACK.map((game, i) => (
            <div
              key={`${game.name}-${i}`}
              className="game-card"
              style={{
                flexShrink: 0,
                height: 220,
                width: 'auto',
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <Image
                src={game.image}
                alt={game.name}
                width={game.w}
                height={game.h}
                draggable={false}
                style={{ height: 220, width: 'auto', objectFit: 'cover', display: 'block' }}
                sizes="400px"
              />
              {/* Gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              {/* Name */}
              <div style={{
                position: 'absolute', bottom: 12, left: 14,
                fontSize: '0.875rem', fontWeight: 700,
                color: '#ffffff', letterSpacing: '-0.01em',
                textShadow: '0 1px 8px rgba(0,0,0,0.95)',
                whiteSpace: 'nowrap',
              }}>{game.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: 'center', padding: '28px 0 72px', position: 'relative', zIndex: 1 }}>
        <p style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: '0.7rem', color: 'var(--ink-3)',
          fontFamily: 'ui-monospace, monospace', letterSpacing: '0.07em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 28, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
          And 100,000+ more titles
          <span style={{ width: 28, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
        </p>
      </div>

      <style>{`
        @keyframes games-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .games-track:hover { animation-play-state: paused; }
        .game-card:hover {
          transform: scale(1.04) translateY(-3px);
          border-color: rgba(255,255,255,0.28) !important;
          box-shadow: 0 0 24px -8px rgba(255,255,255,0.18), 0 8px 32px -12px rgba(0,0,0,0.8);
        }
        @media (prefers-reduced-motion: reduce) {
          .games-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
