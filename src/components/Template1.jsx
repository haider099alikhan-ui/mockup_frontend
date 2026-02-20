import PhoneFrame from './PhoneFrame'

function getBackgroundClasses(background) {
  switch (background) {
    case 'pinkOrange':
      return 'bg-gradient-to-br from-pink-500 to-orange-400'
    case 'greenTeal':
      return 'bg-gradient-to-br from-emerald-500 to-teal-400'
    case 'dark':
      return 'bg-[#0f0f0f]'
    case 'white':
      return 'bg-white text-gray-900'
    case 'default':
    default:
      return 'bg-gradient-to-br from-purple-600 to-blue-500'
  }
}

function Template1({
  screenshot,
  headline,
  subtitle,
  background = 'default',
  isEditorMode = false,
  onUseTemplate,
}) {
  const bgClasses = getBackgroundClasses(background)
  const displayHeadline = headline || 'Your App. Your Way.'
  const displaySubtitle = subtitle || 'Available on App Store & Google Play'

  return (
    <div
      className={`flex h-[650px] w-[375px] flex-col rounded-3xl p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${bgClasses}`}
    >
      <div className="flex flex-1 items-center justify-center">
        <PhoneFrame screenshot={screenshot} isEditorMode={isEditorMode} />
      </div>

      <div className="mt-6 space-y-2 text-center">
        <h3 className="text-xl font-bold">{displayHeadline}</h3>
        <p className="text-sm text-white/70">{displaySubtitle}</p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
            App Store
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
            Google Play
          </span>
        </div>
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

export default Template1

