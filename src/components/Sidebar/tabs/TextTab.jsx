import { Type } from 'lucide-react'

function TextTab({ addElementToSlide, activeSlide }) {
  const handleAddText = () => {
    addElementToSlide(activeSlide, {
      type: 'text',
      x: 40,
      y: 80,
      width: 200,
      height: 80,
      content: 'Add text here',
      style: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
      },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-xs font-semibold text-gray-200">Text</h3>
        <button
          type="button"
          onClick={handleAddText}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-600 bg-[#232323] px-3 py-2.5 text-xs font-semibold text-white transition-all duration-150 hover:border-blue-500 hover:bg-[#282828] active:scale-[0.97]"
        >
          <Type className="h-3.5 w-3.5" />
          <span>+ Add Text</span>
        </button>
      </div>

      <div>
        <h4 className="mb-2 text-[11px] font-semibold text-gray-200">Quick Styles</h4>
        <div className="space-y-1.5">
          {[
            { label: 'Heading', fontSize: 36, fontWeight: '900' },
            { label: 'Subheading', fontSize: 22, fontWeight: '700' },
            { label: 'Body Text', fontSize: 14, fontWeight: '400' },
            { label: 'Caption', fontSize: 10, fontWeight: '500' },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() =>
                addElementToSlide(activeSlide, {
                  type: 'text',
                  x: 24,
                  y: 60,
                  width: 220,
                  height: preset.fontSize > 20 ? 100 : 50,
                  content: preset.label,
                  style: {
                    fontSize: preset.fontSize,
                    fontWeight: preset.fontWeight,
                    color: '#ffffff',
                  },
                })
              }
              className="flex w-full items-center rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-left transition-all duration-150 hover:border-gray-500 hover:bg-[#232323] active:scale-[0.98]"
            >
              <span
                className="text-white"
                style={{ fontSize: Math.min(preset.fontSize, 18), fontWeight: preset.fontWeight }}
              >
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TextTab
