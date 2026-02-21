import { memo } from 'react'

function BadgeElement({ element }) {
  const s = element.style || {}

  return (
    <div
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4,
        paddingLeft: s.px ?? 10,
        paddingRight: s.px ?? 10,
        paddingTop: s.py ?? 4,
        paddingBottom: s.py ?? 4,
        borderRadius: s.borderRadius ?? 999,
        backgroundColor: s.bgColor || 'rgba(255,255,255,0.15)',
        border: s.border || 'none',
        backdropFilter: s.blur ? `blur(${s.blur}px)` : undefined,
        pointerEvents: 'none',
        width: element.width ? `${element.width}px` : 'auto',
        height: element.height ? `${element.height}px` : 'auto',
      }}
    >
      {s.icon && (
        <span style={{ fontSize: s.iconSize || 10 }}>{s.icon}</span>
      )}
      <span
        style={{
          fontSize: s.fontSize || 9,
          fontWeight: s.fontWeight || '600',
          color: s.color || '#ffffff',
          letterSpacing: s.letterSpacing || '0.02em',
          textTransform: s.textTransform || 'uppercase',
          whiteSpace: 'pre-line',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {element.content}
      </span>
    </div>
  )
}

export default memo(BadgeElement)
