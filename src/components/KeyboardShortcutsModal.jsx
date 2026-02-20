import { useEffect } from 'react'
import { X } from 'lucide-react'

const shortcuts = [
  ['⌘Z', 'Undo'],
  ['⌘⇧Z', 'Redo'],
  ['⌘C', 'Copy element'],
  ['⌘V', 'Paste element'],
  ['⌘D', 'Duplicate element'],
  ['⌫', 'Delete element'],
  ['⌘/', 'Toggle this dialog'],
  ['⌘+', 'Zoom in'],
  ['⌘-', 'Zoom out'],
]

export default function KeyboardShortcutsModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-gray-700 bg-[#1a1a1a] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 text-gray-400 transition hover:bg-gray-700 hover:text-gray-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="mb-6 text-lg font-semibold text-gray-100">Keyboard Shortcuts</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {shortcuts.map(([keys, description]) => (
            <div key={keys} className="flex items-center justify-between gap-4">
              <kbd className="rounded border border-gray-600 bg-[#333] px-2 py-0.5 font-mono text-[11px] text-gray-200">
                {keys}
              </kbd>
              <span className="text-sm text-gray-300">{description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
