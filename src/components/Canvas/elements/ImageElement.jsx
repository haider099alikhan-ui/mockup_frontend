import { memo, useCallback, useRef, useState } from 'react'

function ImageElement({ element, onChange, isSelected, onSelect, containerRef, canvasScale, onContextMenu, onSnapCompute, onDragEnd, snapValue }) {
    const [isDragging, setIsDragging] = useState(false)
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

                if (snapValue) {
                    newX = snapValue(newX)
                    newY = snapValue(newY)
                }

                if (onSnapCompute) {
                    const snap = onSnapCompute({ ...element, x: newX, y: newY })
                    if (snap.snappedX !== null) newX = snap.snappedX
                    if (snap.snappedY !== null) newY = snap.snappedY
                }
                onChange?.(element.id, { x: newX, y: newY })
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
        [element.id, element.x, element.y, onChange, onSelect, toCanvasCoords, snapValue, onSnapCompute, onDragEnd],
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
                onChange?.(element.id, {
                    width: Math.max(10, resizeStart.current.w + dx),
                    height: Math.max(10, resizeStart.current.h + dy),
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

    const fileInputRef = useRef(null)

    const handleFileChange = useCallback(
        (event) => {
            const file = event.target.files?.[0]
            if (!file) return
            try {
                const url = URL.createObjectURL(file)
                onChange?.(element.id, { src: url })
            } catch { /* noop */ }
        },
        [element.id, onChange],
    )

    const { src, style = {} } = element

    return (
        <div
            data-element-id={element.id}
            style={{
                position: 'absolute',
                top: element.y,
                left: element.x,
                width: `${element.width}px`,
                height: `${element.height}px`,
                cursor: isDragging || isResizing ? 'grabbing' : 'pointer',
                opacity: element.isLocked ? 0.7 : 1,
                pointerEvents: element.isLocked ? 'none' : 'auto',
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                fileInputRef.current?.click()
            }}
            onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onContextMenu?.(e, element.id, 'image')
            }}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            {isSelected && (
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
            <img
                src={src}
                alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: style.objectFit || 'fill',
                    pointerEvents: 'none',
                    ...style,
                }}
                draggable={false}
            />
        </div>
    )
}

export default memo(ImageElement)
