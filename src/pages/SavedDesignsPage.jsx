import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FolderOpen, Trash2, Clock, FileText } from 'lucide-react'
import { getSavedProjects, deleteProject, saveProject } from '../utils/projectStorage'

function SavedDesignsPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setProjects(getSavedProjects())
  }, [])

  const handleLoadProject = (project) => {
    // Set as current project and navigate to editor
    saveProject({ ...project, updatedAt: new Date().toISOString() })
    navigate(`/editor/${project.templateId || 'sports-blue'}`)
  }

  const handleDeleteProject = (projectId, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId)
      setProjects(getSavedProjects())
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
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
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My saved designs</h1>
          <button
            type="button"
            onClick={() => navigate('/editor/sports-blue')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-black active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Create new</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
              <FolderOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">No saved designs</h2>
            <p className="mb-8 text-sm text-gray-500">
              Your saved designs will appear here. Create a design to get started.
            </p>
            <button
              type="button"
              onClick={() => navigate('/editor/sports-blue')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-black active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Create a design</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleLoadProject(project)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex-1 p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-1">
                          {project.name}
                        </h3>
                        {project.templateName && (
                          <p className="text-xs text-gray-500">{project.templateName}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="ml-2 rounded p-1 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
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
                        <span>{formatDate(project.updatedAt)}</span>
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
