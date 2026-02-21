import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import TemplateCard from './TemplateCard'
import FilterChips from './FilterChips'
import { templates, TEMPLATE_CATEGORIES } from '../../data/templates'

function TemplateGrid({ activeFilter, setActiveFilter, viewMode, setViewMode }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const templateCounts = useMemo(() => {
    const counts = {}
    const chips = Object.values(TEMPLATE_CATEGORIES)
    for (const cat of chips) {
      counts[cat] = templates.filter((t) =>
        cat === 'all' ? true : t.categories.includes(cat),
      ).length
    }
    counts['app-store-screenshots'] = templates.filter((t) => t.type !== 'mockup').length
    return counts
  }, [])

  const filtered = templates.filter((template) => {
    if (activeFilter === 'app-store-screenshots') {
      const isNotMockup = template.type !== 'mockup'
      const matchesSearch =
        !searchQuery ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      return isNotMockup && matchesSearch
    }

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
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            Templates
          </h2>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-all duration-200 ease-out hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="text-lg">≡</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${searchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search templates…"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20"
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
            className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-black hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Plus className="h-4 w-4" />
            <span>Start from scratch</span>
          </button>
          <span className="text-sm text-gray-400">
            Showing {filtered.length} template{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* 3 column grid on large screens */}
        <div
          className={`stagger-children mt-2 grid gap-5 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
            }`}
        >
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Search className="h-7 w-7 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-500">No templates match your search</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveFilter('all') }}
              className="mt-3 text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default TemplateGrid
