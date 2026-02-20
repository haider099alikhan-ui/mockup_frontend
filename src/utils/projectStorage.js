// Project storage utilities
const PROJECTS_STORAGE_KEY = 'screensnap-saved-projects'
const CURRENT_PROJECT_KEY = 'screensnap-current-project'

export function saveProject(projectData) {
  try {
    const {
      id,
      name,
      templateId,
      templateName,
      slides,
      createdAt,
      updatedAt,
    } = projectData

    const project = {
      id: id || `project-${Date.now()}`,
      name: name || 'Untitled Project',
      templateId: templateId || null,
      templateName: templateName || null,
      slides: JSON.parse(JSON.stringify(slides)), // Deep clone
      createdAt: createdAt || new Date().toISOString(),
      updatedAt: updatedAt || new Date().toISOString(),
    }

    // Save to projects list
    const projects = getSavedProjects()
    const existingIndex = projects.findIndex((p) => p.id === project.id)
    
    if (existingIndex >= 0) {
      projects[existingIndex] = { ...projects[existingIndex], ...project, updatedAt: new Date().toISOString() }
    } else {
      projects.push(project)
    }

    // Limit to 50 projects
    if (projects.length > 50) {
      projects.shift()
    }

    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
    
    // Also save as current project
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(project))
    
    return { success: true, project }
  } catch (error) {
    console.error('Failed to save project:', error)
    return { success: false, error: error.message }
  }
}

export function getSavedProjects() {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function getProjectById(projectId) {
  try {
    const projects = getSavedProjects()
    return projects.find((p) => p.id === projectId) || null
  } catch {
    return null
  }
}

export function deleteProject(projectId) {
  try {
    const projects = getSavedProjects()
    const filtered = projects.filter((p) => p.id !== projectId)
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filtered))
    
    // If deleting current project, clear it
    const current = getCurrentProject()
    if (current && current.id === projectId) {
      localStorage.removeItem(CURRENT_PROJECT_KEY)
    }
    
    return { success: true }
  } catch {
    return { success: false }
  }
}

export function getCurrentProject() {
  try {
    const stored = localStorage.getItem(CURRENT_PROJECT_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function clearCurrentProject() {
  try {
    localStorage.removeItem(CURRENT_PROJECT_KEY)
    return true
  } catch {
    return false
  }
}

// Auto-save current project (debounced)
let autoSaveTimeout = null
export function autoSaveProject(projectData, delay = 2000) {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }
  
  autoSaveTimeout = setTimeout(() => {
    saveProject(projectData)
  }, delay)
}
