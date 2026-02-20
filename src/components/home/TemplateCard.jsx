import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BUILDERS } from '../../data/slideBuilders'

function MiniPhone({ x, y, w, h, rotation, gradient }) {
  const br = Math.min(w, h) * 0.18
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `rotate(${rotation || 0}deg)`,
        transformOrigin: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: br,
          border: '1.5px solid rgba(80,80,80,0.5)',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: h * 0.02,
            left: '50%',
            transform: 'translateX(-50%)',
            width: w * 0.26,
            height: Math.max(2, h * 0.018),
            borderRadius: 99,
            backgroundColor: '#000',
            zIndex: 2,
          }}
        />
        <div
          style={{
            width: '92%',
            height: '95%',
            borderRadius: br * 0.8,
            background: gradient || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          }}
        />
      </div>
    </div>
  )
}

function MiniSlide({ slide, width, height }) {
  const scale = width / 280

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: slide.backgroundColor,
        borderRadius: 8 * scale,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        pointerEvents: 'none', // Ensure clicks pass through
      }}
    >
      {slide.elements.map((el) => {
        const sx = el.x * scale
        const sy = el.y * scale

        if (el.type === 'blob') {
          return (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: sx,
                top: sy,
                width: el.width * scale,
                height: el.height * scale,
                borderRadius: '50%',
                backgroundColor: el.style?.color || '#2a2a2a',
                opacity: el.style?.opacity ?? 0.4,
                pointerEvents: 'none',
              }}
            />
          )
        }

        if (el.type === 'branding') {
          return (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: sx,
                top: sy,
                display: 'flex',
                alignItems: 'center',
                gap: 2 * scale,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: 8 * scale,
                  height: 8 * scale,
                  borderRadius: 2 * scale,
                  backgroundColor: el.style?.iconColor || '#fff',
                }}
              />
              <span
                style={{
                  fontSize: Math.max(5, (el.style?.fontSize || 11) * scale),
                  fontWeight: el.style?.fontWeight || '600',
                  color: el.style?.color || '#fff',
                  whiteSpace: 'nowrap',
                }}
              >
                {el.content}
              </span>
            </div>
          )
        }

        if (el.type === 'badge') {
          return (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: sx,
                top: sy,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                padding: `${2 * scale}px ${4 * scale}px`,
                borderRadius: 99,
                backgroundColor: el.style?.bgColor || 'rgba(255,255,255,0.15)',
                border: el.style?.border || 'none',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontSize: Math.max(4, (el.style?.fontSize || 8) * scale),
                  fontWeight: el.style?.fontWeight || '600',
                  color: el.style?.color || '#fff',
                  whiteSpace: 'nowrap',
                }}
              >
                {el.style?.icon || ''} {el.content}
              </span>
            </div>
          )
        }

        if (el.type === 'text') {
          const fs = (el.style?.fontSize || 20) * scale
          return (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: sx,
                top: sy,
                width: el.width * scale,
                fontSize: Math.max(4, fs),
                fontWeight: el.style?.fontWeight || '600',
                color: el.style?.color || '#ffffff',
                textAlign: el.style?.align || 'left',
                lineHeight: 1.05,
                whiteSpace: 'pre-line',
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            >
              {el.content}
            </div>
          )
        }

        if (el.type === 'device') {
          return (
            <MiniPhone
              key={el.id}
              x={sx}
              y={sy}
              w={el.width * scale}
              h={el.height * scale}
              rotation={el.style?.rotation}
              gradient={el.style?.screenGradient}
            />
          )
        }

        return null
      })}
    </div>
  )
}

const BADGE_STYLES = {
  Popular: 'bg-blue-50 text-blue-600',
  New: 'bg-green-50 text-green-600',
  Free: 'bg-gray-100 text-gray-600',
}

function BadgePill({ label }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${BADGE_STYLES[label] || 'bg-gray-100 text-gray-600'}`}
    >
      {label}
    </span>
  )
}

function TemplateCard({ template }) {
  const navigate = useNavigate()

  const slides = useMemo(() => {
    const builder = BUILDERS[template.id]
    if (builder) {
      return builder(template)
    }
    return template.slides.map((slide, i) => ({
      id: i + 1,
      backgroundColor: slide.backgroundColor || template.backgroundColor,
      elements: [
        {
          id: `t-${i}`,
          type: 'text',
          x: 24,
          y: 40,
          width: 220,
          height: 90,
          content: slide.subtitle ? `${slide.title}\n${slide.subtitle}` : slide.title,
          style: { fontSize: 26, fontWeight: '800', color: '#ffffff' },
        },
        {
          id: `d-${i}`,
          type: 'device',
          x: 140,
          y: 160,
          width: 110,
          height: 220,
          style: { rotation: i === 0 ? -10 : 0 },
        },
      ],
    }))
  }, [template])

  const handleClick = (e) => {
    e.stopPropagation()
    try {
      console.log('Navigating to template:', template.id)
      navigate(`/editor/${template.id}`, {
        state: {
          id: template.id,
          templateId: template.id,
          templateName: template.name,
          backgroundColor: template.backgroundColor,
          primaryColor: template.primaryColor,
          thumbnailColors: template.thumbnailColors,
          slides: template.slides,
        },
      })
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  const CARD_H = 260
  const SLIDE_H = CARD_H - 24
  const SLIDE_W = Math.round(SLIDE_H * (280 / 480))

  return (
    <div className="group/card">
      <button
        type="button"
        onClick={handleClick}
        className="group relative flex w-full cursor-pointer overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        style={{
          height: CARD_H,
          backgroundColor: template.backgroundColor,
          zIndex: 1,
        }}
      >
        <div className="pointer-events-none flex h-full w-full items-center justify-center gap-1.5 overflow-hidden px-3 py-3">
          {slides.map((slide) => (
            <MiniSlide
              key={slide.id}
              slide={slide}
              width={SLIDE_W}
              height={SLIDE_H}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-3 pt-16 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
          <span className="text-sm font-semibold text-white drop-shadow-sm">
            {template.name}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs text-gray-800 shadow-sm backdrop-blur-sm">
            →
          </span>
        </div>
      </button>

      <div className="mt-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">{template.name}</span>
          {template.type === 'mockup' && (
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
              Mockup
            </span>
          )}
          {template.badge && <BadgePill label={template.badge} />}
        </div>
        <span className="text-xs text-gray-400">{slides.length} slides</span>
      </div>
    </div>
  )
}

export default TemplateCard
