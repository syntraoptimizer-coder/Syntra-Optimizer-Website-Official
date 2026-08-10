export function SectionHeading({
  eyebrow, title, accent, description, className,
}: {
  eyebrow?: string
  title: string
  accent?: string
  description?: string
  className?: string
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className ?? ''}`}>
      {eyebrow && (
        <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>
          <span className="live-dot" />
          {eyebrow}
        </span>
      )}
      <h2 style={{
        fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
        fontWeight: 600,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
        color: 'var(--ink-0)',
      }}>
        {accent ? (
          <><span style={{ color: 'var(--ink-2)' }}>{title} </span><span style={{ color: 'var(--ink-0)' }}>{accent}</span></>
        ) : title}
      </h2>
      {description && (
        <p style={{
          marginTop: 14, fontSize: '0.95rem', lineHeight: 1.65,
          color: 'var(--ink-2)', fontWeight: 400, maxWidth: '52ch', marginInline: 'auto',
        }}>{description}</p>
      )}
    </div>
  )
}
