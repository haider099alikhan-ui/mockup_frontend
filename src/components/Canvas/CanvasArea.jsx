import { memo, useCallback, useState, useMemo, useRef, useEffect } from 'react'
import SlideControls from './SlideControls'
import CanvasSlide from './CanvasSlide'
import ContextMenu from './ContextMenu'
import { ZoomOut, ZoomIn, Maximize2, Grid3x3, Magnet } from 'lucide-react'

function CanvasArea({
  slides,
  activeSlide,
  setActiveSlide,
  addSlide,
  copySlide,
  deleteSlide,
  moveSlideLeft,
  moveSlideRight,
  zoom,
  zoomIn,
  zoomOut,
  resetZoom,
  fitToViewport,
  showGrid,
  toggleGrid,
  snapToGrid,
  toggleSnapToGrid,
  gridSize,
  snapValue,
  updateElementOnSlide,
  selectedElementIds,
  onSelectElement,
  onDeleteElement,
  onDuplicateElement,
  bringElementForward,
  sendElementBackward,
  bringElementToFront,
  sendElementToBack,
  toggleElementVisibility,
  toggleElementLock,
}) {
  const [contextMenu, setContextMenu] = useState(null)
  const scrollContainerRef = useRef(null)
  const [isDraggingScroll, setIsDraggingScroll] = useState(false)
  const scrollStartRef = useRef({ x: 0, scrollLeft: 0 })
  const lastActiveSlideRef = useRef(activeSlide)

  const handleSetActiveSlide = useCallback(
    (index) => {
      setActiveSlide(index)
    },
    [setActiveSlide],
  )

  const handleZoomOut = useCallback(() => zoomOut(), [zoomOut])
  const handleZoomIn = useCallback(() => zoomIn(), [zoomIn])
  const handleResetZoom = useCallback(() => resetZoom(), [resetZoom])
  const handleFitToViewport = useCallback(() => fitToViewport(), [fitToViewport])

  const handleContextMenu = useCallback((e, elementId, elementType) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({ x: e.clientX, y: e.clientY, elementId, elementType })
  }, [])

  const closeContextMenu = useCallback(() => setContextMenu(null), [])

  // Handle horizontal mouse wheel scrolling (optimized)
  const handleWheel = useCallback((e) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    // Quick check if horizontal scroll is needed
    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth
    if (scrollWidth <= clientWidth) return false
    
    // Determine if this is a horizontal scroll gesture
    const deltaX = e.deltaX
    const deltaY = e.deltaY
    const isShiftWheel = e.shiftKey && deltaY !== 0
    const hasHorizontalDelta = deltaX !== 0
    const horizontalDominant = Math.abs(deltaX) > Math.abs(deltaY)
    
    if (isShiftWheel || hasHorizontalDelta || horizontalDominant) {
      e.preventDefault()
      e.stopPropagation()
      
      const scrollAmount = deltaX || (isShiftWheel ? deltaY : 0)
      if (scrollAmount !== 0) {
        const maxScroll = scrollWidth - clientWidth
        const newScrollLeft = container.scrollLeft + scrollAmount
        // Clamp to bounds in one operation
        container.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll))
      }
      return true
    }
    return false
  }, [])

  // Handle drag-to-scroll (optimized)
  const handleScrollMouseDown = useCallback((e) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    // Only start drag scroll if clicking directly on container background
    if (e.target === container) {
      setIsDraggingScroll(true)
      scrollStartRef.current = {
        x: e.clientX,
        scrollLeft: container.scrollLeft,
      }
      e.preventDefault()
    }
  }, [])

  // Optimized event listeners setup
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Add wheel listener with capture to catch events before slides
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    
    // Also add to parent canvas area to catch events anywhere
    const canvasArea = container.closest('.canvas-grid-background')
    const handleCanvasAreaWheel = (e) => {
      if (container && e.target instanceof Node && container.contains(e.target)) {
        handleWheel(e)
      }
    }
    if (canvasArea) {
      canvasArea.addEventListener('wheel', handleCanvasAreaWheel, { passive: false, capture: true })
    }

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true })
      if (canvasArea) {
        canvasArea.removeEventListener('wheel', handleCanvasAreaWheel, { capture: true })
      }
    }
  }, [handleWheel])

  // Separate effect for drag scrolling (only when dragging)
  useEffect(() => {
    if (!isDraggingScroll) return

    const container = scrollContainerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const dx = e.clientX - scrollStartRef.current.x
      container.scrollLeft = scrollStartRef.current.scrollLeft - dx
    }

    const handleMouseUp = () => {
      setIsDraggingScroll(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingScroll])

  // Initialize scroll position to leftmost on mount
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollLeft = 0
    }
  }, [slides.length]) // Reset when slides change

  // Auto-scroll to active slide only when it's not visible (optimized with requestAnimationFrame)
  useEffect(() => {
    if (activeSlide === lastActiveSlideRef.current) return
    
    const container = scrollContainerRef.current
    if (!container) return
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const slideElement = container.querySelector(`[data-slide-index="${activeSlide}"]`)
      if (!slideElement) return
      
      const containerRect = container.getBoundingClientRect()
      const slideRect = slideElement.getBoundingClientRect()
      
      // Only auto-scroll if the slide is not visible
      const isVisible = slideRect.left >= containerRect.left && slideRect.right <= containerRect.right
      if (!isVisible) {
        slideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
      }
    })
    
    lastActiveSlideRef.current = activeSlide
  }, [activeSlide])

  const contextElementIsLocked = useMemo(() => {
    if (!contextMenu) return false
    const slide = slides[activeSlide]
    if (!slide) return false
    const el = slide.elements.find((e) => e.id === contextMenu.elementId)
    return el?.isLocked || false
  }, [contextMenu, slides, activeSlide])

  return (
    <main
      className="flex flex-1 flex-col"
      style={{ backgroundColor: 'var(--canvas-bg)' }}
    >
      <div className="flex-1 canvas-grid-background overflow-hidden">
        <div className="flex h-full flex-col px-6 py-4">
          <SlideControls
            slides={slides}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            addSlide={addSlide}
            copySlide={copySlide}
            deleteSlide={deleteSlide}
            moveSlideLeft={moveSlideLeft}
            moveSlideRight={moveSlideRight}
          />

          <div 
            ref={scrollContainerRef}
            className="scroll-container mt-4 flex flex-1 items-center overflow-x-auto overflow-y-hidden"
            style={{ 
              scrollbarWidth: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              cursor: isDraggingScroll ? 'grabbing' : 'default',
              position: 'relative',
              overscrollBehaviorX: 'contain',
              minWidth: 0,
              width: '100%',
            }}
            onMouseDown={handleScrollMouseDown}
            onWheel={handleWheel}
            tabIndex={0}
            onKeyDown={(e) => {
              // Optimized arrow key navigation
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const container = scrollContainerRef.current
                if (!container) return
                
                e.preventDefault()
                const scrollAmount = 200
                const maxScroll = container.scrollWidth - container.clientWidth
                
                if (e.key === 'ArrowLeft') {
                  container.scrollLeft = Math.max(0, container.scrollLeft - scrollAmount)
                } else {
                  container.scrollLeft = Math.min(maxScroll, container.scrollLeft + scrollAmount)
                }
              }
            }}
          >
            <div 
              className="flex items-center gap-6 pb-4" 
              style={{ 
                minWidth: 'max-content', 
                paddingLeft: '2rem', 
                paddingRight: '2rem',
                flexShrink: 0,
              }}
            >
              {slides.map((slide, index) => (
                <div key={slide.id} data-slide-index={index} style={{ flexShrink: 0, minWidth: 'fit-content' }}>
                  <CanvasSlide
                    slide={slide}
                    index={index}
                    isActive={index === activeSlide}
                    zoom={zoom}
                    onClick={() => handleSetActiveSlide(index)}
                    updateElementOnSlide={updateElementOnSlide}
                    selectedElementIds={index === activeSlide ? selectedElementIds : []}
                    onSelectElement={onSelectElement}
                    onContextMenu={handleContextMenu}
                    showGrid={showGrid && index === activeSlide}
                    gridSize={gridSize}
                    snapValue={snapValue}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-700 text-gray-200 transition-all duration-150 ease-out hover:bg-[#222222] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <ZoomOut className="h-3 w-3" />
              </button>
              <span>{zoom}%</span>
              <button
                type="button"
                onClick={handleZoomIn}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-700 text-gray-200 transition-all duration-150 ease-out hover:bg-[#222222] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <ZoomIn className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset to 100%"
                className="ml-2 flex h-7 cursor-pointer items-center gap-1 rounded-md border border-gray-700 px-2 text-gray-200 transition-all duration-150 ease-out hover:bg-[#222222] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>100%</span>
              </button>
              <button
                type="button"
                onClick={handleFitToViewport}
                title="Fit to viewport"
                className="flex h-7 cursor-pointer items-center gap-1 rounded-md border border-gray-700 px-2 text-gray-200 transition-all duration-150 ease-out hover:bg-[#222222] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Maximize2 className="h-3 w-3" />
                <span>Fit</span>
              </button>
              <button
                type="button"
                onClick={toggleGrid}
                title={`${showGrid ? 'Hide' : 'Show'} Grid`}
                className={`ml-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border transition-all duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  showGrid
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'border-gray-700 text-gray-200 hover:bg-[#222222]'
                }`}
              >
                <Grid3x3 className="h-3 w-3" />
              </button>
              {showGrid && (
                <>
                  <button
                    type="button"
                    onClick={toggleSnapToGrid}
                    title={`${snapToGrid ? 'Disable' : 'Enable'} Snap to Grid`}
                    className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border transition-all duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      snapToGrid
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        : 'border-gray-700 text-gray-200 hover:bg-[#222222]'
                    }`}
                  >
                    <Magnet className="h-3 w-3" />
                  </button>
                  <div className="ml-2 flex items-center gap-1 rounded-md border border-gray-700 bg-[#1a1a1a] px-2">
                    <span className="text-[9px] text-gray-500">Grid:</span>
                    <input
                      type="number"
                      value={gridSize}
                      onChange={(e) => {
                        const val = Math.max(5, Math.min(50, Number(e.target.value) || 10))
                        setGridSize(val)
                        try {
                          localStorage.setItem('screensnap-grid-size', String(val))
                        } catch {}
                      }}
                      className="h-5 w-10 rounded border-0 bg-transparent text-center text-[10px] text-gray-300 outline-none"
                      min={5}
                      max={50}
                    />
                    <span className="text-[9px] text-gray-500">px</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-1">
              {slides.map((_, index) => (
                <span
                  key={slides[index].id}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === activeSlide ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          elementType={contextMenu.elementType}
          isLocked={contextElementIsLocked}
          onClose={closeContextMenu}
          onDuplicate={() => {
            onSelectElement(contextMenu.elementId)
            onDuplicateElement()
            closeContextMenu()
          }}
          onDelete={() => {
            onSelectElement(contextMenu.elementId)
            onDeleteElement()
            closeContextMenu()
          }}
          onBringForward={() => {
            bringElementForward(activeSlide, contextMenu.elementId)
            closeContextMenu()
          }}
          onSendBackward={() => {
            sendElementBackward(activeSlide, contextMenu.elementId)
            closeContextMenu()
          }}
          onBringToFront={() => {
            bringElementToFront(activeSlide, contextMenu.elementId)
            closeContextMenu()
          }}
          onSendToBack={() => {
            sendElementToBack(activeSlide, contextMenu.elementId)
            closeContextMenu()
          }}
          onToggleLock={() => {
            toggleElementLock(activeSlide, contextMenu.elementId)
          }}
          onToggleHide={() => {
            toggleElementVisibility(activeSlide, contextMenu.elementId)
          }}
        />
      )}
    </main>
  )
}

export default CanvasArea
