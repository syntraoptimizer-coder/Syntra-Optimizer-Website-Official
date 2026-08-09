export function SectionHeading({
  eyebrow,
  title,
  description,
  accent, // last word of title shown brighter
}: {
  eyebrow?: string
  title: string
  description?: string
  accent?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <span className="section-tag">
          <span
            className="size-1.5 rounded-full bg-white/60"
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      )}
      <h2
        className="mt-5 text-balance"
        style={{
          fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
          fontWeight: 300,
          letterSpacing: '-0.028em',
          lineHeight: 1.08,
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        {accent ? (
          <>
            {title}{' '}
            <span style={{ color: '#ffffff', fontWeight: 400 }}>{accent}</span>
          </>
        ) : (
          <span
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            {title}
          </span>
        )}
      </h2>
      {description && (
        <p
          className="mt-4 text-pretty text-base leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.44)', fontWeight: 300 }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
