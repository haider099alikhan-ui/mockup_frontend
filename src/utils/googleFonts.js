// Popular Google Fonts for design mockups
export const GOOGLE_FONTS = [
  // Sans-serif
  { name: 'Inter', category: 'Sans-serif', weights: [400, 500, 600, 700, 800, 900] },
  { name: 'Roboto', category: 'Sans-serif', weights: [300, 400, 500, 700, 900] },
  { name: 'Open Sans', category: 'Sans-serif', weights: [300, 400, 600, 700, 800] },
  { name: 'Lato', category: 'Sans-serif', weights: [300, 400, 700, 900] },
  { name: 'Montserrat', category: 'Sans-serif', weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: 'Poppins', category: 'Sans-serif', weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: 'Raleway', category: 'Sans-serif', weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: 'Source Sans Pro', category: 'Sans-serif', weights: [300, 400, 600, 700, 900] },
  { name: 'Nunito', category: 'Sans-serif', weights: [300, 400, 600, 700, 800, 900] },
  { name: 'Work Sans', category: 'Sans-serif', weights: [300, 400, 500, 600, 700, 800, 900] },
  
  // Serif
  { name: 'Playfair Display', category: 'Serif', weights: [400, 500, 600, 700, 800, 900] },
  { name: 'Merriweather', category: 'Serif', weights: [300, 400, 700, 900] },
  { name: 'Lora', category: 'Serif', weights: [400, 500, 600, 700] },
  { name: 'PT Serif', category: 'Serif', weights: [400, 700] },
  { name: 'Crimson Text', category: 'Serif', weights: [400, 600, 700] },
  
  // Display
  { name: 'Oswald', category: 'Display', weights: [300, 400, 500, 600, 700] },
  { name: 'Bebas Neue', category: 'Display', weights: [400] },
  { name: 'Righteous', category: 'Display', weights: [400] },
  { name: 'Bangers', category: 'Display', weights: [400] },
  { name: 'Fredoka One', category: 'Display', weights: [400] },
  
  // Monospace
  { name: 'Roboto Mono', category: 'Monospace', weights: [300, 400, 500, 700] },
  { name: 'Source Code Pro', category: 'Monospace', weights: [300, 400, 500, 600, 700, 900] },
  { name: 'Fira Code', category: 'Monospace', weights: [300, 400, 500, 600, 700] },
  
  // Handwriting
  { name: 'Dancing Script', category: 'Handwriting', weights: [400, 500, 600, 700] },
  { name: 'Pacifico', category: 'Handwriting', weights: [400] },
  { name: 'Caveat', category: 'Handwriting', weights: [400, 500, 600, 700] },
]

// System fonts
export const SYSTEM_FONTS = [
  'Arial',
  'Helvetica',
  'Georgia',
  'Verdana',
  'Courier New',
  'Times New Roman',
  'Trebuchet MS',
  'Comic Sans MS',
  'Impact',
]

// Load Google Font dynamically
const loadedFonts = new Set()

export function loadGoogleFont(fontName) {
  if (loadedFonts.has(fontName)) return Promise.resolve()
  
  // Check if font is a Google Font
  const googleFont = GOOGLE_FONTS.find((f) => f.name === fontName)
  if (!googleFont) return Promise.resolve()
  
  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@${googleFont.weights.join(';')}&display=swap`
    link.onload = () => {
      loadedFonts.add(fontName)
      resolve()
    }
    link.onerror = () => resolve() // Fail silently
    document.head.appendChild(link)
  })
}

// Preload common fonts
export function preloadCommonFonts() {
  const commonFonts = ['Inter', 'Roboto', 'Montserrat', 'Poppins', 'Open Sans']
  commonFonts.forEach((font) => loadGoogleFont(font))
}
