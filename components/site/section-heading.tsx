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
        <p className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <span className="live-dot" />
          {eyebrow}
        </p>
      )}
      <h2 style={{
        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
        fontWeight: 600,
        letterSpacing: '-0.05em',
        lineHeight: 1.1,
        color: '#fff',
      }}>
        {accent ? (
          <>
            <span style={{ color: '#fff' }}>{title} </span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{accent}</span>
          </>
        ) : title}
      </h2>
      {description && (
        <p style={{
          marginTop: 14, fontSize: '0.95rem', lineHeight: 1.65,
          color: 'rgba(255,255,255,0.45)', fontWeight: 400,
          maxWidth: '52ch', marginInline: 'auto',
          letterSpacing: '-0.03em',
        }}>{description}</p>
      )}
    </div>
  )
}
