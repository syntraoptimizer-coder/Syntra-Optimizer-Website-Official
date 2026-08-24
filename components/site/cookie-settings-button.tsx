'use client'

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('syntra:open-cookie-settings'))}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '11px 18px',
        background: 'rgba(20,77,199,0.16)',
        border: '1px solid rgba(86,139,255,0.36)',
        borderRadius: 12,
        fontSize: '0.84rem',
        fontWeight: 600,
        color: '#c7dcff',
        cursor: 'pointer',
        letterSpacing: '-0.03em',
        fontFamily: 'inherit',
        transition: 'background .15s, border-color .15s, transform .15s',
      }}
      onMouseEnter={event => {
        event.currentTarget.style.background = 'rgba(38,92,210,0.28)'
        event.currentTarget.style.borderColor = 'rgba(115,161,255,0.56)'
        event.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={event => {
        event.currentTarget.style.background = 'rgba(20,77,199,0.16)'
        event.currentTarget.style.borderColor = 'rgba(86,139,255,0.36)'
        event.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 8v4l3 3" />
      </svg>
      Manage my cookie preferences
    </button>
  )
}
