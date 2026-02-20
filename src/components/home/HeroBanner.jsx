import { useState } from 'react'
import { TEMPLATE_CATEGORIES } from '../../data/templates'

function HeroBanner({ setActiveFilter, scrollToTemplates }) {
  const [activeDevice, setActiveDevice] = useState('iphone-69')

  const devices = [
    { id: 'iphone-69', label: 'iPhone 6.9"' },
    { id: 'ipad-13', label: 'iPad 13"' },
    { id: 'android-phone', label: 'Android phone' },
    { id: 'more-sizes', label: 'More screenshot sizes' },
    { id: 'custom-size', label: 'Custom size' },
  ]

  const screenshotColors = ['#4F46E5', '#7C3AED', '#2563EB', '#6D28D9', '#4338CA']
  const mockupGradient = 'from-emerald-800 to-emerald-950'

  return (
    <section className="mt-4 px-6">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-pink-50/80 to-violet-100/60 px-6 pb-8 pt-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #c084fc 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-10 h-60 w-60 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }}
        />

        <div className="relative flex flex-wrap items-stretch justify-center gap-5">
          {/* App Store Screenshots card */}
          <button
            type="button"
            onClick={() => {
              // Filter to show regular templates (exclude mockups)
              setActiveFilter('app-store-screenshots')
              // Scroll to templates section after a brief delay
              setTimeout(() => {
                scrollToTemplates?.()
              }, 100)
            }}
            className="group flex h-52 w-64 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex flex-1 items-end justify-center gap-1.5 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 px-5 pb-3 pt-5">
              {screenshotColors.map((color, i) => (
                <div
                  key={color}
                  className="flex flex-col items-center justify-between rounded-lg p-1.5 shadow-md transition-transform duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: color,
                    width: 36,
                    height: i === 2 ? 76 : 68,
                    marginTop: i === 2 ? -8 : 0,
                  }}
                >
                  <div className="h-1.5 w-5 rounded-full bg-white/50" />
                  <div className="h-8 w-5 rounded-md border border-white/40 bg-black/30" />
                </div>
              ))}
            </div>
            <div className="flex items-center bg-gray-900 px-4 py-2.5">
              <span className="text-xs font-semibold text-white">App Store Screenshots</span>
              <span className="ml-auto text-[10px] text-gray-400">→</span>
            </div>
          </button>

          {/* Mockups card */}
          <button
            type="button"
            onClick={() => {
              // Filter to show only mockup templates
              setActiveFilter(TEMPLATE_CATEGORIES.MOCKUPS)
              // Scroll to templates section after a brief delay
              setTimeout(() => {
                scrollToTemplates?.()
              }, 100)
            }}
            className={`group flex h-52 w-64 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
          >
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black px-5">
              <div className="absolute -left-8 top-6 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="absolute -right-4 bottom-2 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl" />
              <div className="relative flex items-end gap-2 transition-transform duration-200 group-hover:scale-105">
                <div className="flex h-16 w-9 items-center justify-center rounded-xl border border-gray-600 bg-black shadow-lg">
                  <div className="h-11 w-6 rounded-lg bg-gradient-to-b from-gray-800 to-gray-700" />
                </div>
                <div className="flex h-24 w-12 items-center justify-center rounded-[0.9rem] border-2 border-gray-500 bg-black shadow-2xl">
                  <div className="h-17 w-8 rounded-[0.6rem] bg-gradient-to-b from-gray-700 to-gray-600" />
                </div>
                <div className="flex h-16 w-9 items-center justify-center rounded-xl border border-gray-600 bg-black shadow-lg">
                  <div className="h-11 w-6 rounded-lg bg-gradient-to-b from-gray-800 to-gray-700" />
                </div>
              </div>
            </div>
            <div className="flex items-center bg-gray-900 px-4 py-2.5">
              <span className="text-xs font-semibold text-white">Mockups</span>
              <span className="ml-auto text-[10px] text-gray-400">→</span>
            </div>
          </button>
        </div>

        <div className="relative mt-7 flex flex-wrap items-center justify-center gap-2.5 text-xs">
          {devices.map((device) => {
            const isActive = activeDevice === device.id
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => setActiveDevice(device.id)}
                className={`rounded-full border px-4 py-1.5 font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {device.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
