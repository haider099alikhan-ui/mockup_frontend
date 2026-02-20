import PhoneFrame from './PhoneFrame'

function getBackgroundClasses(background) {
  switch (background) {
    case 'purpleBlue':
      return 'bg-gradient-to-br from-purple-600 to-blue-500'
    case 'pinkOrange':
      return 'bg-gradient-to-br from-pink-500 to-orange-400'
    case 'greenTeal':
      return 'bg-gradient-to-br from-emerald-500 to-teal-400'
    case 'white':
      return 'bg-white text-gray-900'
    case 'dark':
    case 'default':
    default:
      return 'bg-[#0f0f0f]'
  }
}

function Template2({
  screenshot,
  headline,
  subtitle,
  background = 'default',
  isEditorMode = false,
  onUseTemplate,
}) {
  const bgClasses = getBackgroundClasses(background)
  const displayHeadline = headline || 'The #1 Productivity App'
  const displaySubtitle = subtitle || ''

  return (
    <div
      className={`flex h-[650px] w-[375px] flex-col rounded-3xl p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${bgClasses}`}
    >
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="h-10 w-10 rounded-xl bg-gray-700" />
          <h3 className="mt-4 text-xl font-bold">{displayHeadline}</h3>
          <div className="mt-2 h-[2px] w-12 bg-[#FF6B6B]" />
          {displaySubtitle ? (
            <p className="mt-2 text-xs text-gray-400">{displaySubtitle}</p>
          ) : null}
          <div className="mt-3 flex items-center text-xs text-gray-400">
            <span className="text-base text-yellow-400">★★★★★</span>
            <span className="ml-2">4.9 Rating</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center pb-4">
          <div
            className="rounded-[3rem]"
            style={{ boxShadow: '0 0 25px rgba(255,255,255,0.15)' }}
          >
            <PhoneFrame screenshot={screenshot} isEditorMode={isEditorMode} />
          </div>
        </div>
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

export default Template2

