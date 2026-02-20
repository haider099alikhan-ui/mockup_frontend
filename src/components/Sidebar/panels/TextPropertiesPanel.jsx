import { useState, useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Plus,
} from 'lucide-react'
import { GOOGLE_FONTS, SYSTEM_FONTS, loadGoogleFont } from '../../../utils/googleFonts'

function TextPropertiesPanel({ element, onUpdate }) {
  const [activeTab, setActiveTab] = useState('font')
  const [fontCategory, setFontCategory] = useState('all')
  const style = element?.style || {}

  if (!element) return null

  // Load font when selected
  useEffect(() => {
    const fontFamily = style.fontFamily || 'Inter'
    if (GOOGLE_FONTS.some((f) => f.name === fontFamily)) {
      loadGoogleFont(fontFamily)
    }
  }, [style.fontFamily])

  // Filter fonts by category
  const getFilteredFonts = () => {
    if (fontCategory === 'all') {
      return [...GOOGLE_FONTS.map((f) => f.name), ...SYSTEM_FONTS]
    }
    if (fontCategory === 'system') {
      return SYSTEM_FONTS
    }
    return GOOGLE_FONTS.filter((f) => f.category === fontCategory).map((f) => f.name)
  }

  const filteredFonts = getFilteredFonts()
  const categories = ['all', ...new Set(GOOGLE_FONTS.map((f) => f.category)), 'system']

  const update = (key, value) => {
    onUpdate(element.id, {
      style: { ...style, [key]: value },
    })
  }

  const fontSize = style.fontSize || 26
  const fontWeight = style.fontWeight || '600'
  const fontStyle = style.fontStyle || 'normal'
  const textDecoration = style.textDecoration || 'none'
  const align = style.align || 'left'
  const lineHeight = style.lineHeight || 110
  const fontFamily = style.fontFamily || 'Inter'
  const color = style.color || '#ffffff'

  const shadowEnabled = style.textShadow && style.textShadow !== 'none'
  const strokeEnabled = style.webkitTextStroke && style.webkitTextStroke !== 'none'
  const parseTextShadow = (val) => {
    if (!val || val === 'none') return { shadowColor: '#000000', shadowX: 2, shadowY: 2, shadowBlur: 4 }
    const m = val.match(/^(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(.+)$/)
    if (!m) return { shadowColor: '#000000', shadowX: 2, shadowY: 2, shadowBlur: 4 }
    return { shadowColor: m[4].trim(), shadowX: parseInt(m[1], 10), shadowY: parseInt(m[2], 10), shadowBlur: parseInt(m[3], 10) }
  }
  const parseTextStroke = (val) => {
    if (!val || val === 'none') return { strokeWidth: 1, strokeColor: '#000000' }
    const m = val.match(/^(\d+)px\s+(.+)$/)
    if (!m) return { strokeWidth: 1, strokeColor: '#000000' }
    return { strokeWidth: parseInt(m[1], 10), strokeColor: m[2].trim() }
  }
  const shadow = parseTextShadow(style.textShadow)
  const stroke = parseTextStroke(style.webkitTextStroke)
  const opacityValue = style.opacity !== undefined ? style.opacity : 1

  return (
    <div className="animate-fade-slide-in space-y-5">
      {/* Tab bar */}
      <div className="flex gap-1 rounded-lg bg-[#1a1a1a] p-1">
        {['font', 'color', 'effects'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-3 py-1.5 text-[11px] font-medium capitalize transition-all duration-150 ${
              activeTab === tab
                ? 'bg-[#333] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'font' && (
        <div className="space-y-5">
          {/* Font Family */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Font Family
            </label>
            <div className="mb-2 flex gap-1 rounded-md bg-[#1a1a1a] p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFontCategory(cat)}
                  className={`flex-1 rounded px-2 py-1 text-[9px] font-medium capitalize transition-all ${
                    fontCategory === cat
                      ? 'bg-[#333] text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={fontFamily}
              onChange={(e) => {
                const selectedFont = e.target.value
                update('fontFamily', selectedFont)
                loadGoogleFont(selectedFont)
              }}
              className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none transition-all focus:border-blue-500"
              style={{ fontFamily: fontFamily }}
            >
              {filteredFonts.map((f) => (
                <option key={f} value={f} style={{ fontFamily: f }}>
                  {f}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[9px] text-gray-500">
              {GOOGLE_FONTS.some((f) => f.name === fontFamily) ? '✓ Google Font' : 'System Font'}
            </p>
          </div>

          {/* Font Size */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Font Size
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update('fontSize', Math.max(8, fontSize - 2))}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-700 text-gray-300 transition-all hover:bg-[#333] active:scale-95"
              >
                <Minus className="h-3 w-3" />
              </button>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => update('fontSize', Number(e.target.value) || 12)}
                className="h-8 w-16 rounded-md border border-gray-700 bg-[#1a1a1a] text-center text-xs text-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => update('fontSize', Math.min(200, fontSize + 2))}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-700 text-gray-300 transition-all hover:bg-[#333] active:scale-95"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Font Style */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Font Style
            </label>
            <div className="flex gap-1">
              {[
                { icon: Bold, key: 'fontWeight', active: fontWeight === '900', on: '900', off: '400' },
                { icon: Italic, key: 'fontStyle', active: fontStyle === 'italic', on: 'italic', off: 'normal' },
                { icon: Underline, key: 'textDecoration', active: textDecoration === 'underline', on: 'underline', off: 'none' },
                { icon: Strikethrough, key: 'textDecoration', active: textDecoration === 'line-through', on: 'line-through', off: 'none' },
              ].map(({ icon: Icon, key, active, on, off }) => (
                <button
                  key={`${key}-${on}`}
                  type="button"
                  onClick={() => update(key, active ? off : on)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all active:scale-95 ${
                    active
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-gray-700 text-gray-400 hover:bg-[#333]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Font Alignment */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Font Alignment
            </label>
            <div className="flex gap-1">
              {[
                { icon: AlignLeft, value: 'left' },
                { icon: AlignCenter, value: 'center' },
                { icon: AlignRight, value: 'right' },
              ].map(({ icon: Icon, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update('align', value)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all active:scale-95 ${
                    align === value
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-gray-700 text-gray-400 hover:bg-[#333]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Line Height */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Line Height
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update('lineHeight', Math.max(50, lineHeight - 5))}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-700 text-gray-300 transition-all hover:bg-[#333] active:scale-95"
              >
                <Minus className="h-3 w-3" />
              </button>
              <input
                type="number"
                value={lineHeight}
                onChange={(e) => update('lineHeight', Number(e.target.value) || 100)}
                className="h-8 w-16 rounded-md border border-gray-700 bg-[#1a1a1a] text-center text-xs text-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => update('lineHeight', Math.min(300, lineHeight + 5))}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-700 text-gray-300 transition-all hover:bg-[#333] active:scale-95"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'color' && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Text Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => update('color', e.target.value)}
                className="h-8 w-8 cursor-pointer rounded-md border border-gray-700"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => update('color', e.target.value)}
                className="h-8 flex-1 rounded-md border border-gray-700 bg-[#1a1a1a] px-2 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {[
              '#ffffff', '#000000', '#ef4444', '#f97316', '#eab308',
              '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280',
              '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb',
              '#7c3aed', '#db2777', '#d4d4d4', '#fca5a5', '#fdba74',
              '#fde047', '#86efac',
            ].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => update('color', c)}
                className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${
                  color === c ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-700'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'effects' && (
        <div className="space-y-5">
          {/* Text Shadow */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[10px] font-medium text-gray-400">Text Shadow</label>
              <button
                type="button"
                onClick={() => update('textShadow', shadowEnabled ? 'none' : `${shadow.shadowX}px ${shadow.shadowY}px ${shadow.shadowBlur}px ${shadow.shadowColor}`)}
                className={`h-5 rounded px-2 text-[10px] font-medium transition-all ${
                  shadowEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-[#333] text-gray-400'
                }`}
              >
                {shadowEnabled ? 'On' : 'Off'}
              </button>
            </div>
            {shadowEnabled && (
              <div className="space-y-2 rounded-md border border-gray-700 bg-[#1a1a1a] p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={shadow.shadowColor}
                    onChange={(e) => update('textShadow', `${shadow.shadowX}px ${shadow.shadowY}px ${shadow.shadowBlur}px ${e.target.value}`)}
                    className="h-6 w-8 cursor-pointer rounded border border-gray-700"
                  />
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={shadow.shadowX}
                      onChange={(e) => update('textShadow', `${Math.max(-20, Math.min(20, Number(e.target.value) || 0))}px ${shadow.shadowY}px ${shadow.shadowBlur}px ${shadow.shadowColor}`)}
                      className="h-7 w-14 rounded-md border border-gray-700 bg-[#1a1a1a] text-center text-xs text-white outline-none focus:border-blue-500"
                      min={-20}
                      max={20}
                      placeholder="X"
                    />
                    <input
                      type="number"
                      value={shadow.shadowY}
                      onChange={(e) => update('textShadow', `${shadow.shadowX}px ${Math.max(-20, Math.min(20, Number(e.target.value) || 0))}px ${shadow.shadowBlur}px ${shadow.shadowColor}`)}
                      className="h-7 w-14 rounded-md border border-gray-700 bg-[#1a1a1a] text-center text-xs text-white outline-none focus:border-blue-500"
                      min={-20}
                      max={20}
                      placeholder="Y"
                    />
                    <input
                      type="number"
                      value={shadow.shadowBlur}
                      onChange={(e) => update('textShadow', `${shadow.shadowX}px ${shadow.shadowY}px ${Math.max(0, Math.min(30, Number(e.target.value) || 0))}px ${shadow.shadowColor}`)}
                      className="h-7 w-14 rounded-md border border-gray-700 bg-[#1a1a1a] text-center text-xs text-white outline-none focus:border-blue-500"
                      min={0}
                      max={30}
                      placeholder="Blur"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Text Outline */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[10px] font-medium text-gray-400">Text Outline</label>
              <button
                type="button"
                onClick={() => update('webkitTextStroke', strokeEnabled ? 'none' : `${stroke.strokeWidth}px ${stroke.strokeColor}`)}
                className={`h-5 rounded px-2 text-[10px] font-medium transition-all ${
                  strokeEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-[#333] text-gray-400'
                }`}
              >
                {strokeEnabled ? 'On' : 'Off'}
              </button>
            </div>
            {strokeEnabled && (
              <div className="flex items-center gap-2 rounded-md border border-gray-700 bg-[#1a1a1a] p-2">
                <input
                  type="color"
                  value={stroke.strokeColor}
                  onChange={(e) => update('webkitTextStroke', `${stroke.strokeWidth}px ${e.target.value}`)}
                  className="h-6 w-8 cursor-pointer rounded border border-gray-700"
                />
                <input
                  type="number"
                  value={stroke.strokeWidth}
                  onChange={(e) => update('webkitTextStroke', `${Math.max(1, Math.min(5, Number(e.target.value) || 1))}px ${stroke.strokeColor}`)}
                  className="h-7 w-14 rounded-md border border-gray-700 bg-[#1a1a1a] text-center text-xs text-white outline-none focus:border-blue-500"
                  min={1}
                  max={5}
                  placeholder="W"
                />
              </div>
            )}
          </div>

          {/* Opacity */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Opacity {Math.round((opacityValue ?? 1) * 100)}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={(opacityValue ?? 1) * 100}
              onChange={(e) => update('opacity', Number(e.target.value) / 100)}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TextPropertiesPanel
