import { useState, useCallback } from 'react'
import { api } from '../services/api'
import { supabase } from '../lib/supabaseClient'

function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [exportLimitReached, setExportLimitReached] = useState(false)
  const [exportInfo, setExportInfo] = useState(null)

  // Check export limits before downloading
  const checkExportLimit = async () => {
    if (!supabase) return { canExport: true } // No auth = no limits
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return { canExport: true } // Not logged in = localStorage mode
      const result = await api.exports.check()
      return result
    } catch {
      return { canExport: true } // On error, allow export
    }
  }

  // Track export usage after successful download
  const trackExport = async () => {
    if (!supabase) return
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const result = await api.exports.track()
      setExportInfo(result)
    } catch {
      // Silent fail — don't block the user
    }
  }

  const downloadCurrentSlide = useCallback(async (projectName = 'design', slideIndex = 0, options = {}) => {
    // Check export limits
    const limitCheck = await checkExportLimit()
    if (!limitCheck.canExport) {
      setExportLimitReached(true)
      setExportInfo(limitCheck)
      return { success: false, error: 'Export limit reached', limitReached: true }
    }

    setIsDownloading(true)
    setDownloadProgress(0)
    try {
      const html2canvas = (await import('html2canvas')).default
      let el = document.getElementById('active-slide-preview')
      if (!el) {
        el = document.querySelector('[data-slide-export]')
      }
      if (!el) throw new Error('No slide element found to export')

      const format = options.format || 'png'
      const quality = options.quality || 0.92
      const mimeType = format === 'png' ? 'image/png' : format === 'jpeg' ? 'image/jpeg' : 'image/webp'
      const ext = format === 'jpeg' ? 'jpg' : format

      const scale = options.scale || 3
      const canvas = await html2canvas(el, {
        scale,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: true,
      })

      const link = document.createElement('a')
      link.download = `${projectName}-slide-${slideIndex + 1}.${ext}`
      link.href = canvas.toDataURL(mimeType, quality)
      link.click()
      setDownloadProgress(100)

      // Track the export
      await trackExport()

      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Failed to export slide' }
    } finally {
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }, [])

  const renderSlideToCanvas = (html2canvas, el, scale) => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Render timed out'))
      }, 15000)

      html2canvas(el, {
        scale,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: true,
      })
        .then((canvas) => {
          clearTimeout(timeout)
          resolve(canvas)
        })
        .catch((err) => {
          clearTimeout(timeout)
          reject(err)
        })
    })
  }

  const downloadAllSlides = useCallback(async (slides, projectName = 'design', options = {}) => {
    // Check export limits
    const limitCheck = await checkExportLimit()
    if (!limitCheck.canExport) {
      setExportLimitReached(true)
      setExportInfo(limitCheck)
      return { success: false, error: 'Export limit reached', limitReached: true }
    }

    setIsDownloading(true)
    setDownloadProgress(0)
    try {
      const format = options.format || 'png'
      const quality = options.quality || 0.92
      const mimeType = format === 'png' ? 'image/png' : format === 'jpeg' ? 'image/jpeg' : 'image/webp'
      const ext = format === 'jpeg' ? 'jpg' : format

      const html2canvas = (await import('html2canvas')).default
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      const slideElements = document.querySelectorAll('[data-slide-export]')
      if (slideElements.length === 0) {
        throw new Error('No slides found to export. Make sure slides are visible on the canvas.')
      }

      let successCount = 0
      const totalSlides = slideElements.length

      for (let i = 0; i < totalSlides; i++) {
        setDownloadProgress(Math.round(((i + 0.5) / totalSlides) * 90))
        const scale = options.scale || 3

        try {
          const canvas = await renderSlideToCanvas(html2canvas, slideElements[i], scale)
          const blob = await new Promise((resolve, reject) => {
            canvas.toBlob(
              (b) => (b ? resolve(b) : reject(new Error(`Failed to render slide ${i + 1}`))),
              mimeType,
              quality,
            )
          })
          zip.file(`${projectName}-slide-${i + 1}.${ext}`, blob)
          successCount++
        } catch (slideErr) {
          console.warn(`Slide ${i + 1} export failed, skipping:`, slideErr.message)
        }

        setDownloadProgress(Math.round(((i + 1) / totalSlides) * 90))
      }

      if (successCount === 0) {
        throw new Error('All slides failed to export')
      }

      setDownloadProgress(95)
      const content = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.download = `${projectName}-screenshots.zip`
      link.href = URL.createObjectURL(content)
      link.click()
      URL.revokeObjectURL(link.href)
      setDownloadProgress(100)

      // Track the export
      await trackExport()

      return { success: true, count: successCount }
    } catch (err) {
      console.error('Export failed:', err)
      return { success: false, error: err.message || 'Export failed' }
    } finally {
      setIsDownloading(false)
      setTimeout(() => setDownloadProgress(0), 500)
    }
  }, [])

  const dismissExportLimit = useCallback(() => {
    setExportLimitReached(false)
    setExportInfo(null)
  }, [])

  return {
    isDownloading,
    downloadProgress,
    downloadCurrentSlide,
    downloadAllSlides,
    exportLimitReached,
    exportInfo,
    dismissExportLimit,
  }
}

export default useDownload
