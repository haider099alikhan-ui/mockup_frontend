import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FolderOpen, Trash2, Clock, FileText, Loader2, AlertCircle, Plus, Search } from 'lucide-react'
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
  const [sortBy, setSortBy] = useState('date') // date | name | slides

  useEffect(() => {
    loadProjects()
  }, [isAuthenticated])

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
      console.warn('Failed to load projects from API, falling back to localStorage:', err)
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
    if (!window.confirm('Are you sure you want to delete this project?')) return

    try {
      if (isAuthenticated) {
        await api.projects.delete(projectId)
      } else {
        deleteLocalProject(projectId)
      }
      setProjects((prev) => prev.filter((p) => p.id !== projectId))
    } catch (err) {
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
    } catch {
      return 'Unknown'
    }
  }

  // Filter and sort
  const displayProjects = projects
    .filter((p) => !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '')
      if (sortBy === 'slides') return (b.slides?.length || 0) - (a.slides?.length || 0)
      return new Date(b.updated_at || b.updatedAt) - new Date(a.updated_at || a.updatedAt)
    })

  // Generate a gradient from template background color
  const getCardGradient = (project) => {
    const bg = project.background_color || project.backgroundColor || '#3b82f6'
    return `linear-gradient(135deg, ${bg} 0%, ${bg}99 100%)`
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
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
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-black active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New design</span>
        </button>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="animate-fade-up mb-6">
          <h1 className="mb-1 text-2xl font-bold text-gray-900">My saved designs</h1>
          <p className="text-sm text-gray-500">Pick up where you left off or start something new.</p>
        </div>

        {/* Search and sort bar */}
        {projects.length > 0 && (
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="date">Recent</option>
              <option value="name">Name</option>
              <option value="slides">Slides</option>
            </select>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
            <p className="text-sm text-gray-500">Loading projects…</p>
          </div>
        ) : displayProjects.length === 0 && !searchQuery ? (
          <div className="animate-fade-up flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50">
              <FolderOpen className="h-10 w-10 text-gray-300" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">No saved designs yet</h2>
            <p className="mb-8 max-w-xs text-sm text-gray-500">
              Your saved designs will appear here. Create a design to get started.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 ease-out hover:shadow-lg active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Create a design</span>
            </button>
          </div>
        ) : displayProjects.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="mb-3 h-8 w-8 text-gray-300" />
            <p className="text-sm text-gray-500">No projects match "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleLoadProject(project)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {/* Color thumbnail */}
                <div
                  className="flex h-24 items-center justify-center"
                  style={{ background: getCardGradient(project) }}
                >
                  <div className="flex gap-1.5 opacity-50">
                    {Array.from({ length: Math.min(project.slides?.length || 3, 5) }).map((_, i) => (
                      <div
                        key={i}
                        className="h-12 w-7 rounded-md bg-white/20 shadow-inner"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-1 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-1">
                        {project.name}
                      </h3>
                      {(project.template_name || project.templateName) && (
                        <p className="text-xs text-gray-500">{project.template_name || project.templateName}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="ml-2 rounded-lg p-1.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{project.slides?.length || 0} slides</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(project.updated_at || project.updatedAt)}</span>
                    </div>
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
