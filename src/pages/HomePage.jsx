import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Folder, MessageCircle, LogOut, CreditCard, Zap, ArrowRight, Sparkles, ChevronDown, LayoutTemplate, Star, Shield, FileText, Globe } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import HeroBanner from '../components/home/HeroBanner'
import TemplateGrid from '../components/home/TemplateGrid'

function HomePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isPro, signOut, profile } = useAuth()
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showDevTools, setShowDevTools] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const devToolsRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowUserMenu(false)
      if (devToolsRef.current && !devToolsRef.current.contains(e.target)) setShowDevTools(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  const getUserInitial = () => {
    if (profile?.full_name) return profile.full_name[0].toUpperCase()
    if (user?.email) return user.email[0].toUpperCase()
    return 'U'
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ─── Navbar ─── */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-6 py-3 transition-all duration-300 ${scrolled
          ? 'border-b border-gray-100/80 bg-white/90 shadow-sm shadow-black/[0.04] backdrop-blur-xl'
          : 'bg-transparent'
          }`}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex cursor-pointer items-center gap-2.5 rounded-xl p-1 transition-all hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-sm font-black text-white shadow-md shadow-blue-500/30">
            A
          </div>
          <span className="text-[15px] font-bold tracking-tight text-gray-900">
            ShotMock
          </span>
        </button>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            Projects
          </button>
          {isAuthenticated && (
            <div className="relative" ref={devToolsRef}>
              <button
                type="button"
                onClick={() => setShowDevTools(!showDevTools)}
                className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Developer Tools
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showDevTools ? 'rotate-180' : ''}`} />
              </button>
              {showDevTools && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl shadow-gray-200/50 z-50">
                  <button
                    type="button"
                    onClick={() => { navigate('/policies'); setShowDevTools(false) }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-semibold block text-[13px]">Privacy & Terms</span>
                      <span className="text-[11px] text-gray-400">Host legal documents</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => { navigate('/app-ads'); setShowDevTools(false) }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-100">
                      <Globe className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-semibold block text-[13px]">app-ads.txt</span>
                      <span className="text-[11px] text-gray-400">Ad network verifier</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <>
              {!isPro && (
                <button
                  type="button"
                  onClick={() => navigate('/pricing')}
                  className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-1.5 text-xs font-semibold text-amber-700 shadow-sm transition-all duration-200 hover:shadow-md hover:shadow-amber-100 active:scale-95 sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Crown className="h-3.5 w-3.5 text-amber-500" />
                  Upgrade to Pro
                </button>
              )}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/30 ring-2 ring-white transition-all hover:scale-105 active:scale-95"
                >
                  {getUserInitial()}
                </button>

                {showUserMenu && (
                  <div className="animate-scale-in absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-black/[0.12]">
                    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 px-4 py-3.5">
                      <p className="text-sm font-semibold text-gray-900">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${isPro ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                        {isPro ? '✦ Pro' : 'Free'}
                      </span>
                    </div>
                    <div className="p-1.5">
                      <button
                        type="button"
                        onClick={() => { navigate('/saved'); setShowUserMenu(false) }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <Folder className="h-4 w-4 text-gray-400" />
                        My Projects
                      </button>
                      {!isPro && (
                        <button
                          type="button"
                          onClick={() => { navigate('/pricing'); setShowUserMenu(false) }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          Upgrade to Pro
                        </button>
                      )}
                    </div>
                    <div className="border-t border-gray-100 p-1.5">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate('/auth')}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => navigate('/auth?mode=signup')}
                className="flex items-center gap-1.5 rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-gray-900/20 transition-all duration-200 hover:bg-black hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                Get Started Free
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <HeroBanner
          setActiveFilter={setActiveFilter}
          scrollToTemplates={() => {
            const el = document.querySelector('[data-templates-section]')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        />

        {/* ─── Quick actions bar ─── */}
        <section className="flex flex-wrap items-center gap-3 px-6 pt-6">
          <button
            type="button"
            onClick={() => navigate('/editor/social-neon')}
            className="group flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Zap className="h-4 w-4" />
            <span>Create a design</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate('/saved')}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Folder className="h-3.5 w-3.5" />
              <span>My saved designs</span>
            </button>
          )}
        </section>

        {/* ─── Template Grid ─── */}
        <TemplateGrid
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* ─── Developer Hosting Section ─── */}
        <section className="mx-auto mt-16 max-w-5xl px-6">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-100">
              <Globe className="h-3.5 w-3.5" />
              Developer Tools
            </div>
            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Host your app's legal docs &amp; ads.txt
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-500">
              Instantly create, host, and link Privacy Policies, Terms of Service,
              DMCA notices, and app-ads.txt — all from one dashboard.
            </p>
          </div>

          <div className="stagger-children grid gap-5 sm:grid-cols-3">
            {/* Privacy Policy */}
            <button
              type="button"
              onClick={() => navigate(isAuthenticated ? '/policies' : '/auth?mode=signup')}
              className="group flex cursor-pointer flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 ring-1 ring-blue-100 transition-all group-hover:shadow-md group-hover:shadow-blue-200">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold text-gray-900">Privacy Policy</h3>
              <p className="mb-4 text-xs leading-relaxed text-gray-500">Write and host a privacy policy that complies with App Store and Google Play requirements.</p>
              <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                {isAuthenticated ? 'Open dashboard' : 'Get started'}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            {/* Terms of Service */}
            <button
              type="button"
              onClick={() => navigate(isAuthenticated ? '/policies' : '/auth?mode=signup')}
              className="group flex cursor-pointer flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-purple-100 ring-1 ring-violet-100 transition-all group-hover:shadow-md group-hover:shadow-violet-200">
                <FileText className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold text-gray-900">Terms of Service</h3>
              <p className="mb-4 text-xs leading-relaxed text-gray-500">Create hosted Terms of Service and DMCA policies ready to link in your app listing.</p>
              <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-violet-600 transition-colors group-hover:text-violet-700">
                {isAuthenticated ? 'Open dashboard' : 'Get started'}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            {/* app-ads.txt */}
            <button
              type="button"
              onClick={() => navigate(isAuthenticated ? '/app-ads' : '/auth?mode=signup')}
              className="group flex cursor-pointer flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 ring-1 ring-emerald-100 transition-all group-hover:shadow-md group-hover:shadow-emerald-200">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold text-gray-900">app-ads.txt</h3>
              <p className="mb-4 text-xs leading-relaxed text-gray-500">Publish your app-ads.txt to authorize ad networks transparently and boost ad revenue.</p>
              <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700">
                {isAuthenticated ? 'Open dashboard' : 'Get started'}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="mt-12 border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="flex flex-col items-center gap-3 md:items-start">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-black text-white">
                  A
                </div>
                <span className="text-sm font-bold text-gray-900">ShotMock</span>
              </div>
              <p className="max-w-xs text-center text-xs leading-relaxed text-gray-400 md:text-left">
                Create stunning app store screenshots and mockups in minutes.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center gap-2 md:items-end">
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <button type="button" onClick={() => navigate('/pricing')} className="transition-colors hover:text-gray-900">Pricing</button>
                <button type="button" onClick={() => navigate('/projects')} className="transition-colors hover:text-gray-900">Projects</button>
                <a href="mailto:support@applaunchpad.com" className="transition-colors hover:text-gray-900">Support</a>
              </div>
              <p className="text-xs text-gray-400">© {new Date().getFullYear()} ShotMock. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Chat bubble ─── */}
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  )
}

export default HomePage
