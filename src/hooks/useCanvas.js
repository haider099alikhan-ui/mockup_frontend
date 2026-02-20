import { useState, useCallback } from 'react'

const SLIDE_WIDTH = 280
const SLIDE_HEIGHT = 480

function useCanvas() {
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(() => {
    try {
      return localStorage.getItem('screensnap-show-grid') === 'true'
    } catch {
      return false
    }
  })
  const [snapToGrid, setSnapToGrid] = useState(() => {
    try {
      return localStorage.getItem('screensnap-snap-grid') === 'true'
    } catch {
      return false
    }
  })
  const [gridSize, setGridSize] = useState(() => {
    try {
      return Number(localStorage.getItem('screensnap-grid-size')) || 10
    } catch {
      return 10
    }
  })

  const zoomIn = useCallback(() => setZoom((z) => Math.min(200, z + 10)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(30, z - 10)), [])

  const resetZoom = useCallback(() => setZoom(100), [])

  const fitToViewport = useCallback(() => {
    const canvas = document.querySelector('.canvas-grid-background')
    if (!canvas) {
      setZoom(100)
      return
    }
    const rect = canvas.getBoundingClientRect()
    const availableW = rect.width - 80
    const availableH = rect.height - 140
    const scaleW = availableW / SLIDE_WIDTH
    const scaleH = availableH / SLIDE_HEIGHT
    const fitScale = Math.min(scaleW, scaleH)
    const fitZoom = Math.round(Math.max(30, Math.min(200, fitScale * 100)))
    setZoom(fitZoom)
  }, [])

  const toggleGrid = useCallback(() => {
    setShowGrid((prev) => {
      const newVal = !prev
      try {
        localStorage.setItem('screensnap-show-grid', String(newVal))
      } catch {}
      return newVal
    })
  }, [])

  const toggleSnapToGrid = useCallback(() => {
    setSnapToGrid((prev) => {
      const newVal = !prev
      try {
        localStorage.setItem('screensnap-snap-grid', String(newVal))
      } catch {}
      return newVal
    })
  }, [])

  const snapValue = useCallback((value) => {
    if (!snapToGrid) return value
    return Math.round(value / gridSize) * gridSize
  }, [snapToGrid, gridSize])

  return {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToViewport,
    showGrid,
    toggleGrid,
    snapToGrid,
    toggleSnapToGrid,
    gridSize,
    setGridSize,
    snapValue,
  }
}

export default useCanvas
