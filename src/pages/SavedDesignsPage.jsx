import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, Trash2, Clock, FileText, Loader2, AlertCircle, Plus, Search, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { getSavedProjects, deleteProject as deleteLocalProject } from '../utils/projectStorage'

function SavedDesignsPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => { loadProjects() }, [isAuthenticated])

  const loadProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      if (isAuthenticated) {
        const data = await api.projects.list()
        setProjects(data.projects || [])
      } else {
        setProjects(getSavedProjects())
      }
    } catch (err) {
      console.warn('Falling back to localStorage:', err)
      setProjects(getSavedProjects())
    } finally {
      setLoading(false)
    }
  }

  const handleLoadProject = (project) => {
    navigate(`/editor/${project.template_id || project.templateId || 'social-neon'}`)
  }

  const handleDeleteProject = async (projectId, e) => {
    e.stopPropagation()
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    try {
      if (isAuthenticated) await api.projects.delete(projectId)
      else deleteLocalProject(projectId)
      setProjects((prev) => prev.filter((p) => p.id !== projectId))
    } catch {
      setError('Failed to delete project')
    }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      return date.toLocaleDateString()
    } catch { return 'Unknown' }
  }

  const displayProjects = projects
    .filter((p) => !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '')
      if (sortBy === 'slides') return (b.slides?.length || 0) - (a.slides?.length || 0)
      return new Date(b.updated_at || b.updatedAt) - new Date(a.updated_at || a.updatedAt)
    })

  const getCardGradient = (project) => {
    const bg = project.background_color || project.backgroundColor || '#3b82f6'
    return `linear-gradient(135deg, ${bg}dd 0%, ${bg}88 100%)`
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-3 backdrop-blur-xl shadow-sm shadow-black/[0.03]">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white shadow-md shadow-blue-500/25">
            A
          </div>
          <span className="text-[15px] font-bold text-gray-900">ShotMock</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        >
          <Plus className="h-3.5 w-3.5" />
          New design
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* ─── Page header ─── */}
        <div className="animate-fade-up mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My saved designs</h1>
            <p className="mt-1 text-sm text-gray-500">Pick up where you left off or start something new.</p>
          </div>
          {projects.length > 0 && (
            <span className="text-xs font-medium text-gray-400">{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {/* ─── Search + sort ─── */}
        {projects.length > 0 && (
          <div className="mb-7 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none shadow-sm transition-all focus:border-blue-300 focus:ring-3 focus:ring-blue-500/15"
              />
            </div>
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-sm text-gray-700 outline-none shadow-sm transition-all focus:border-blue-300 focus:ring-3 focus:ring-blue-500/15 cursor-pointer"
              >
                <option value="date">Recent</option>
                <option value="name">Name</option>
                <option value="slides">Slides</option>
              </select>
            </div>
          </div>
        )}

        {/* ─── Error ─── */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* ─── States ─── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28">
            <div className="mb-4 h-9 w-9 animate-spin rounded-full border-[3px] border-gray-200 border-t-blue-500" />
            <p className="text-sm text-gray-400">Loading projects…</p>
          </div>
        ) : displayProjects.length === 0 && !searchQuery ? (
          <div className="animate-fade-up flex flex-col items-center justify-center py-28 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-inner">
              <FolderOpen className="h-12 w-12 text-indigo-300" />
            </div>
            <h2 className="mb-2 text-xl font-extrabold text-gray-900">No saved designs yet</h2>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-500">
              Your saved designs will appear here. Start by picking a template.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Create your first design
            </button>
          </div>
        ) : displayProjects.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="mb-3 h-9 w-9 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">No projects match "{searchQuery}"</p>
            <button type="button" onClick={() => setSearchQuery('')} className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Clear search
            </button>
          </div>
        ) : (
          <div className="stagger-children grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleLoadProject(project)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl hover:shadow-black/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {/* Thumbnail */}
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{ background: getCardGradient(project) }}
                >
                  <div className="flex items-end gap-2 opacity-60 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-80">
                    {Array.from({ length: Math.min(project.slides?.length || 3, 5) }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-white/25 shadow-inner backdrop-blur-sm"
                        style={{ width: 28, height: i === Math.floor(Math.min(project.slides?.length || 3, 5) / 2) ? 64 : 52 }}
                      />
                    ))}
                  </div>
                  {/* Slide count badge */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    <FileText className="h-2.5 w-2.5" />
                    {project.slides?.length || 0} slides
                  </div>
                  {/* Delete on hover */}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-red-500/80 group-hover:opacity-100"
                    title="Delete project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{project.name}</h3>
                  {(project.template_name || project.templateName) && (
                    <span className="inline-block self-start rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold text-gray-500">
                      {project.template_name || project.templateName}
                    </span>
                  )}
                  <div className="mt-auto flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Clock className="h-3 w-3" />
                    {formatDate(project.updated_at || project.updatedAt)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default SavedDesignsPage
