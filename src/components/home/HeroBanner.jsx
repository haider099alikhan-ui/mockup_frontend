import { useState } from 'react'
import { Sparkles, Smartphone, Monitor } from 'lucide-react'
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

  return (
    <section className="mt-4 px-6">
      <div className="animate-fade-up relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-8 pb-10 pt-12">
        {/* Animated background orbs */}
        <div
          className="animate-float pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', animation: 'float 4s ease-in-out infinite reverse' }}
        />
        <div
          className="pointer-events-none absolute right-1/4 top-1/3 h-40 w-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', animation: 'float 5s ease-in-out infinite' }}
        />

        {/* Hero headline */}
        <div className="relative mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            <span>Professional screenshot templates</span>
          </div>
          <h1 className="mx-auto max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Create <span className="gradient-text">stunning</span> app store screenshots
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
            Beautiful templates, device mockups, and one-click export. Design screenshots that convert — in minutes, not hours.
          </p>
        </div>

        {/* Category cards */}
        <div className="stagger-children relative flex flex-wrap items-stretch justify-center gap-5">
          {/* App Store Screenshots card */}
          <button
            type="button"
            onClick={() => {
              setActiveFilter('app-store-screenshots')
              setTimeout(() => scrollToTemplates?.(), 100)
            }}
            className="glass group flex h-56 w-64 cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex flex-1 items-end justify-center gap-2 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-blue-500/80 px-5 pb-4 pt-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-between rounded-lg p-1.5 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: ['#4F46E5', '#7C3AED', '#2563EB', '#6D28D9', '#4338CA'][i],
                    width: 34,
                    height: i === 2 ? 78 : 66,
                    marginTop: i === 2 ? -12 : 0,
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <div className="h-1.5 w-5 rounded-full bg-white/50" />
                  <div className="h-8 w-5 rounded-md border border-white/30 bg-black/25" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-3 backdrop-blur-sm">
              <Smartphone className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-white">App Store Screenshots</span>
              <span className="ml-auto text-xs text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </div>
          </button>

          {/* Mockups card */}
          <button
            type="button"
            onClick={() => {
              setActiveFilter(TEMPLATE_CATEGORIES.MOCKUPS)
              setTimeout(() => scrollToTemplates?.(), 100)
            }}
            className="glass group flex h-56 w-64 cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 px-5">
              <div className="absolute -left-8 top-6 h-32 w-32 rounded-full bg-blue-500/15 blur-2xl" />
              <div className="absolute -right-4 bottom-2 h-28 w-28 rounded-full bg-purple-500/15 blur-2xl" />
              <div className="relative flex items-end gap-3 transition-transform duration-300 group-hover:scale-110">
                <div className="flex h-16 w-9 items-center justify-center rounded-xl border border-gray-600/80 bg-black shadow-lg">
                  <div className="h-11 w-6 rounded-lg bg-gradient-to-b from-gray-700 to-gray-600" />
                </div>
                <div className="flex h-24 w-12 items-center justify-center rounded-[0.9rem] border-2 border-gray-500/60 bg-black shadow-2xl">
                  <div className="h-17 w-8 rounded-[0.6rem] bg-gradient-to-b from-gray-600 to-gray-500" />
                </div>
                <div className="flex h-16 w-9 items-center justify-center rounded-xl border border-gray-600/80 bg-black shadow-lg">
                  <div className="h-11 w-6 rounded-lg bg-gradient-to-b from-gray-700 to-gray-600" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-3 backdrop-blur-sm">
              <Monitor className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-white">Mockups</span>
              <span className="ml-auto text-xs text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </div>
          </button>
        </div>

        {/* Device pills */}
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
          {devices.map((device) => {
            const isActive = activeDevice === device.id
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => setActiveDevice(device.id)}
                className={`rounded-full border px-4 py-1.5 font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive
                    ? 'border-white/20 bg-white text-slate-900 shadow-md shadow-white/10'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {device.label}
              </button>
            )
          })}
        </div>

        {/* Social proof */}
        <div className="mt-8 flex items-center justify-center gap-8 border-t border-white/5 pt-6 text-center">
          <div>
            <p className="text-lg font-bold text-white">10K+</p>
            <p className="text-[11px] text-slate-500">Screenshots created</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-lg font-bold text-white">21</p>
            <p className="text-[11px] text-slate-500">Pro templates</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-lg font-bold text-white">Free</p>
            <p className="text-[11px] text-slate-500">To get started</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
