import { useEffect, useState, useCallback } from 'react'
import { HexColorPicker } from 'react-colorful'

const RECENT_COLORS_KEY = 'screensnap-recent-colors'
const MAX_RECENT = 10

function getRecentColors() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_COLORS_KEY)) || []
  } catch {
    return []
  }
}

function saveRecentColor(color) {
  if (!color || color.startsWith('linear-gradient')) return
  const recent = getRecentColors().filter((c) => c !== color)
  recent.unshift(color)
  localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)))
}

const solidColors = [
  '#7f1d1d', '#b91c1c', '#f97316', '#fb7185', '#f43f5e', '#ec4899',
  '#4b5563', '#9ca3af', '#0f766e', '#14b8a6', '#22c55e', '#65a30d',
  '#4d7c0f', '#0369a1', '#38bdf8', '#a855f7', '#d4d4d8',
]

const gradients = [
  { css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Purple Blue' },
  { css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Pink Orange' },
  { css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Sky Cyan' },
  { css: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Green Teal' },
  { css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'Rose Yellow' },
  { css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', label: 'Lavender Pink' },
  { css: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', label: 'Amber Purple' },
  { css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', label: 'Light Purple' },
  { css: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', label: 'Dark Navy' },
  { css: 'linear-gradient(135deg, #0f0f0f 0%, #333333 100%)', label: 'Dark Gray' },
  { css: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', label: 'Soft Pink' },
  { css: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', label: 'Soft Blue' },
]

function BackgroundTab({
  activeSubTab,
  setActiveSubTab,
  slides,
  activeSlide,
  setSlideBackground,
  onApplyToAllSlides,
}) {
  const currentBg = slides[activeSlide]?.backgroundColor || '#1b00f6'
  const isGradient = currentBg.startsWith('linear-gradient')
  
  const [hex, setHex] = useState(isGradient ? '#1b00f6' : currentBg)
  const [inputValue, setInputValue] = useState(isGradient ? '#1b00f6' : currentBg)
  const [recentColors, setRecentColors] = useState(getRecentColors)

  useEffect(() => {
    const bg = slides[activeSlide]?.backgroundColor || '#1b00f6'
    const isGrad = bg.startsWith('linear-gradient')
    if (!isGrad) {
      setHex(bg)
      setInputValue(bg)
    }
  }, [activeSlide, slides])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSlideBackground(activeSlide, hex)
    }, 200)
    return () => clearTimeout(timeout)
  }, [activeSlide, hex, setSlideBackground])

  const handleColorChange = useCallback((value) => {
    setHex(value)
    setInputValue(value)
  }, [])

  const commitColor = useCallback((value) => {
    saveRecentColor(value)
    setRecentColors(getRecentColors())
  }, [])

  const handleGradientSelect = (gradientCss) => {
    setSlideBackground(activeSlide, gradientCss)
  }

  const handleApplyToAll = () => {
    const currentBgValue = slides[activeSlide]?.backgroundColor
    if (currentBgValue && onApplyToAllSlides) {
      onApplyToAllSlides(currentBgValue)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-gray-400">Background</span>
        <button
          type="button"
          onClick={handleApplyToAll}
          className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-medium text-blue-400 transition-all hover:bg-blue-500/20 active:scale-95"
        >
          Apply to all slides
        </button>
      </div>
      <div className="mb-1 flex gap-2 text-[11px]">
        {['solid', 'gradient', 'image'].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSubTab(id)}
            className={`flex-1 rounded-full px-2 py-1 capitalize transition-all duration-150 ${
              activeSubTab === id ? 'bg-[#3a3a3a] text-white' : 'bg-[#222222] text-gray-400'
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {activeSubTab === 'solid' && (
        <>
          <div className="space-y-2">
            <input
              value={inputValue}
              onChange={(event) => handleColorChange(event.target.value)}
              className="w-full rounded-md border border-gray-700 bg-[#1f1f1f] px-2 py-1 text-[11px] text-gray-200 outline-none transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            <div onPointerUp={() => commitColor(hex)}>
              <HexColorPicker color={hex} onChange={handleColorChange} />
            </div>
          </div>

          {recentColors.length > 0 && (
            <div>
              <span className="mb-1.5 block text-[10px] font-medium text-gray-400">Recent Colors</span>
              <div className="flex flex-wrap gap-1.5">
                {recentColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { handleColorChange(c); commitColor(c) }}
                    style={{ backgroundColor: c }}
                    className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${hex === c ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-700'}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="mb-1 flex gap-2 text-[11px]">
              <button
                type="button"
                className="rounded-full bg-[#3a3a3a] px-2 py-1 text-white"
              >
                Solid Colors
              </button>
              <button
                type="button"
                className="rounded-full bg-[#222222] px-2 py-1 text-gray-400"
              >
                Color Palettes
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {solidColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => { handleColorChange(color); commitColor(color) }}
                  style={{ backgroundColor: color }}
                  className="h-8 rounded-md border border-gray-700 transition-transform duration-150 ease-out hover:scale-110"
                />
              ))}
            </div>
          </div>
        </>
      )}

      {activeSubTab === 'gradient' && (
        <div>
          <h3 className="mb-2 text-xs font-semibold text-gray-200">Gradients</h3>
          <div className="grid grid-cols-2 gap-2">
            {gradients.map((g) => (
              <button
                key={g.label}
                type="button"
                onClick={() => handleGradientSelect(g.css)}
                className="h-10 rounded-md border border-gray-700 transition-all duration-150 hover:scale-105 hover:border-blue-500 active:scale-95"
                style={{ background: g.css }}
              />
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'image' && (
        <div className="space-y-3">
          <button
            type="button"
            className="w-full rounded-md border border-gray-600 bg-[#232323] px-3 py-2 text-[11px] text-gray-200 transition hover:border-blue-500 hover:bg-[#282828]"
          >
            Upload Background Image
          </button>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={`bg-img-${index}`}
                className="h-12 rounded-md bg-gradient-to-br from-gray-500 to-gray-800"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundTab
