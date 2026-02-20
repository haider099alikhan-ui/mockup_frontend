// Device preset storage utilities
const STORAGE_KEY = 'screensnap-custom-devices'

export function getCustomDevicePresets() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveCustomDevicePreset(preset) {
  try {
    const presets = getCustomDevicePresets()
    // Check if preset with same name exists
    const existingIndex = presets.findIndex((p) => p.name === preset.name)
    if (existingIndex >= 0) {
      presets[existingIndex] = preset
    } else {
      presets.push(preset)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets))
    return true
  } catch {
    return false
  }
}

export function deleteCustomDevicePreset(presetName) {
  try {
    const presets = getCustomDevicePresets()
    const filtered = presets.filter((p) => p.name !== presetName)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch {
    return false
  }
}
