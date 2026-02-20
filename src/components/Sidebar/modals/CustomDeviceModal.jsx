import { useState } from 'react'
import { X } from 'lucide-react'

function CustomDeviceModal({ isOpen, onClose, onSave, onAdd }) {
  const [name, setName] = useState('')
  const [width, setWidth] = useState(120)
  const [height, setHeight] = useState(240)

  if (!isOpen) return null

  const handleSave = () => {
    if (name.trim() && width > 0 && height > 0) {
      onSave({ name: name.trim(), width, height })
      setName('')
      setWidth(120)
      setHeight(240)
      onClose()
    }
  }

  const handleAdd = () => {
    if (width > 0 && height > 0) {
      onAdd({ name: name.trim() || 'Custom Device', width, height })
      setName('')
      setWidth(120)
      setHeight(240)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-700 bg-[#2a2a2a] shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
          <h3 className="text-sm font-semibold text-white">Custom Device Size</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-[#333] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
              Device Name (optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Custom Phone"
              className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none transition-all focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
                Width
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Math.max(10, Number(e.target.value) || 10))}
                min={10}
                max={500}
                className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none transition-all focus:border-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-gray-400">
                Height
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Math.max(10, Number(e.target.value) || 10))}
                min={10}
                max={500}
                className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none transition-all focus:border-blue-500"
              />
            </div>
          </div>

          <div className="rounded-md border border-gray-700 bg-[#1a1a1a] p-3">
            <div className="mb-2 text-[9px] text-gray-500">Preview</div>
            <div className="flex items-center justify-center">
              <div
                className="rounded-[1rem] border-2 border-gray-500 bg-[#111]"
                style={{
                  width: Math.min(100, (width / height) * 100),
                  height: Math.min(100, (height / width) * 100),
                  aspectRatio: `${width} / ${height}`,
                }}
              />
            </div>
            <div className="mt-2 text-center text-[9px] text-gray-500">
              {width} × {height}px
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-blue-700 active:scale-95"
            >
              Add to Canvas
            </button>
            {name.trim() && (
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-md border border-gray-600 bg-[#333] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[#404040] active:scale-95"
              >
                Save Preset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomDeviceModal
