import { useState, useCallback } from 'react'

function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const downloadCurrentSlide = useCallback(async (projectName = 'design', slideIndex = 0, options = {}) => {
    setIsDownloading(true)
    setDownloadProgress(0)
    try {
      const html2canvas = (await import('html2canvas')).default
      const el = document.getElementById('active-slide-preview')
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
      })

      const link = document.createElement('a')
      link.download = `${projectName}-slide-${slideIndex + 1}.${ext}`
      link.href = canvas.toDataURL(mimeType, quality)
      link.click()
      setDownloadProgress(100)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Failed to export slide' }
    } finally {
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }, [])

  const downloadAllSlides = useCallback(async (slides, projectName = 'design', options = {}) => {
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

      for (let i = 0; i < slideElements.length; i++) {
        setDownloadProgress(Math.round(((i + 0.5) / slideElements.length) * 90))
        const scale = options.scale || 3
        const canvas = await html2canvas(slideElements[i], {
          scale,
          backgroundColor: null,
          useCORS: true,
          logging: false,
        })
        const blob = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error(`Failed to render slide ${i + 1}`))),
            mimeType,
            quality,
          )
        })
        zip.file(`${projectName}-slide-${i + 1}.${ext}`, blob)
        setDownloadProgress(Math.round(((i + 1) / slideElements.length) * 90))
      }

      setDownloadProgress(95)
      const content = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.download = `${projectName}-screenshots.zip`
      link.href = URL.createObjectURL(content)
      link.click()
      URL.revokeObjectURL(link.href)
      setDownloadProgress(100)
      return { success: true, count: slideElements.length }
    } catch (err) {
      return { success: false, error: err.message || 'Export failed' }
    } finally {
      setIsDownloading(false)
      setTimeout(() => setDownloadProgress(0), 500)
    }
  }, [])

  return { isDownloading, downloadProgress, downloadCurrentSlide, downloadAllSlides }
}

export default useDownload
