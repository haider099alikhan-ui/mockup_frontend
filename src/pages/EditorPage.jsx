import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import App from '../App'
import { templates } from '../data/templates'
import useSlides from '../hooks/useSlides'
import Onboarding from '../components/Onboarding'
import { getCurrentProject, getProjectById } from '../utils/projectStorage'

function EditorPage() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Check if we should load a saved project
  const savedProject = getCurrentProject()
  const shouldLoadSaved = savedProject && savedProject.templateId === templateId

  // Always resolve full template from templates data (ensures builders get complete template)
  const templateFromRoute = templates.find((t) => t.id === templateId)

  // Pass saved slides if available, otherwise use template
  const slidesHook = useSlides(
    templateFromRoute,
    shouldLoadSaved && savedProject.slides ? savedProject.slides : null
  )

  useEffect(() => {
    if (!templateFromRoute) {
      navigate('/', { replace: true })
    }
  }, [navigate, templateFromRoute])

  const handleShowHelp = useCallback(() => {
    setShowOnboarding(true)
  }, [])

  const handleCloseOnboarding = useCallback(() => {
    setShowOnboarding(false)
  }, [])

  if (!templateFromRoute) {
    return null
  }

  return (
    <div className="flex h-screen flex-col bg-[#111111] text-gray-100">
      <Onboarding forceShow={showOnboarding} onClose={handleCloseOnboarding} />
      <div className="flex h-10 items-center gap-2 bg-[#1a1a1a] px-4 text-xs text-gray-300">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-full px-3 py-1 text-[11px] font-medium text-gray-200 transition-all duration-150 ease-out hover:bg-[#2b2b2b] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          ← Back to Templates
        </button>
        <span className="text-gray-500">/</span>
        <span className="flex-1">{templateFromRoute.templateName || templateFromRoute.name}</span>
        <button
          type="button"
          onClick={handleShowHelp}
          title="Show guided tour"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-600 text-[10px] font-bold text-gray-400 transition-all hover:bg-[#333] hover:text-white"
        >
          ?
        </button>
      </div>
      <App slidesHook={slidesHook} templateId={templateId} templateName={templateFromRoute?.name} />
    </div>
  )
}

export default EditorPage
