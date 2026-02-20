import { useEffect, useRef, useState } from 'react'

// TODO: Wire this to AI image analysis for auto template conversion
function PhoneFrame({ imageUrl, screenshot: externalScreenshot, isEditorMode = false }) {
  const [screenshot, setScreenshot] = useState(imageUrl || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (imageUrl) {
      setScreenshot(imageUrl)
    }
  }, [imageUrl])

  useEffect(() => {
    return () => {
      if (screenshot && !imageUrl) {
        URL.revokeObjectURL(screenshot)
      }
    }
  }, [screenshot, imageUrl])

  const handleClick = () => {
    if (isEditorMode) return
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event) => {
    if (isEditorMode) return
    const file = event.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setScreenshot(url)
  }

  const handleDragOver = (event) => {
    if (isEditorMode) return
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    if (isEditorMode) return
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    if (isEditorMode) return
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setScreenshot(url)
  }

  const effectiveScreenshot = isEditorMode ? externalScreenshot : screenshot
  const hasScreenshot = Boolean(effectiveScreenshot)

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex h-[360px] w-[180px] items-center justify-center rounded-[3rem] border-4 border-gray-800 bg-gray-800 shadow-2xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-2 h-2 w-16 -translate-x-1/2 rounded-full bg-gray-900" />

        {/* Left side button */}
        <div className="absolute left-[-4px] top-16 h-10 w-1 rounded-full bg-gray-700" />
        {/* Right side buttons */}
        <div className="absolute right-[-4px] top-20 h-8 w-1 rounded-full bg-gray-700" />
        <div className="absolute right-[-4px] top-32 h-6 w-1 rounded-full bg-gray-700" />

        {/* Screen area */}
        <button
          type="button"
          className={`group relative h-[320px] w-[160px] overflow-hidden rounded-[2.4rem] bg-gray-200 ${
            isDragging ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800' : ''
          }`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-label={hasScreenshot ? 'Change app screenshot' : 'Upload app screenshot'}
        >
          {!isEditorMode && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          )}

          {hasScreenshot ? (
            <>
              <img
                src={effectiveScreenshot}
                alt="App screenshot"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
                <span className="mb-3 rounded px-2 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 bg-black/50">
                  Change Photo
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gray-100 px-4 text-center">
              <span className="text-xs font-medium text-gray-500">
                Click or drop screenshot
              </span>
              <span className="text-[10px] text-gray-400">PNG, JPG, up to 10MB</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default PhoneFrame

