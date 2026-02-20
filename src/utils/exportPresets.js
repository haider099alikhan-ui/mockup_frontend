// Export preset storage utilities
const STORAGE_KEY = 'screensnap-export-presets'

export const DEFAULT_PRESETS = [
  {
    id: 'app-store',
    name: 'App Store',
    format: 'png',
    quality: 100,
    scale: 3,
    description: 'High quality for App Store screenshots',
  },
  {
    id: 'social-media',
    name: 'Social Media',
    format: 'jpeg',
    quality: 85,
    scale: 2,
    description: 'Optimized for Instagram, Twitter, Facebook',
  },
  {
    id: 'high-res',
    name: 'High Resolution',
    format: 'png',
    quality: 100,
    scale: 4,
    description: 'Maximum quality for print or presentations',
  },
  {
    id: 'web-optimized',
    name: 'Web Optimized',
    format: 'webp',
    quality: 80,
    scale: 2,
    description: 'Small file size, good quality for web',
  },
  {
    id: 'standard',
    name: 'Standard',
    format: 'png',
    quality: 92,
    scale: 3,
    description: 'Balanced quality and file size',
  },
]

export function getExportPresets() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const custom = stored ? JSON.parse(stored) : []
    return [...DEFAULT_PRESETS, ...custom]
  } catch {
    return DEFAULT_PRESETS
  }
}

export function saveExportPreset(preset) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const custom = stored ? JSON.parse(stored) : []
    
    // Check if preset with same name exists
    const existingIndex = custom.findIndex((p) => p.name === preset.name)
    if (existingIndex >= 0) {
      custom[existingIndex] = { ...preset, id: custom[existingIndex].id || `custom-${Date.now()}` }
    } else {
      custom.push({ ...preset, id: preset.id || `custom-${Date.now()}` })
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom))
    return true
  } catch {
    return false
  }
}

export function deleteExportPreset(presetId) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const custom = stored ? JSON.parse(stored) : []
    const filtered = custom.filter((p) => p.id !== presetId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch {
    return false
  }
}
