import { useState, useRef, useCallback } from 'react'
import { Upload, Image, Palette, X, Check } from 'lucide-react'

function UploadsTab({ slides, activeSlide, selectedElementId, onUpdateElement }) {
  const [activeSubTab, setActiveSubTab] = useState('uploads')
  const [files, setFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [lastInserted, setLastInserted] = useState(null)
  const fileInputRef = useRef(null)

  const selectedDevice = (() => {
    if (!selectedElementId || !slides?.[activeSlide]) return null
    const el = slides[activeSlide].elements.find((e) => e.id === selectedElementId)
    return el?.type === 'device' ? el : null
  })()

  const handleFiles = useCallback((fileList) => {
    const newFiles = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: f.name,
        url: URL.createObjectURL(f),
        size: f.size,
      }))
    setFiles((prev) => [...newFiles, ...prev])
  }, [])

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault()
      setIsDragOver(false)
      handleFiles(event.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleRemove = useCallback((id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleInsertIntoDevice = useCallback((fileUrl) => {
    if (!selectedDevice || !onUpdateElement) return
    onUpdateElement(selectedDevice.id, { screenshot: fileUrl })
    setLastInserted(fileUrl)
    setTimeout(() => setLastInserted(null), 1500)
  }, [selectedDevice, onUpdateElement])

  return (
    <div className="space-y-3">
      <div className="flex gap-1 rounded-lg bg-[#1a1a1a] p-1">
        {[
          { id: 'uploads', label: 'Upload Assets', icon: Upload },
          { id: 'brand', label: 'Brand Assets', icon: Palette },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSubTab(id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-medium transition-all duration-150 ${
              activeSubTab === id
                ? 'bg-[#333] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>

      {activeSubTab === 'uploads' && (
        <div className="space-y-3 animate-fade-slide-in">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-8 text-center transition-all duration-200 ${
              isDragOver
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 bg-[#232323] hover:border-gray-500'
            }`}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') fileInputRef.current?.click()
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <Upload className="mb-2 h-5 w-5 text-gray-400" />
            <p className="text-[11px] font-medium text-gray-300">
              Click or drag images here
            </p>
            <p className="mt-1 text-[10px] text-gray-500">
              PNG, JPG, SVG up to 10MB
            </p>
          </div>

          {selectedDevice ? (
            <div className="rounded-md border border-blue-500/30 bg-blue-500/5 px-3 py-2">
              <p className="text-[10px] text-blue-300">
                Device selected — click any image below to insert it as a screenshot.
              </p>
            </div>
          ) : (
            <p className="text-center text-[10px] leading-relaxed text-gray-500">
              Select a device on the canvas first, then click an image to insert it.
            </p>
          )}

          {files.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {files.map((file) => (
                <div key={file.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => handleInsertIntoDevice(file.url)}
                    disabled={!selectedDevice}
                    className="block w-full"
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      className={`h-16 w-full rounded-md border object-cover transition-all duration-200 ${
                        selectedDevice
                          ? 'cursor-pointer border-gray-700 hover:border-blue-500 hover:shadow-lg'
                          : 'cursor-not-allowed border-gray-700 opacity-60'
                      } ${lastInserted === file.url ? 'ring-2 ring-emerald-500' : ''}`}
                    />
                  </button>
                  {lastInserted === file.url && (
                    <div className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(file.id)}
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'brand' && (
        <div className="space-y-3 animate-fade-slide-in">
          <div className="flex flex-col items-center justify-center rounded-lg border border-gray-700 bg-[#232323] px-3 py-8 text-center">
            <Palette className="mb-2 h-5 w-5 text-gray-500" />
            <p className="text-[11px] font-medium text-gray-300">Brand Assets</p>
            <p className="mt-1 max-w-[180px] text-[10px] text-gray-500">
              Upload your app icon, logo, and brand colors to use across templates.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-[#1a1a1a] p-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-gray-600 bg-[#232323]">
                <Image className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-200">App Icon</p>
                <p className="text-[10px] text-gray-500">Click to upload</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-[#1a1a1a] p-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-gray-600 bg-[#232323]">
                <Image className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-200">Logo</p>
                <p className="text-[10px] text-gray-500">Click to upload</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadsTab
