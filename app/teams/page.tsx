import type { Metadata } from 'next'
import { Users, MessageSquare, Zap, ShieldCheck, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Join the Team — Syntra Optimizer',
  description: 'Join the Syntra Optimizer community and team. Connect with other users, get support, and contribute to the project.',
}

const BENEFITS = [
  { icon: MessageSquare, title: 'Active Community', description: 'Join our Discord server with thousands of users sharing tips, tricks, and optimization guides.' },
  { icon: Zap, title: 'Early Access', description: 'Get beta access to new features and updates before they go public.' },
  { icon: ShieldCheck, title: 'Direct Support', description: 'Get help directly from the Syntra team and experienced community members.' },
  { icon: Award, title: 'Recognition', description: 'Contribute to the project and get recognized for your help and expertise.' },
]

const ROLES = [
  { title: 'Community Member', description: 'Join discussions, share your results, and help others optimize their systems.', color: 'var(--bg-2)' },
  { title: 'Beta Tester', description: 'Test new features and provide feedback to help improve Syntra Optimizer.', color: 'rgba(74, 222, 128, 0.1)' },
  { title: 'Content Creator', description: 'Create tutorials, guides, and content to help the community grow.', color: 'rgba(251, 191, 36, 0.1)' },
  { title: 'Contributor', description: 'Help with development, translations, and community management.', color: 'rgba(168, 85, 247, 0.1)' },
]

export default function TeamsPage() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-0)', fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', justifyContent: 'center', padding: '14px 16px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', maxWidth: 1040, height: 48, padding: '0 14px',
          background: 'rgba(8,8,8,0.82)', border: '1px solid var(--line)',
          borderRadius: 8, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace' }}>/ teams</span>
          </div>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 12px',
            borderRadius: 4, fontSize: '0.8rem', color: 'var(--ink-3)',
            background: 'none', textDecoration: 'none',
            transition: 'color 0.15s ease',
          }}>Home</Link>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1040, margin: '0 auto', padding: '40px 16px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{
              width: 16, height: 16, borderRadius: '50%',
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span className="s-tag">Join the Community</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700,
            letterSpacing: '-0.04em', lineHeight: 1.1,
            color: 'var(--ink-0)', marginBottom: 16,
          }}>
            Be Part of the<br />Syntra Team
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '600px', marginInline: 'auto' }}>
            Join thousands of PC enthusiasts, gamers, and power users who are pushing their systems to the limit with Syntra Optimizer.
          </p>
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ink-0)', marginBottom: 32, letterSpacing: '-0.02em' }}>
            Why Join?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="s-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--line)',
                  display: 'grid', placeItems: 'center', color: 'var(--ink-1)',
                }}>
                  <benefit.icon style={{ width: 24, height: 24 }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink-0)', margin: 0 }}>{benefit.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ink-0)', marginBottom: 32, letterSpacing: '-0.02em' }}>
            Ways to Contribute
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {ROLES.map((role, index) => (
              <div key={index} className="s-card" style={{ padding: 24, background: role.color }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink-0)', marginBottom: 8 }}>{role.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="s-card" style={{ padding: 48, textAlign: 'center', background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            display: 'grid', placeItems: 'center', margin: '0 auto 24',
            boxShadow: '0 0 40px -10px rgba(74, 222, 128, 0.5)',
          }}>
            <Users style={{ width: 40, height: 40, color: '#080808' }} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink-0)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Ready to Join?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '500px', marginInline: 'auto', marginBottom: 32 }}>
            Join our Discord server to connect with the community and start contributing today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <MessageSquare style={{ width: 16, height: 16 }} />Join Discord
            </a>
            <Link href="/checkout?plan=premium" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Get Premium First <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
