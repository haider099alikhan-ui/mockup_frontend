import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import TemplateCard from './TemplateCard'
import FilterChips from './FilterChips'
import { templates, TEMPLATE_CATEGORIES } from '../../data/templates'

function TemplateGrid({ activeFilter, setActiveFilter, viewMode, setViewMode }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const templateCounts = useMemo(() => {
    const counts = {}
    const chips = Object.values(TEMPLATE_CATEGORIES)
    for (const cat of chips) {
      counts[cat] = templates.filter((t) =>
        cat === 'all' ? true : t.categories.includes(cat),
      ).length
    }
    // Add count for app-store-screenshots (non-mockup templates)
    counts['app-store-screenshots'] = templates.filter((t) => t.type !== 'mockup').length
    return counts
  }, [])

  const filtered = templates.filter((template) => {
    // Special handling for app-store-screenshots filter (show non-mockup templates)
    if (activeFilter === 'app-store-screenshots') {
      const isNotMockup = template.type !== 'mockup'
      const matchesSearch =
        !searchQuery ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      return isNotMockup && matchesSearch
    }
    
    // Regular category filtering
    const matchesCategory =
      activeFilter === 'all' || template.categories.includes(activeFilter)
    const matchesSearch =
      !searchQuery ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="mt-10 px-6 pb-20" data-templates-section>
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold tracking-tight text-gray-900">
            Templates
          </h2>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all duration-200 ease-out hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="text-lg">≡</span>
          </button>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates…"
            className="w-full rounded-xl bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <FilterChips
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          templateCounts={templateCounts}
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/editor/sports-blue')}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-black active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Plus className="h-4 w-4" />
            <span>Start from scratch</span>
          </button>
          <span className="text-sm text-gray-400">
            Showing {filtered.length} template{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div
          className={`mt-2 grid gap-5 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TemplateGrid
