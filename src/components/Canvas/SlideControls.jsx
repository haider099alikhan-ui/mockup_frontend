import { Plus, Copy, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

function SlideThumbnail({ slide, index, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-1 transition-all duration-150 ${
        isActive ? '' : 'opacity-60 hover:opacity-90'
      }`}
    >
      <div
        className={`h-14 w-8 overflow-hidden rounded-md border-2 transition-all duration-150 ${
          isActive
            ? 'border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.5)]'
            : 'border-gray-700 hover:border-gray-500'
        }`}
        style={{
          backgroundColor: slide.backgroundColor?.startsWith('linear-gradient')
            ? undefined
            : slide.backgroundColor,
          background: slide.backgroundColor?.startsWith('linear-gradient')
            ? slide.backgroundColor
            : undefined,
        }}
      />
      <span
        className={`text-[10px] font-medium ${
          isActive ? 'text-white' : 'text-gray-500'
        }`}
      >
        {index + 1}
      </span>
    </button>
  )
}

function SlideControls({
  slides,
  activeSlide,
  setActiveSlide,
  addSlide,
  copySlide,
  deleteSlide,
  moveSlideLeft,
  moveSlideRight,
}) {
  return (
    <div className="flex items-center justify-between text-xs text-gray-200">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={addSlide}
          title="Add slide"
          className="flex h-7 items-center gap-1 rounded-md border border-gray-700 px-2 py-1 transition hover:bg-[#222222] active:scale-95"
        >
          <Plus className="h-3 w-3" />
          <span>Add</span>
        </button>
        <button
          type="button"
          onClick={() => copySlide(activeSlide)}
          title="Duplicate slide"
          className="flex h-7 items-center gap-1 rounded-md border border-gray-700 px-2 py-1 transition hover:bg-[#222222] active:scale-95"
        >
          <Copy className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={() => deleteSlide(activeSlide)}
          title="Delete slide"
          disabled={slides.length <= 1}
          className="flex h-7 items-center gap-1 rounded-md border border-gray-700 px-2 py-1 transition hover:bg-[#222222] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
        >
          <Trash2 className="h-3 w-3" />
        </button>

        <div className="mx-1 h-4 w-px bg-gray-700" />

        <button
          type="button"
          onClick={() => moveSlideLeft(activeSlide)}
          disabled={activeSlide === 0}
          title="Move slide left"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-700 transition hover:bg-[#222222] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={() => moveSlideRight(activeSlide)}
          disabled={activeSlide >= slides.length - 1}
          title="Move slide right"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-700 transition hover:bg-[#222222] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="no-scrollbar flex items-end gap-2 overflow-x-auto px-2">
        {slides.map((slide, index) => (
          <SlideThumbnail
            key={slide.id}
            slide={slide}
            index={index}
            isActive={index === activeSlide}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default SlideControls
