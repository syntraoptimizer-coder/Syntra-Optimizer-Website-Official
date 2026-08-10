'use client'

import Image from 'next/image'

const GAMES = [
  { name: 'Valorant',     image: '/images/game-valorant.png',   w: 460, h: 215 },
  { name: 'Fortnite',     image: '/images/game-fortnite.png',   w: 460, h: 215 },
  { name: 'GTA V',        image: '/images/game-gta5.jpg',       w: 460, h: 215 },
  { name: 'CS2',          image: '/images/game-cs2.png',        w: 460, h: 215 },
  { name: 'Apex Legends', image: '/images/game-apex.jpg',       w: 460, h: 215 },
  { name: 'Minecraft',    image: '/images/game-minecraft.png',  w: 300, h: 215 },
  { name: 'Cyberpunk',    image: '/images/game-cyberpunk.png',  w: 460, h: 215 },
  { name: 'Call of Duty', image: '/images/game-cod.jpg',        w: 460, h: 215 },
  { name: 'Forza',        image: '/images/game-forza.png',      w: 460, h: 215 },
  { name: 'Roblox',       image: '/images/game-roblox.png',     w: 300, h: 215 },
]

// Triple for seamless loop
const TRACK = [...GAMES, ...GAMES, ...GAMES]

export function SupportedGames() {
  return (
    <section style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg-0)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '72px 24px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 14 }}>
              <span className="live-dot" />
              100,000+ titles supported
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, margin: 0,
            }}>
              <span style={{ color: 'var(--ink-2)' }}>Works with every game </span>
              <span style={{ color: 'var(--ink-0)' }}>you play.</span>
            </h2>
          </div>
        </div>
        <p style={{ marginTop: 14, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '52ch' }}>
          Syntra applies system-wide tweaks that benefit every title — competitive shooters, open worlds, and everything in between. No per-game setup needed.
        </p>
      </div>

      {/* Infinite marquee */}
      <div style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)',
      }}>
        <div
          className="games-track"
          style={{
            display: 'flex',
            gap: 10,
            width: 'max-content',
            animation: 'games-marquee 40s linear infinite',
          }}
        >
          {TRACK.map((game, i) => (
            <div
              key={`${game.name}-${i}`}
              style={{
                flexShrink: 0,
                height: 180,
                width: 'auto',
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Image
                src={game.image}
                alt={game.name}
                width={game.w}
                height={game.h}
                draggable={false}
                style={{
                  height: 180,
                  width: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                }}
                sizes="300px"
              />
              {/* Gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.25) 45%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              {/* Name */}
              <div style={{
                position: 'absolute', bottom: 10, left: 12,
                fontSize: '0.82rem', fontWeight: 700,
                color: '#ffffff', letterSpacing: '-0.01em',
                textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
              }}>{game.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: 'center', padding: '28px 0 60px' }}>
        <p style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: '0.7rem', color: 'var(--ink-3)',
          fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
          And 100,000+ more titles
          <span style={{ width: 24, height: 1, background: 'var(--bg-4)', display: 'inline-block' }} />
        </p>
      </div>

      <style>{`
        @keyframes games-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .games-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .games-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
