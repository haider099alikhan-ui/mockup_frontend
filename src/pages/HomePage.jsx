import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Folder, MessageCircle, Pencil, LogOut, CreditCard, Zap, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import HeroBanner from '../components/home/HeroBanner'
import TemplateGrid from '../components/home/TemplateGrid'

function HomePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isPro, signOut, profile } = useAuth()
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef(null)

  // Close menu on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
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
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-3 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-sm font-bold text-white shadow-sm">
            A
          </div>
          <span className="text-[15px] font-bold tracking-tight text-gray-900">
            AppLaunchpad
          </span>
        </button>

        <div className="flex items-center gap-3">
          {/* Pricing link */}
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="hidden items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:flex"
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="hidden items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:flex"
          >
            Projects
          </button>

          {isAuthenticated ? (
            <>
              {/* Upgrade button (for free users) */}
              {!isPro && (
                <button
                  type="button"
                  onClick={() => navigate('/pricing')}
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-1.5 text-xs font-semibold text-amber-700 shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:shadow-amber-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Crown className="h-3.5 w-3.5 text-amber-500" />
                  <span>Upgrade</span>
                </button>
              )}

              {/* User avatar + dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white shadow-sm ring-2 ring-white transition-transform hover:scale-105 active:scale-95"
                >
                  {getUserInitial()}
                </button>

                {showUserMenu && (
                  <div className="animate-scale-in absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {profile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${isPro
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-500'
                        }`}>
                        {isPro ? 'Pro' : 'Free'}
                      </span>
                    </div>
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => { navigate('/saved'); setShowUserMenu(false) }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <Folder className="h-4 w-4 text-gray-400" />
                        My Projects
                      </button>
                      {!isPro && (
                        <button
                          type="button"
                          onClick={() => { navigate('/pricing'); setShowUserMenu(false) }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          Upgrade to Pro
                        </button>
                      )}
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
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
              {/* Login / Sign up buttons */}
              <button
                type="button"
                onClick={() => navigate('/auth')}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => navigate('/auth?mode=signup')}
                className="flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-black hover:shadow-md active:scale-95"
              >
                Get Started Free
              </button>
            </>
          )}
        </div>
      </header>

      <main className="pb-8">
        {/* Action bar */}
        <section className="flex items-center justify-between px-6 pt-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/editor/social-neon')}
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 ease-out hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Create a design</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => navigate('/saved')}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 ease-out hover:border-gray-300 hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Folder className="h-3.5 w-3.5" />
                <span>My saved designs</span>
              </button>
            )}
          </div>
        </section>

        <HeroBanner
          setActiveFilter={setActiveFilter}
          scrollToTemplates={() => {
            const templatesSection = document.querySelector('[data-templates-section]')
            if (templatesSection) {
              templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
        />

        <TemplateGrid
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-xs font-bold text-white">
              A
            </div>
            <span className="text-sm font-bold text-gray-900">AppLaunchpad</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <button type="button" onClick={() => navigate('/pricing')} className="transition-colors hover:text-gray-700">Pricing</button>
            <span>·</span>
            <a href="mailto:support@applaunchpad.com" className="transition-colors hover:text-gray-700">Support</a>
            <span>·</span>
            <span>© {new Date().getFullYear()} AppLaunchpad</span>
          </div>
        </div>
      </footer>

      {/* Chat bubble */}
      <button
        type="button"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-200 ease-out hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  )
}

export default HomePage
