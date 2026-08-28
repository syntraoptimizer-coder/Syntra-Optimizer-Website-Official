import { Navbar } from '@/components/site/navbar'

export function AppChrome({
  crumb,
  children,
  actions,
}: {
  crumb?: string
  children: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-page)', position: 'relative' }}>
      <div aria-hidden="true" className="glow glow-blue" style={{
        position: 'fixed', top: '0%', left: '50%', width: 720, height: 420, opacity: 0.35, zIndex: 0,
      }} />

      {/* Same top bar as the landing page, on every page */}
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1040, margin: '0 auto', padding: '104px 20px 80px' }}>
        {actions ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            {actions}
          </div>
        ) : null}
        {children}
      </main>
    </div>
  )
}
