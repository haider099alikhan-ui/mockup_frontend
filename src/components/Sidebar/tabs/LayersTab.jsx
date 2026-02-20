import {
  Type,
  Smartphone,
  Circle,
  Award,
  Bookmark,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

const ELEMENT_TYPE_CONFIG = {
  text: { icon: Type, label: 'Text' },
  device: { icon: Smartphone, label: 'Device' },
  blob: { icon: Circle, label: 'Blob' },
  badge: { icon: Award, label: 'Badge' },
  branding: { icon: Bookmark, label: 'Branding' },
}

function getElementPreview(element) {
  if (element.type === 'text' && element.content) {
    const text = element.content.replace(/\n/g, ' ')
    return text.length > 20 ? text.slice(0, 20) + '…' : text
  }
  const config = ELEMENT_TYPE_CONFIG[element.type]
  return config?.label || element.type
}

function LayersTab({
  slides,
  activeSlide,
  selectedElementIds,
  onSelectElement,
  onReorderElements,
  onToggleVisibility,
  onToggleLock,
}) {
  const currentSlide = slides[activeSlide]
  const elements = currentSlide?.elements || []
  const reversedElements = [...elements].reverse()

  const handleMoveUp = (originalIndex) => {
    if (originalIndex >= elements.length - 1) return
    const next = [...elements]
    ;[next[originalIndex], next[originalIndex + 1]] = [next[originalIndex + 1], next[originalIndex]]
    onReorderElements(activeSlide, next)
  }

  const handleMoveDown = (originalIndex) => {
    if (originalIndex <= 0) return
    const next = [...elements]
    ;[next[originalIndex], next[originalIndex - 1]] = [next[originalIndex - 1], next[originalIndex]]
    onReorderElements(activeSlide, next)
  }

  return (
    <div className="animate-fade-slide-in space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-200">Layers</h3>
        <span className="text-[10px] text-gray-500">Slide #{activeSlide + 1}</span>
      </div>

      {elements.length === 0 ? (
        <p className="py-6 text-center text-[11px] text-gray-500">
          No elements on this slide
        </p>
      ) : (
        <div className="space-y-0.5">
          {reversedElements.map((element) => {
            const originalIndex = elements.indexOf(element)
            const isSelected = selectedElementIds.includes(element.id)
            const config = ELEMENT_TYPE_CONFIG[element.type] || { icon: Circle, label: 'Element' }
            const Icon = config.icon
            const isFirst = originalIndex === elements.length - 1
            const isLast = originalIndex === 0

            return (
              <div
                key={element.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectElement(element.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectElement(element.id)
                  }
                }}
                className={`group flex h-8 items-center gap-1 rounded-md px-1 text-[11px] transition-all duration-100 cursor-pointer ${
                  isSelected
                    ? 'border-l-2 border-blue-500 bg-[#252525] text-white'
                    : 'border-l-2 border-transparent bg-[#1a1a1a] text-gray-300 hover:bg-[#222222]'
                }`}
              >
                <GripVertical className="h-3 w-3 flex-shrink-0 text-gray-600" />

                <Icon className="h-3 w-3 flex-shrink-0 text-gray-400" />

                <span
                  className={`min-w-0 flex-1 truncate ${element.isHidden ? 'opacity-40' : ''}`}
                >
                  {getElementPreview(element)}
                </span>

                <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                  <button
                    type="button"
                    title="Move up"
                    disabled={isFirst}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMoveUp(originalIndex)
                    }}
                    className="rounded p-0.5 text-gray-400 hover:bg-[#333] hover:text-white disabled:pointer-events-none disabled:opacity-20"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    title="Move down"
                    disabled={isLast}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMoveDown(originalIndex)
                    }}
                    className="rounded p-0.5 text-gray-400 hover:bg-[#333] hover:text-white disabled:pointer-events-none disabled:opacity-20"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <button
                  type="button"
                  title={element.isHidden ? 'Show' : 'Hide'}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleVisibility(activeSlide, element.id)
                  }}
                  className="rounded p-0.5 text-gray-400 hover:bg-[#333] hover:text-white"
                >
                  {element.isHidden ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </button>

                <button
                  type="button"
                  title={element.isLocked ? 'Unlock' : 'Lock'}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleLock(activeSlide, element.id)
                  }}
                  className="rounded p-0.5 text-gray-400 hover:bg-[#333] hover:text-white"
                >
                  {element.isLocked ? (
                    <Lock className="h-3 w-3 text-yellow-500" />
                  ) : (
                    <Unlock className="h-3 w-3" />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LayersTab
