import { memo, useCallback, useMemo, useRef, useState } from 'react'
import DeviceFrame from './elements/DeviceFrame'
import TextElement from './elements/TextElement'
import BlobElement from './elements/BlobElement'
import BrandingElement from './elements/BrandingElement'
import BadgeElement from './elements/BadgeElement'
import { computeSnapGuides, SnapGuideLines } from '../../utils/snapGuides.jsx'

const DISPLAY_WIDTH = 280
const DISPLAY_HEIGHT = 480

function CanvasSlide({
  slide,
  index,
  isActive,
  zoom,
  onClick,
  updateElementOnSlide,
  selectedElementIds,
  onSelectElement,
  onContextMenu,
  showGrid,
  gridSize,
  snapValue,
}) {
  const scale = useMemo(() => zoom / 100, [zoom])
  const innerRef = useRef(null)
  const [activeGuides, setActiveGuides] = useState([])
  const [selectionBox, setSelectionBox] = useState(null)
  const selectionStartRef = useRef(null)
  const selectionBoxRef = useRef(null)

  const handleElementChange = useCallback(
    (elementId, updates) => {
      updateElementOnSlide(index, elementId, updates)
    },
    [index, updateElementOnSlide],
  )

  const handleSnapCompute = useCallback(
    (movingElement) => {
      const otherElements = slide.elements.filter(
        (el) => el.id !== movingElement.id && !el.isHidden,
      )
      const result = computeSnapGuides(
        movingElement,
        otherElements,
        DISPLAY_WIDTH,
        DISPLAY_HEIGHT,
      )
      setActiveGuides(result.guides)
      return result
    },
    [slide.elements],
  )

  const handleDragEnd = useCallback(() => {
    setActiveGuides([])
  }, [])

  const handleSelect = useCallback(
    (elementId, isShiftClick = false) => {
      onSelectElement?.(elementId, isShiftClick)
    },
    [onSelectElement],
  )

  const toCanvasCoords = useCallback(
    (clientX, clientY) => {
      const rect = innerRef.current?.getBoundingClientRect()
      if (!rect) return { x: clientX, y: clientY }
      return {
        x: (clientX - rect.left) / scale,
        y: (clientY - rect.top) / scale,
      }
    },
    [scale],
  )

  const handleCanvasMouseDown = useCallback(
    (e) => {
      // Don't interfere with scroll container wheel events
      if (e.type === 'wheel') return
      
      // Check if we're clicking on an element
      const clickedElement = e.target.closest('[data-element-id]')
      if (clickedElement) return // Let element handle its own click
      
      // Only start selection if clicking on canvas background
      const isCanvasClick = e.target === innerRef.current || 
                           e.target === innerRef.current?.parentElement ||
                           (innerRef.current && innerRef.current.contains(e.target))
      
      if (!isCanvasClick) return
      
      onClick()
      
      // Start selection box
      const isShiftKey = e.shiftKey
      const pos = toCanvasCoords(e.clientX, e.clientY)
      selectionStartRef.current = { ...pos, shiftKey: isShiftKey }
      setSelectionBox({ x: pos.x, y: pos.y, width: 0, height: 0 })
      
      const onMove = (moveEvent) => {
        const currentPos = toCanvasCoords(moveEvent.clientX, moveEvent.clientY)
        const start = selectionStartRef.current
        if (start) {
          const x = Math.min(start.x, currentPos.x)
          const y = Math.min(start.y, currentPos.y)
          const width = Math.abs(currentPos.x - start.x)
          const height = Math.abs(currentPos.y - start.y)
          const box = { x, y, width, height }
          selectionBoxRef.current = box
          setSelectionBox(box)
        }
      }
      
      const onUp = (upEvent) => {
        const start = selectionStartRef.current
        const currentBox = selectionBoxRef.current || { x: 0, y: 0, width: 0, height: 0 }
        
        if (start && (currentBox.width > 5 || currentBox.height > 5)) {
          // Find elements that intersect with selection box
          const box = {
            x: currentBox.x,
            y: currentBox.y,
            width: currentBox.width,
            height: currentBox.height,
          }
          
          const selectedIds = slide.elements
            .filter((el) => {
              if (el.isHidden) return false
              // Check if element intersects with selection box
              const elRight = el.x + el.width
              const elBottom = el.y + el.height
              const boxRight = box.x + box.width
              const boxBottom = box.y + box.height
              
              return !(
                elRight < box.x ||
                el.x > boxRight ||
                elBottom < box.y ||
                el.y > boxBottom
              )
            })
            .map((el) => el.id)
          
          if (selectedIds.length > 0) {
            // Add to selection (or replace if not holding Shift)
            if (start.shiftKey) {
              // Add to existing selection
              selectedIds.forEach((id) => {
                if (!selectedElementIds.includes(id)) {
                  onSelectElement?.(id, true)
                }
              })
            } else {
              // Replace selection
              onSelectElement?.(selectedIds[0], false)
              selectedIds.slice(1).forEach((id) => {
                onSelectElement?.(id, true)
              })
            }
          } else if (!start.shiftKey) {
            // Clear selection if clicking empty space
            onSelectElement?.(null)
          }
        } else if (!start?.shiftKey) {
          // Small click without drag - clear selection
          onSelectElement?.(null)
        }
        
        setSelectionBox(null)
        selectionBoxRef.current = null
        selectionStartRef.current = null
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [onClick, onSelectElement, selectedElementIds, slide.elements, selectionBox, toCanvasCoords],
  )

  const handleCanvasClick = useCallback(() => {
    onClick()
    if (!selectionBox) {
      onSelectElement?.(null)
    }
  }, [onClick, onSelectElement, selectionBox])

  const handleElementContextMenu = useCallback(
    (e, elementId, elementType) => {
      onContextMenu?.(e, elementId, elementType)
    },
    [onContextMenu],
  )

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        role="button"
        tabIndex={0}
        onClick={handleCanvasClick}
        onMouseDown={handleCanvasMouseDown}
        onWheel={(e) => {
          // Don't prevent wheel events - let parent scroll container handle them
          // Only prevent if we're actually interacting with elements inside
          const isElementInteraction = e.target.closest('[data-element-id]')
          if (!isElementInteraction && e.shiftKey) {
            // Shift+wheel should scroll horizontally, let parent handle it
            return
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') handleCanvasClick()
        }}
        className={`relative overflow-hidden rounded-xl border transition-all duration-200 ease-out will-change-transform ${
          isActive
            ? 'border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.7)]'
            : 'border-gray-800'
        } hover:scale-[1.02]`}
        style={{
          width: DISPLAY_WIDTH * scale,
          height: DISPLAY_HEIGHT * scale,
          backgroundColor: slide.backgroundColor?.startsWith('linear-gradient')
            ? undefined
            : slide.backgroundColor,
          background: slide.backgroundColor?.startsWith('linear-gradient')
            ? slide.backgroundColor
            : undefined,
          transformOrigin: 'top left',
          position: 'relative',
        }}
        data-slide-export
      >
        <div
          ref={innerRef}
          className="relative"
          style={{
            width: DISPLAY_WIDTH,
            height: DISPLAY_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {slide.elements.map((element) => {
            if (element.isHidden) return null

            if (element.type === 'blob') {
              return <BlobElement key={element.id} element={element} />
            }
            if (element.type === 'branding') {
              return <BrandingElement key={element.id} element={element} />
            }
            if (element.type === 'badge') {
              return <BadgeElement key={element.id} element={element} />
            }
            if (element.type === 'device') {
              return (
                <DeviceFrame
                  key={element.id}
                  element={element}
                  onChange={handleElementChange}
                  isSelected={selectedElementIds.includes(element.id)}
                  onSelect={handleSelect}
                  containerRef={innerRef}
                  canvasScale={scale}
                  onContextMenu={handleElementContextMenu}
                  onSnapCompute={handleSnapCompute}
                  onDragEnd={handleDragEnd}
                  snapValue={snapValue}
                />
              )
            }
            if (element.type === 'text') {
              return (
                <TextElement
                  key={element.id}
                  element={element}
                  onChange={handleElementChange}
                  isSelected={selectedElementIds.includes(element.id)}
                  onSelect={handleSelect}
                  containerRef={innerRef}
                  canvasScale={scale}
                  onContextMenu={handleElementContextMenu}
                  onSnapCompute={handleSnapCompute}
                  onDragEnd={handleDragEnd}
                  snapValue={snapValue}
                />
              )
            }
            return null
          })}

          {activeGuides.length > 0 && (
            <SnapGuideLines
              guides={activeGuides}
              canvasWidth={DISPLAY_WIDTH}
              canvasHeight={DISPLAY_HEIGHT}
            />
          )}

          {/* Selection box overlay */}
          {selectionBox && selectionBox.width > 0 && selectionBox.height > 0 && (
            <div
              className="pointer-events-none absolute border-2 border-blue-500 bg-blue-500/10"
              style={{
                left: selectionBox.x,
                top: selectionBox.y,
                width: selectionBox.width,
                height: selectionBox.height,
              }}
            />
          )}

          {/* Grid overlay */}
          {showGrid && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: `${gridSize}px ${gridSize}px`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(CanvasSlide)
