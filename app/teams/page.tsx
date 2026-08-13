import type { Metadata } from 'next'
import { Users, MessageSquare, Zap, ShieldCheck, Award, ArrowRight, Hash, Pin, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/site/logo'

export const metadata: Metadata = {
  title: 'Community — Syntra Optimizer',
  description: 'Join the Syntra Optimizer community. Get support, share results, and connect with thousands of PC enthusiasts.',
}

const STATS = [
  { value: '100+', label: 'Members' },
  { value: '4.8', label: 'Rating' },
  { value: '24/7', label: 'Support' },
  { value: 'Free', label: 'to join' },
]

const CHANNELS = [
  { icon: Hash, name: 'announcements', desc: 'Latest updates and news from the Syntra team', tag: 'Official', pinned: true },
  { icon: Hash, name: 'general',       desc: 'Chat with other Syntra users and PC enthusiasts', tag: null, pinned: false },
  { icon: Hash, name: 'showcase',      desc: 'Share your before/after results and system scores', tag: 'Popular', pinned: false },
  { icon: Hash, name: 'help',          desc: 'Get help with optimization issues and questions', tag: null, pinned: false },
  { icon: Hash, name: 'fps-logs',      desc: 'Post your FPS improvement logs and benchmarks', tag: null, pinned: false },
  { icon: Hash, name: 'hardware',      desc: 'Discuss hardware setups and compatibility', tag: null, pinned: false },
]

const THREADS = [
  { title: 'My Valorant FPS went from 120 to 198 — here is what I changed', author: 'Da1ko', time: '2h ago', replies: 14, tag: 'showcase' },
  { title: 'Best settings for Ryzen 5 5600 + RTX 3060 combo?', author: 'Crinok', time: '5h ago', replies: 8, tag: 'help' },
  { title: 'v1.1.1 dropped — network module is insane now', author: 'NovalPusl', time: '1d ago', replies: 31, tag: 'announcements' },
  { title: 'Deep cleanup freed 14GB on my system — screenshots inside', author: 'Zenitud', time: '1d ago', replies: 22, tag: 'showcase' },
  { title: 'XMP + BAR enabled after BIOS guide — 20% FPS boost on CS2', author: 'Kevin12', time: '2d ago', replies: 19, tag: 'fps-logs' },
  { title: 'How does the Done-For-You service work exactly?', author: 'Min12_', time: '3d ago', replies: 5, tag: 'help' },
]

const ROLES = [
  { title: 'Member',          desc: 'Join discussions, share results, and get support.',             color: 'var(--ink-3)' },
  { title: 'Beta Tester',     desc: 'Test new features before public release and give feedback.',     color: 'rgba(147,197,253,0.8)' },
  { title: 'Content Creator', desc: 'Create tutorials, guides, and optimization content.',             color: 'rgba(253,224,71,0.8)' },
  { title: 'Contributor',     desc: 'Help with development, translations, and moderation.',            color: 'rgba(134,239,172,0.8)' },
]

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    showcase: 'rgba(147,197,253,0.15)',
    help: 'rgba(253,224,71,0.12)',
    announcements: 'rgba(134,239,172,0.12)',
    'fps-logs': 'rgba(249,168,212,0.12)',
    hardware: 'rgba(216,180,254,0.12)',
  }
  return (
    <span style={{
      padding: '2px 7px', borderRadius: 3, fontSize: '0.62rem',
      fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em',
      background: colors[tag] || 'rgba(255,255,255,0.06)',
      color: 'var(--ink-2)', border: '1px solid var(--line)',
    }}>#{tag}</span>
  )
}

export default function TeamsPage() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-0)', fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}>

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500, borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.1) 0%, transparent 74%)',
        filter: 'blur(60px)', mixBlendMode: 'screen',
      }} />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', justifyContent: 'center', padding: '14px 16px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', maxWidth: 1040, height: 48, padding: '0 14px',
          background: 'rgba(8,8,8,0.88)', border: '1px solid var(--line)',
          borderRadius: 8, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo />
            <span style={{ fontSize: '0.78rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace' }}>/ community</span>
          </div>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 12px', borderRadius: 4, fontSize: '0.8rem', color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1040, margin: '0 auto', padding: '56px 16px 100px' }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 20 }}>
            <span className="live-dot" />
            Community
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.06, marginBottom: 18 }}>
            <span style={{ color: 'var(--ink-2)' }}>Join 100+ gamers</span><br />
            <span style={{ color: 'var(--ink-0)' }}>pushing their limits.</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '52ch', marginInline: 'auto', marginBottom: 32 }}>
            Share results, get help, and connect with PC enthusiasts who use Syntra Optimizer to get the most out of their hardware.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <MessageSquare style={{ width: 14, height: 14 }} />Join Discord
            </a>
            <a href="#forum" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Browse Forum <ArrowRight style={{ width: 13, height: 13 }} />
            </a>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="s-card" style={{ padding: '20px 32px', marginBottom: 56, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--ink-0)', fontFamily: 'ui-monospace, monospace' }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Forum ── */}
        <div id="forum" style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 8 }}><Hash style={{ width: 10, height: 10 }} />Forum</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink-0)', margin: 0 }}>Community discussions</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 12, alignItems: 'start' }}>

            {/* Sidebar — channels */}
            <div className="s-card" style={{ padding: 12, position: 'sticky', top: 78 }}>
              <p style={{ fontSize: '0.68rem', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.08em', color: 'var(--ink-3)', textTransform: 'uppercase', padding: '4px 8px 8px', margin: 0 }}>Channels</p>
              {CHANNELS.map((ch) => (
                <a key={ch.name} href={`#${ch.name}`} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 4,
                  textDecoration: 'none', transition: 'background 0.15s ease',
                  color: 'var(--ink-2)', fontSize: '0.83rem',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Hash style={{ width: 12, height: 12, color: 'var(--ink-3)', flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{ch.name}</span>
                  {ch.tag && (
                    <span style={{ fontSize: '0.58rem', padding: '1px 5px', borderRadius: 2, background: 'rgba(255,255,255,0.07)', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace' }}>{ch.tag}</span>
                  )}
                </a>
              ))}
            </div>

            {/* Threads */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Pinned */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 2px', marginBottom: 4 }}>
                <Pin style={{ width: 11, height: 11, color: 'var(--ink-3)' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pinned</span>
              </div>

              {/* Pinned thread */}
              <div className="s-card" style={{ padding: '14px 18px', borderLeft: '2px solid rgba(255,255,255,0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <TagBadge tag="announcements" />
                  <span style={{ fontSize: '0.72rem', color: 'var(--ink-3)' }}>by Syntra Team · 1d ago</span>
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                  Welcome to the Syntra Community — Read before posting
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--ink-3)', margin: 0, lineHeight: 1.5 }}>
                  Rules, guidelines, and how to get the most out of the community. Please read before creating posts.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 2px 4px', marginTop: 4 }}>
                <MessageSquare style={{ width: 11, height: 11, color: 'var(--ink-3)' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Recent threads</span>
              </div>

              {/* Thread list */}
              {THREADS.map((thread, i) => (
                <div key={i} className="s-card" style={{ padding: '14px 18px', cursor: 'pointer', transition: 'border-color 0.2s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <TagBadge tag={thread.tag} />
                        <span style={{ fontSize: '0.72rem', color: 'var(--ink-3)' }}>by {thread.author} · {thread.time}</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink-0)', margin: '0 0 4px', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                        {thread.title}
                      </p>
                    </div>
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, color: 'var(--ink-3)', fontSize: '0.75rem' }}>
                      <MessageSquare style={{ width: 12, height: 12 }} />
                      {thread.replies}
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA post */}
              <div style={{ padding: '12px 0', textAlign: 'center' }}>
                <a href="#" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.83rem' }}>
                  Join Discord to post <ArrowRight style={{ width: 12, height: 12 }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Roles ── */}
        <div style={{ marginBottom: 64 }}>
          <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 14 }}><Users style={{ width: 10, height: 10 }} />Roles</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink-0)', marginBottom: 20, marginTop: 0 }}>Ways to contribute</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
            {ROLES.map((r, i) => (
              <div key={i} className="s-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--ink-0)', margin: 0, letterSpacing: '-0.01em' }}>{r.title}</h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="s-card" style={{ padding: '52px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: '-20%',
            width: 500, height: 300, borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.06) 0%, transparent 70%)',
            filter: 'blur(30px)', transform: 'translateX(-50%)', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--ink-0)', marginBottom: 12, marginTop: 0 }}>
              Ready to join?
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '44ch', marginInline: 'auto', marginBottom: 28 }}>
              Connect with thousands of gamers and PC enthusiasts on our Discord server.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <MessageSquare style={{ width: 14, height: 14 }} />Join Discord
              </a>
              <Link href="/checkout?plan=premium" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Get Premium <ArrowRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
