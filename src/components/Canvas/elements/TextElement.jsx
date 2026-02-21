import { memo, useCallback, useRef, useState } from 'react'

function TextElement({ element, onChange, isSelected, onSelect, containerRef, canvasScale, onContextMenu, onSnapCompute, onDragEnd, snapValue }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, elX: 0, elY: 0 })
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })

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
      if (isEditing) return
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
    [element.id, element.x, element.y, isEditing, onChange, onSelect, toCanvasCoords],
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
          width: Math.max(30, resizeStart.current.w + dx),
          height: Math.max(20, resizeStart.current.h + dy),
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

  const handleDoubleClick = useCallback(
    (event) => {
      event.stopPropagation()
      setIsEditing(true)
    },
    [],
  )

  const handleChange = useCallback(
    (event) => {
      onChange(element.id, { content: event.target.value })
    },
    [element.id, onChange],
  )

  const handleBlur = useCallback(() => {
    setIsEditing(false)
  }, [])

  const style = element.style || {}

  return (
    <div
      data-element-id={element.id}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        cursor: isEditing ? 'text' : isDragging || isResizing ? 'grabbing' : 'grab',
        opacity: element.isLocked ? 0.7 : 1,
        pointerEvents: element.isLocked ? 'none' : 'auto',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onContextMenu?.(e, element.id, 'text')
      }}
    >
      {isSelected && !isEditing && (
        <>
          <div
            className="pointer-events-none absolute -inset-1 border-2 border-blue-500"
            style={{ zIndex: 50 }}
          />
          <div
            onMouseDown={handleResizeDown}
            className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-nwse-resize rounded-full border-2 border-blue-500 bg-white"
            style={{ zIndex: 51 }}
          />
        </>
      )}
      {isEditing ? (
        <textarea
          value={element.content}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="h-full w-full resize-none border-2 border-blue-500 bg-black/40 p-1 outline-none"
          style={{
            fontSize: style.fontSize || 20,
            fontWeight: style.fontWeight || '600',
            textAlign: style.align || 'left',
            color: style.color || '#ffffff',
            lineHeight: style.lineHeight ? (style.lineHeight > 3 ? `${style.lineHeight}px` : style.lineHeight) : 1.1,
            fontFamily: style.fontFamily || 'inherit',
            fontStyle: style.fontStyle || 'normal',
            textDecoration: style.textDecoration || 'none',
          }}
        />
      ) : (
        <div
          className="whitespace-pre-line"
          style={{
            fontSize: style.fontSize || 20,
            fontWeight: style.fontWeight || '600',
            textAlign: style.align || 'left',
            color: style.color || '#ffffff',
            lineHeight: style.lineHeight ? (style.lineHeight > 3 ? `${style.lineHeight}px` : style.lineHeight) : 1.1,
            fontFamily: style.fontFamily || 'inherit',
            fontStyle: style.fontStyle || 'normal',
            textDecoration: style.textDecoration || 'none',
            textShadow: style.textShadow || 'none',
            WebkitTextStroke: style.webkitTextStroke || 'unset',
            opacity: style.opacity !== undefined ? style.opacity : 1,
          }}
        >
          {element.content}
        </div>
      )}
    </div>
  )
}

export default memo(TextElement)
