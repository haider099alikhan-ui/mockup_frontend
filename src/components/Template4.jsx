import PhoneFrame from './PhoneFrame'

function getBackgroundClasses(background) {
  switch (background) {
    case 'purpleBlue':
      return 'bg-gradient-to-br from-purple-600 to-blue-500 text-white border-transparent'
    case 'pinkOrange':
      return 'bg-gradient-to-br from-pink-500 to-orange-400 text-white border-transparent'
    case 'greenTeal':
      return 'bg-gradient-to-br from-emerald-500 to-teal-400 text-white border-transparent'
    case 'dark':
      return 'bg-[#0f0f0f] text-white border-transparent'
    case 'white':
    case 'default':
    default:
      return 'bg-white text-gray-900 border border-gray-200'
  }
}

function Template4({
  screenshot,
  headline,
  subtitle,
  background = 'default',
  isEditorMode = false,
  onUseTemplate,
}) {
  const bgClasses = getBackgroundClasses(background)
  const displayHeadline = headline || 'AppName'
  const displaySubtitle = subtitle || 'Productivity'

  return (
    <div
      className={`flex h-[650px] w-[375px] flex-col rounded-3xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${bgClasses}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gray-200" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{displayHeadline}</span>
          <span className="text-sm text-gray-500">{displaySubtitle}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-1 items-center justify-center">
        <PhoneFrame screenshot={screenshot} isEditorMode={isEditorMode} />
      </div>

      <button
        type="button"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-900"
      >
        Download Now
      </button>

      <div className="mt-4 text-center text-xs text-gray-400">
        4.8 ★ &middot; 10K Reviews &middot; Free
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-900"
        onClick={onUseTemplate}
      >
        Use This Template
      </button>
    </div>
  )
}

export default Template4

