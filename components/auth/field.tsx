'use client'

import { forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  labelAction?: React.ReactNode
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, labelAction, className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-sm font-light"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          {label}
        </label>
        {labelAction}
      </div>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-200 placeholder:font-light ${className ?? ''}`}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: error ? '1px solid rgba(255,80,80,0.5)' : '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.9)',
          caretColor: '#ffffff',
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = error
            ? '1px solid rgba(255,80,80,0.7)'
            : '1px solid rgba(255,255,255,0.28)'
          e.currentTarget.style.boxShadow = error
            ? '0 0 0 3px rgba(255,80,80,0.1)'
            : '0 0 0 3px rgba(255,255,255,0.06)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = error
            ? '1px solid rgba(255,80,80,0.5)'
            : '1px solid rgba(255,255,255,0.1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-xs"
          style={{ color: 'rgba(255,100,100,0.9)' }}
        >
          <AlertCircle className="size-3.5" />
          {error}
        </p>
      )}
    </div>
  )
})
