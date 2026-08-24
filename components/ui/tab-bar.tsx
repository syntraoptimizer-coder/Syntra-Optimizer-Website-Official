'use client'

import { motion } from 'framer-motion'

interface Tab {
  id: string
  label: string
  icon?: React.ElementType
}

interface TabBarProps {
  tabs: readonly Tab[] | Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function TabBar({ tabs, activeTab, onChange, className }: TabBarProps) {
  return (
    <div
      role="tablist"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        borderBottom: '1px solid rgba(255,255,255,.07)',
        width: '100%',
      }}
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              paddingLeft: 4,
              paddingRight: 4,
              paddingBottom: 10,
              paddingTop: 2,
              marginRight: 20,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: active ? 500 : 400,
              color: active ? 'rgba(255,255,255,.90)' : 'rgba(255,255,255,.38)',
              transition: 'color .15s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!active) e.currentTarget.style.color = 'rgba(255,255,255,.68)'
            }}
            onMouseLeave={e => {
              if (!active) e.currentTarget.style.color = 'rgba(255,255,255,.38)'
            }}
          >
            {Icon && (
              <Icon
                size={14}
                strokeWidth={1.8}
                style={{ flexShrink: 0, color: 'inherit', opacity: active ? 1 : 0.7 }}
                aria-hidden="true"
              />
            )}
            {label}
            {active && (
              <motion.span
                layoutId="tab-indicator"
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: 'rgba(184,215,255,.85)',
                  borderRadius: 2,
                  boxShadow: '0 0 8px 1px rgba(20,77,199,.45)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
