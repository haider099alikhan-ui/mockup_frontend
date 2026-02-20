import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Folder, MessageCircle, Pencil, RefreshCw, User } from 'lucide-react'
import HeroBanner from '../components/home/HeroBanner'
import TemplateGrid from '../components/home/TemplateGrid'

function HomePage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-sm font-bold text-white shadow-sm">
            A
          </div>
          <span className="text-[15px] font-bold tracking-tight text-gray-900">
            AppLaunchpad
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-gray-900 px-4 py-1.5 text-xs font-semibold text-gray-900 transition-all duration-200 ease-out hover:bg-gray-900 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Crown className="h-3.5 w-3.5 text-yellow-500" />
            <span>Upgrade</span>
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>

      <main className="pb-24">
        {/* Action bar */}
        <section className="flex items-center justify-between px-6 pt-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/editor/sports-blue')}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-black active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Create a design</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/saved')}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 ease-out hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Folder className="h-3.5 w-3.5" />
              <span>My saved designs</span>
            </button>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 transition-all duration-200 ease-out hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Switch to legacy version</span>
          </button>
        </section>

        <HeroBanner 
          setActiveFilter={setActiveFilter}
          scrollToTemplates={() => {
            // Scroll to templates section smoothly
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

      {/* Intercom-style chat bubble */}
      <button
        type="button"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all duration-200 ease-out hover:bg-blue-600 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  )
}

export default HomePage
