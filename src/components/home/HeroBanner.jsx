import { useState } from 'react'
import { Sparkles, Smartphone, Monitor, ArrowRight, Star } from 'lucide-react'
import { TEMPLATE_CATEGORIES } from '../../data/templates'

function HeroBanner({ setActiveFilter, scrollToTemplates }) {
  const [activeDevice, setActiveDevice] = useState('iphone-69')

  const devices = [
    { id: 'iphone-69', label: 'iPhone 6.9"' },
    { id: 'ipad-13', label: 'iPad 13"' },
    { id: 'android-phone', label: 'Android' },
    { id: 'more-sizes', label: 'More sizes' },
    { id: 'custom-size', label: 'Custom' },
  ]

  return (
    <section className="mt-5 px-6">
      <div className="animate-fade-up relative mx-auto max-w-5xl overflow-hidden rounded-[28px]"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% -10%, rgba(99,102,241,0.45) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(139,92,246,0.2) 0%, transparent 60%), #05050f'
        }}
      >
        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="animate-float absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-12 -left-12 h-60 w-60 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', animation: 'float 4.5s ease-in-out infinite reverse' }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-36 w-36 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite' }}
          />
          {/* Grid dots */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }}
          />
        </div>

        <div className="relative px-8 pb-10 pt-12">
          {/* ─── Headline ─── */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 text-xs font-semibold text-indigo-300 ring-1 ring-white/10 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Professional screenshot templates
            </div>
            <h1 className="mx-auto mb-4 max-w-xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Create{' '}
              <span className="relative inline-block">
                <span className="gradient-text">stunning</span>
              </span>
              {' '}app store screenshots
            </h1>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Beautiful templates, device mockups, and one-click export.
              Design screenshots that convert — in minutes, not hours.
            </p>
          </div>

          {/* ─── Category cards ─── */}
          <div className="stagger-children flex flex-wrap items-stretch justify-center gap-5">
            {/* App Store Screenshots */}
            <button
              type="button"
              onClick={() => { setActiveFilter('app-store-screenshots'); setTimeout(() => scrollToTemplates?.(), 100) }}
              className="group flex h-56 w-64 cursor-pointer flex-col overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-2 hover:ring-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: 'linear-gradient(145deg, rgba(79,70,229,.8) 0%, rgba(124,58,237,.8) 60%, rgba(37,99,235,.6) 100%)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex flex-1 items-end justify-center gap-2 px-5 pb-4 pt-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-between rounded-xl p-1.5 shadow-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: ['#4F46E5', '#7C3AED', '#2563EB', '#6D28D9', '#4338CA'][i],
                      width: 34,
                      height: i === 2 ? 80 : 64,
                      marginTop: i === 2 ? -16 : 0,
                      transitionDelay: `${i * 30}ms`,
                    }}
                  >
                    <div className="h-1.5 w-5 rounded-full bg-white/50" />
                    <div className="h-8 w-5 rounded-lg border border-white/20 bg-black/30" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-400/20">
                  <Smartphone className="h-3.5 w-3.5 text-indigo-300" />
                </div>
                <span className="text-xs font-semibold text-white">App Store Screenshots</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Mockups */}
            <button
              type="button"
              onClick={() => { setActiveFilter(TEMPLATE_CATEGORIES.MOCKUPS); setTimeout(() => scrollToTemplates?.(), 100) }}
              className="group flex h-56 w-64 cursor-pointer flex-col overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-2 hover:ring-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              style={{ background: 'linear-gradient(145deg, rgba(15,15,30,.95) 0%, rgba(30,20,60,.9) 100%)', backdropFilter: 'blur(12px)' }}
            >
              <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5">
                <div className="absolute -left-6 top-4 h-24 w-24 rounded-full bg-blue-500/15 blur-2xl" />
                <div className="absolute -right-4 bottom-0 h-20 w-20 rounded-full bg-violet-500/20 blur-xl" />
                <div className="relative flex items-end gap-3 transition-all duration-300 group-hover:scale-110">
                  <div className="flex h-16 w-9 items-center justify-center rounded-2xl border border-gray-700/80 bg-gray-900 shadow-xl">
                    <div className="h-11 w-6 rounded-xl bg-gradient-to-b from-gray-700 to-gray-600" />
                  </div>
                  <div className="flex h-24 w-[52px] items-center justify-center rounded-[1rem] border-2 border-gray-600/60 bg-gray-950 shadow-2xl shadow-black/60">
                    <div className="h-[72px] w-9 rounded-[0.7rem] bg-gradient-to-b from-gray-600 to-gray-500" />
                  </div>
                  <div className="flex h-16 w-9 items-center justify-center rounded-2xl border border-gray-700/80 bg-gray-900 shadow-xl">
                    <div className="h-11 w-6 rounded-xl bg-gradient-to-b from-gray-700 to-gray-600" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 border-t border-white/8 bg-black/40 px-4 py-3 backdrop-blur-sm">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-violet-400/20">
                  <Monitor className="h-3.5 w-3.5 text-violet-300" />
                </div>
                <span className="text-xs font-semibold text-white">Mockups</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>

          {/* ─── Device pills ─── */}
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2">
            {devices.map((device) => {
              const isActive = activeDevice === device.id
              return (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => setActiveDevice(device.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${isActive
                      ? 'bg-white text-slate-900 shadow-lg shadow-white/15'
                      : 'bg-white/6 text-slate-400 ring-1 ring-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {device.label}
                </button>
              )
            })}
          </div>

          {/* ─── Social proof ─── */}
          <div className="mt-8 flex items-center justify-center gap-10 border-t border-white/6 pt-6 text-center">
            <div>
              <p className="text-xl font-extrabold text-white">10K+</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">Screenshots created</p>
            </div>
            <div className="h-8 w-px bg-white/8" />
            <div>
              <p className="text-xl font-extrabold text-white">21</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">Pro templates</p>
            </div>
            <div className="h-8 w-px bg-white/8" />
            <div>
              <div className="flex items-center justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">Top rated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
