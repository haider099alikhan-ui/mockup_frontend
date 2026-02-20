import PhoneFrame from './PhoneFrame'

function getBackgroundClasses(background) {
  switch (background) {
    case 'purpleBlue':
      return 'bg-gradient-to-br from-purple-600 to-blue-500'
    case 'pinkOrange':
      return 'bg-gradient-to-br from-pink-500 to-orange-400'
    case 'greenTeal':
      return 'bg-gradient-to-br from-emerald-500 to-teal-400'
    case 'dark':
      return 'bg-[#0f0f0f] text-white'
    case 'white':
      return 'bg-white text-gray-900'
    case 'default':
    default:
      return 'bg-gradient-to-br from-orange-200 to-yellow-100'
  }
}

function Template3({
  screenshot,
  headline,
  subtitle,
  background = 'default',
  isEditorMode = false,
  onUseTemplate,
}) {
  const bgClasses = getBackgroundClasses(background)
  const displayHeadline = headline || 'Organize Your Life'
  const displaySubtitle = subtitle || 'Simple. Beautiful. Powerful.'

  return (
    <div
      className={`flex h-[650px] w-[375px] flex-col rounded-3xl p-6 text-gray-800 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${bgClasses}`}
    >
      <div className="space-y-1 text-center">
        <h3 className="text-2xl font-bold">{displayHeadline}</h3>
        <p className="text-sm text-gray-500">{displaySubtitle}</p>
      </div>

      <div className="mt-6 flex flex-1 items-center justify-center">
        <PhoneFrame screenshot={screenshot} isEditorMode={isEditorMode} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-gray-700">
          Productivity
        </span>
        <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-gray-700">
          Free
        </span>
        <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-gray-700">
          Top Chart
        </span>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-900"
        onClick={onUseTemplate}
      >
        Use This Template
      </button>
    </div>
  )
}

export default Template3

