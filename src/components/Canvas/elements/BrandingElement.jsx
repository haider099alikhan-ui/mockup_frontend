import { memo } from 'react'

function BrandingElement({ element }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          backgroundColor: element.style?.iconColor || '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={element.style?.iconStroke || '#1a1a1a'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
          <line x1="17" y1="17" x2="22" y2="17" />
        </svg>
      </div>
      <span
        style={{
          fontSize: element.style?.fontSize || 11,
          fontWeight: element.style?.fontWeight || '600',
          color: element.style?.color || '#ffffff',
          letterSpacing: '-0.01em',
        }}
      >
        {element.content || 'StreamNow.'}
      </span>
    </div>
  )
}

export default memo(BrandingElement)
