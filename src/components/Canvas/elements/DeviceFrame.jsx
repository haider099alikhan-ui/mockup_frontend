import { memo, useCallback, useRef, useState } from 'react'
import { AppStoreScreen, SocialMediaScreen, EcommerceScreen, DashboardScreen, FitnessScreen, MusicScreen } from './DetailedScreen'

function WireframeScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-white px-[8%] pb-[4%] pt-[12%]">
      <div className="mb-[6%] flex items-center justify-between">
        <div className="h-[3px] w-[22%] rounded-full bg-gray-200" />
        <div className="flex gap-[4%]">
          <div className="h-[7px] w-[7px] rounded-full bg-gray-200" />
          <div className="h-[7px] w-[7px] rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="mb-[5%] h-[20%] w-full rounded-xl bg-gray-100" />
      <div className="mb-[4%] flex gap-[4%]">
        <div className="h-[14px] flex-1 rounded-md bg-gray-200" />
        <div className="h-[14px] flex-1 rounded-md bg-gray-100" />
        <div className="h-[14px] flex-1 rounded-md bg-gray-100" />
      </div>
      <div className="space-y-[8%]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-[5%]">
            <div className="h-[14px] w-[14px] shrink-0 rounded-md bg-gray-100" />
            <div className="flex-1 space-y-[4px]">
              <div className="h-[3px] w-[75%] rounded-full bg-gray-200" />
              <div className="h-[2px] w-[55%] rounded-full bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-around border-t border-gray-100 pt-[5%]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-[2px]">
            <div className="h-[5px] w-[5px] rounded bg-gray-200" />
            <div className="h-[2px] w-[10px] rounded-full bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  )
}

function DeviceFrame({ element, onChange, isSelected, onSelect, containerRef, canvasScale, onContextMenu, onSnapCompute, onDragEnd, snapValue }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, elX: 0, elY: 0 })
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })
  const fileInputRef = useRef(null)

  const toCanvasCoords = useCallback(
    (clientX, clientY) => {
      const rect = containerRef?.current?.getBoundingClientRect()
      if (!rect) return { x: clientX, y: clientY }
      const s = canvasScale || 1
      return {
        x: (clientX - rect.left) / s,
        y: (clientY - rect.top) / s,
      }
    },
    [containerRef, canvasScale],
  )

  const handleMouseDown = useCallback(
    (event) => {
      event.stopPropagation()
      const isShiftClick = event.shiftKey
      onSelect?.(element.id, isShiftClick)
      const pos = toCanvasCoords(event.clientX, event.clientY)
      dragStart.current = { x: pos.x, y: pos.y, elX: element.x, elY: element.y }
      setIsDragging(true)

      const onMove = (e) => {
        const cur = toCanvasCoords(e.clientX, e.clientY)
        const dx = cur.x - dragStart.current.x
        const dy = cur.y - dragStart.current.y
        let newX = dragStart.current.elX + dx
        let newY = dragStart.current.elY + dy
        
        // Apply snap-to-grid if enabled
        if (snapValue) {
          newX = snapValue(newX)
          newY = snapValue(newY)
        }
        
        if (onSnapCompute) {
          const snap = onSnapCompute({ ...element, x: newX, y: newY })
          if (snap.snappedX !== null) newX = snap.snappedX
          if (snap.snappedY !== null) newY = snap.snappedY
        }
        onChange(element.id, { x: newX, y: newY })
      }
      const onUp = () => {
        setIsDragging(false)
        onDragEnd?.()
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [element.id, element.x, element.y, onChange, onSelect, toCanvasCoords, snapValue, onSnapCompute, element, onDragEnd],
  )

  const handleResizeDown = useCallback(
    (event) => {
      event.stopPropagation()
      event.preventDefault()
      const pos = toCanvasCoords(event.clientX, event.clientY)
      resizeStart.current = { x: pos.x, y: pos.y, w: element.width, h: element.height }
      setIsResizing(true)

      const onMove = (e) => {
        const cur = toCanvasCoords(e.clientX, e.clientY)
        const dx = cur.x - resizeStart.current.x
        const dy = cur.y - resizeStart.current.y
        onChange(element.id, {
          width: Math.max(40, resizeStart.current.w + dx),
          height: Math.max(70, resizeStart.current.h + dy),
        })
      }
      const onUp = () => {
        setIsResizing(false)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [element.id, element.width, element.height, onChange, toCanvasCoords],
  )


  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0]
      if (!file) return
      try {
        const url = URL.createObjectURL(file)
        setIsLoadingImage(true)
        onChange(element.id, { screenshot: url })
      } catch { /* noop */ }
    },
    [element.id, onChange],
  )

  const rotation = element.style?.rotation || 0
  const borderRadius = Math.min(element.width, element.height) * 0.18
  const screenRadius = borderRadius * 0.82

  return (
    <div
      role="button"
      tabIndex={0}
      data-element-id={element.id}
      onMouseDown={handleMouseDown}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onContextMenu?.(e, element.id, 'device')
      }}
      onKeyDown={() => {}}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
        opacity: element.isLocked ? 0.7 : 1,
        pointerEvents: element.isLocked ? 'none' : 'auto',
      }}
      className={isDragging || isResizing ? 'cursor-grabbing' : 'cursor-grab'}
    >
      {isSelected && (
        <>
          <div
            className="pointer-events-none absolute -inset-1 border-2 border-blue-500"
            style={{ zIndex: 50, borderRadius: borderRadius + 4 }}
          />
          <div
            onMouseDown={handleResizeDown}
            className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-nwse-resize rounded-full border-2 border-blue-500 bg-white"
            style={{ zIndex: 51 }}
          />
        </>
      )}
      <div
        className="relative flex h-full w-full items-center justify-center bg-black shadow-2xl will-change-transform"
        style={{ borderRadius, border: '2px solid #333' }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-black"
          style={{
            top: element.height * 0.018,
            width: element.width * 0.28,
            height: element.height * 0.022,
            borderRadius: 99,
            zIndex: 10,
          }}
        />
        {/* Side button right */}
        <div
          className="absolute bg-gray-600"
          style={{
            right: -1.5,
            top: element.height * 0.2,
            width: 1.5,
            height: element.height * 0.08,
            borderRadius: '0 2px 2px 0',
          }}
        />
        {/* Volume buttons left */}
        <div
          className="absolute bg-gray-600"
          style={{
            left: -1.5,
            top: element.height * 0.18,
            width: 1.5,
            height: element.height * 0.05,
            borderRadius: '2px 0 0 2px',
          }}
        />
        <div
          className="absolute bg-gray-600"
          style={{
            left: -1.5,
            top: element.height * 0.26,
            width: 1.5,
            height: element.height * 0.05,
            borderRadius: '2px 0 0 2px',
          }}
        />
        <button
          type="button"
          onDoubleClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            fileInputRef.current?.click()
          }}
          onMouseDown={(e) => {
            // Don't stop propagation - allow parent drag handler to work
            // This allows dragging to work normally
          }}
          className="group relative overflow-hidden"
          style={{
            width: '92%',
            height: '95%',
            borderRadius: screenRadius,
            backgroundColor: '#111',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {element.screenshot ? (
            <>
              <img
                src={element.screenshot}
                alt="Device screenshot"
                loading="lazy"
                onLoad={() => setIsLoadingImage(false)}
                className="h-full w-full object-cover transition-opacity duration-200 ease-out"
              />
              {isLoadingImage && (
                <div className="absolute inset-0 animate-pulse-soft bg-gray-800/60" />
              )}
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
                <span className="mb-2 rounded-full bg-black/60 px-3 py-1 text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Change Photo
                </span>
              </div>
            </>
          ) : element.screenType ? (
            // Show detailed screen preview based on screenType
            (() => {
              const screens = {
                'app-store': <AppStoreScreen />,
                'social': <SocialMediaScreen />,
                'ecommerce': <EcommerceScreen />,
                'dashboard': <DashboardScreen />,
                'fitness': <FitnessScreen />,
                'music': <MusicScreen />,
              }
              return screens[element.screenType] || <WireframeScreen />
            })()
          ) : (
            <WireframeScreen />
          )}
        </button>
      </div>
    </div>
  )
}

export default memo(DeviceFrame)
