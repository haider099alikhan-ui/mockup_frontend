import { useMemo } from 'react'
import { Move, Maximize2, RotateCw, Palette, Eye, AlignHorizontalJustifyCenter, AlignVerticalJustifyCenter, AlignStartHorizontal, AlignEndHorizontal, AlignStartVertical, AlignEndVertical, Space } from 'lucide-react'

function BulkEditPanel({ selectedElements, onUpdateElements }) {
  if (!selectedElements || selectedElements.length < 2) return null

  // Calculate common properties
  const commonProps = useMemo(() => {
    const allText = selectedElements.every((el) => el.type === 'text')
    const allDevice = selectedElements.every((el) => el.type === 'device')
    const allSameType = allText || allDevice

    // Get bounds
    const minX = Math.min(...selectedElements.map((el) => el.x))
    const minY = Math.min(...selectedElements.map((el) => el.y))
    const maxX = Math.max(...selectedElements.map((el) => el.x + el.width))
    const maxY = Math.max(...selectedElements.map((el) => el.y + el.height))

    // Average values
    const avgX = selectedElements.reduce((sum, el) => sum + el.x, 0) / selectedElements.length
    const avgY = selectedElements.reduce((sum, el) => sum + el.y, 0) / selectedElements.length
    const avgWidth = selectedElements.reduce((sum, el) => sum + el.width, 0) / selectedElements.length
    const avgHeight = selectedElements.reduce((sum, el) => sum + el.height, 0) / selectedElements.length

    // Common color (for text elements)
    const commonColor =
      allText && selectedElements.every((el) => el.style?.color === selectedElements[0].style?.color)
        ? selectedElements[0].style?.color || '#ffffff'
        : null

    // Common rotation
    const rotations = selectedElements.map((el) => el.style?.rotation || 0)
    const commonRotation = rotations.every((r) => r === rotations[0]) ? rotations[0] : null

    // Common opacity
    const opacities = selectedElements.map((el) => el.style?.opacity ?? 1)
    const commonOpacity = opacities.every((o) => o === opacities[0]) ? opacities[0] : null

    return {
      allText,
      allDevice,
      allSameType,
      bounds: { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY },
      averages: { avgX, avgY, avgWidth, avgHeight },
      commonColor,
      commonRotation,
      commonOpacity,
    }
  }, [selectedElements])

  const handlePositionChange = (axis, value, isOffset = false) => {
    if (isOffset) {
      // Apply offset to all elements
      selectedElements.forEach((el) => {
        const newValue = axis === 'x' ? el.x + Number(value) : el.y + Number(value)
        onUpdateElements(el.id, { [axis]: Math.max(0, newValue) })
      })
    } else {
      // Set absolute position (move all relative to first element)
      const firstEl = selectedElements[0]
      const offset = axis === 'x' ? Number(value) - firstEl.x : Number(value) - firstEl.y
      selectedElements.forEach((el) => {
        const newValue = axis === 'x' ? el.x + offset : el.y + offset
        onUpdateElements(el.id, { [axis]: Math.max(0, newValue) })
      })
    }
  }

  const handleSizeChange = (axis, value, isScale = false) => {
    if (isScale) {
      // Scale proportionally
      const scale = Number(value) / 100
      selectedElements.forEach((el) => {
        const newWidth = Math.max(10, el.width * scale)
        const newHeight = Math.max(10, el.height * scale)
        onUpdateElements(el.id, { width: newWidth, height: newHeight })
      })
    } else {
      // Set absolute size
      const firstEl = selectedElements[0]
      const scale = axis === 'w' ? Number(value) / firstEl.width : Number(value) / firstEl.height
      selectedElements.forEach((el) => {
        const newWidth = axis === 'w' ? Number(value) : Math.max(10, el.width * scale)
        const newHeight = axis === 'h' ? Number(value) : Math.max(10, el.height * scale)
        onUpdateElements(el.id, { width: newWidth, height: newHeight })
      })
    }
  }

  const handleRotationChange = (value) => {
    selectedElements.forEach((el) => {
      onUpdateElements(el.id, {
        style: { ...el.style, rotation: Number(value) },
      })
    })
  }

  const handleColorChange = (color) => {
    selectedElements.forEach((el) => {
      if (el.type === 'text') {
        onUpdateElements(el.id, {
          style: { ...el.style, color },
        })
      }
    })
  }

  const handleOpacityChange = (opacity) => {
    selectedElements.forEach((el) => {
      onUpdateElements(el.id, {
        style: { ...el.style, opacity: Number(opacity) / 100 },
      })
    })
  }

  // Alignment functions
  const alignLeft = () => {
    const minX = Math.min(...selectedElements.map((el) => el.x))
    selectedElements.forEach((el) => {
      onUpdateElements(el.id, { x: minX })
    })
  }

  const alignCenter = () => {
    const minX = Math.min(...selectedElements.map((el) => el.x))
    const maxX = Math.max(...selectedElements.map((el) => el.x + el.width))
    const centerX = (minX + maxX) / 2
    selectedElements.forEach((el) => {
      const elementCenterX = el.x + el.width / 2
      const offset = centerX - elementCenterX
      onUpdateElements(el.id, { x: el.x + offset })
    })
  }

  const alignRight = () => {
    const maxX = Math.max(...selectedElements.map((el) => el.x + el.width))
    selectedElements.forEach((el) => {
      onUpdateElements(el.id, { x: maxX - el.width })
    })
  }

  const alignTop = () => {
    const minY = Math.min(...selectedElements.map((el) => el.y))
    selectedElements.forEach((el) => {
      onUpdateElements(el.id, { y: minY })
    })
  }

  const alignMiddle = () => {
    const minY = Math.min(...selectedElements.map((el) => el.y))
    const maxY = Math.max(...selectedElements.map((el) => el.y + el.height))
    const centerY = (minY + maxY) / 2
    selectedElements.forEach((el) => {
      const elementCenterY = el.y + el.height / 2
      const offset = centerY - elementCenterY
      onUpdateElements(el.id, { y: el.y + offset })
    })
  }

  const alignBottom = () => {
    const maxY = Math.max(...selectedElements.map((el) => el.y + el.height))
    selectedElements.forEach((el) => {
      onUpdateElements(el.id, { y: maxY - el.height })
    })
  }

  // Distribution functions
  const distributeHorizontally = () => {
    if (selectedElements.length < 3) return
    
    const sorted = [...selectedElements].sort((a, b) => a.x - b.x)
    const leftmost = sorted[0].x
    const rightmost = sorted[sorted.length - 1].x + sorted[sorted.length - 1].width
    const totalWidth = rightmost - leftmost
    const totalElementWidth = sorted.reduce((sum, el) => sum + el.width, 0)
    const gap = (totalWidth - totalElementWidth) / (sorted.length - 1)
    
    let currentX = leftmost
    sorted.forEach((el) => {
      onUpdateElements(el.id, { x: currentX })
      currentX += el.width + gap
    })
  }

  const distributeVertically = () => {
    if (selectedElements.length < 3) return
    
    const sorted = [...selectedElements].sort((a, b) => a.y - b.y)
    const topmost = sorted[0].y
    const bottommost = sorted[sorted.length - 1].y + sorted[sorted.length - 1].height
    const totalHeight = bottommost - topmost
    const totalElementHeight = sorted.reduce((sum, el) => sum + el.height, 0)
    const gap = (totalHeight - totalElementHeight) / (sorted.length - 1)
    
    let currentY = topmost
    sorted.forEach((el) => {
      onUpdateElements(el.id, { y: currentY })
      currentY += el.height + gap
    })
  }

  const distributeEvenly = () => {
    if (selectedElements.length < 3) return
    
    // Calculate bounding box
    const minX = Math.min(...selectedElements.map((el) => el.x))
    const maxX = Math.max(...selectedElements.map((el) => el.x + el.width))
    const minY = Math.min(...selectedElements.map((el) => el.y))
    const maxY = Math.max(...selectedElements.map((el) => el.y + el.height))
    
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    
    // Arrange in a grid-like pattern
    const cols = Math.ceil(Math.sqrt(selectedElements.length))
    const rows = Math.ceil(selectedElements.length / cols)
    const cellWidth = (maxX - minX) / cols
    const cellHeight = (maxY - minY) / rows
    
    selectedElements.forEach((el, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      const targetX = minX + col * cellWidth + cellWidth / 2 - el.width / 2
      const targetY = minY + row * cellHeight + cellHeight / 2 - el.height / 2
      onUpdateElements(el.id, { x: Math.max(0, targetX), y: Math.max(0, targetY) })
    })
  }

  return (
    <div className="animate-fade-slide-in space-y-4">
      <div className="flex items-center justify-between border-b border-gray-700 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          Bulk Edit ({selectedElements.length} selected)
        </span>
      </div>

      {/* Alignment & Distribution */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
          <Space className="h-3 w-3" />
          Align & Distribute
        </label>
        <div className="space-y-2">
          {/* Horizontal Alignment */}
          <div>
            <span className="mb-1 block text-[9px] text-gray-500">Horizontal</span>
            <div className="flex gap-1">
              {[
                { icon: AlignStartHorizontal, title: 'Align Left', fn: alignLeft },
                { icon: AlignHorizontalJustifyCenter, title: 'Align Center', fn: alignCenter },
                { icon: AlignEndHorizontal, title: 'Align Right', fn: alignRight },
              ].map(({ icon: Icon, title, fn }) => (
                <button
                  key={title}
                  type="button"
                  onClick={fn}
                  title={title}
                  className="flex h-8 flex-1 items-center justify-center rounded-md border border-gray-700 text-gray-400 transition-all hover:bg-[#333] hover:text-white active:scale-90"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Vertical Alignment */}
          <div>
            <span className="mb-1 block text-[9px] text-gray-500">Vertical</span>
            <div className="flex gap-1">
              {[
                { icon: AlignStartVertical, title: 'Align Top', fn: alignTop },
                { icon: AlignVerticalJustifyCenter, title: 'Align Middle', fn: alignMiddle },
                { icon: AlignEndVertical, title: 'Align Bottom', fn: alignBottom },
              ].map(({ icon: Icon, title, fn }) => (
                <button
                  key={title}
                  type="button"
                  onClick={fn}
                  title={title}
                  className="flex h-8 flex-1 items-center justify-center rounded-md border border-gray-700 text-gray-400 transition-all hover:bg-[#333] hover:text-white active:scale-90"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Distribution */}
          {selectedElements.length >= 3 && (
            <div>
              <span className="mb-1 block text-[9px] text-gray-500">Distribute</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={distributeHorizontally}
                  title="Distribute Horizontally"
                  className="flex h-8 flex-1 items-center justify-center rounded-md border border-gray-700 px-2 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white active:scale-90"
                >
                  ↔ H
                </button>
                <button
                  type="button"
                  onClick={distributeVertically}
                  title="Distribute Vertically"
                  className="flex h-8 flex-1 items-center justify-center rounded-md border border-gray-700 px-2 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white active:scale-90"
                >
                  ↕ V
                </button>
                <button
                  type="button"
                  onClick={distributeEvenly}
                  title="Distribute Evenly"
                  className="flex h-8 flex-1 items-center justify-center rounded-md border border-gray-700 px-2 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white active:scale-90"
                >
                  ⚬ Grid
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Position */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
          <Move className="h-3 w-3" />
          Position
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <span className="text-[9px] text-gray-500">X</span>
              <input
                type="number"
                value={Math.round(commonProps.averages.avgX)}
                onChange={(e) => handlePositionChange('x', e.target.value)}
                className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <span className="text-[9px] text-gray-500">Y</span>
              <input
                type="number"
                value={Math.round(commonProps.averages.avgY)}
                onChange={(e) => handlePositionChange('y', e.target.value)}
                className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => handlePositionChange('x', -5, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              ← -5
            </button>
            <button
              type="button"
              onClick={() => handlePositionChange('x', 5, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              +5 →
            </button>
            <button
              type="button"
              onClick={() => handlePositionChange('y', -5, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              ↑ -5
            </button>
            <button
              type="button"
              onClick={() => handlePositionChange('y', 5, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              +5 ↓
            </button>
          </div>
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
          <Maximize2 className="h-3 w-3" />
          Size
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <span className="text-[9px] text-gray-500">W</span>
              <input
                type="number"
                value={Math.round(commonProps.averages.avgWidth)}
                onChange={(e) => handleSizeChange('w', e.target.value)}
                className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <span className="text-[9px] text-gray-500">H</span>
              <input
                type="number"
                value={Math.round(commonProps.averages.avgHeight)}
                onChange={(e) => handleSizeChange('h', e.target.value)}
                className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => handleSizeChange('w', 90, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              90%
            </button>
            <button
              type="button"
              onClick={() => handleSizeChange('w', 110, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              110%
            </button>
            <button
              type="button"
              onClick={() => handleSizeChange('w', 50, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              50%
            </button>
            <button
              type="button"
              onClick={() => handleSizeChange('w', 150, true)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              150%
            </button>
          </div>
        </div>
      </div>

      {/* Rotation */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
          <RotateCw className="h-3 w-3" />
          Rotation
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="-180"
            max="180"
            value={commonProps.commonRotation ?? 0}
            onChange={(e) => handleRotationChange(e.target.value)}
            className="flex-1 accent-blue-500"
          />
          <span className="w-12 text-[10px] text-gray-500">
            {Math.round(commonProps.commonRotation ?? 0)}°
          </span>
        </div>
        <div className="mt-1 flex gap-1">
          {[-45, -15, 0, 15, 45].map((angle) => (
            <button
              key={angle}
              type="button"
              onClick={() => handleRotationChange(angle)}
              className="flex-1 rounded border border-gray-700 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333] hover:text-white"
            >
              {angle}°
            </button>
          ))}
        </div>
      </div>

      {/* Color (for text elements) */}
      {commonProps.allText && (
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
            <Palette className="h-3 w-3" />
            Text Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={commonProps.commonColor || '#ffffff'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded-md border border-gray-700"
            />
            <input
              type="text"
              value={commonProps.commonColor || '#ffffff'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="h-8 flex-1 rounded-md border border-gray-700 bg-[#1a1a1a] px-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {[
              '#ffffff', '#000000', '#ef4444', '#f97316', '#eab308',
              '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280',
            ].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleColorChange(c)}
                className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${
                  commonProps.commonColor === c ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-700'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Opacity */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
          <Eye className="h-3 w-3" />
          Opacity
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            value={(commonProps.commonOpacity ?? 1) * 100}
            onChange={(e) => handleOpacityChange(e.target.value)}
            className="flex-1 accent-blue-500"
          />
          <span className="w-12 text-[10px] text-gray-500">
            {Math.round((commonProps.commonOpacity ?? 1) * 100)}%
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-md border border-gray-700 bg-[#1a1a1a] p-2">
        <p className="text-[9px] text-gray-500">
          Bounds: {Math.round(commonProps.bounds.width)} × {Math.round(commonProps.bounds.height)}
        </p>
        <p className="text-[9px] text-gray-500">
          Elements: {selectedElements.length} ({commonProps.allText ? 'Text' : commonProps.allDevice ? 'Devices' : 'Mixed'})
        </p>
      </div>
    </div>
  )
}

export default BulkEditPanel
