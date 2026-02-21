import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, Cloud, Crown, Download, Loader2, Redo2, Undo2, User, Bookmark, Plus, Trash2, Save } from 'lucide-react'
import { getExportPresets, saveExportPreset, deleteExportPreset, DEFAULT_PRESETS } from '../utils/exportPresets'
import { useAuth } from '../contexts/AuthContext'

function ExportDropdown({ onExport, isDownloading }) {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState('png')
  const [quality, setQuality] = useState(92)
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [showSavePreset, setShowSavePreset] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [presets, setPresets] = useState(getExportPresets())
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleExport = useCallback(() => {
    setOpen(false)
    const scale = selectedPreset?.scale || 3
    onExport({ format, quality: quality / 100, scale })
  }, [format, quality, selectedPreset, onExport])

  const handlePresetSelect = useCallback((preset) => {
    setSelectedPreset(preset)
    setFormat(preset.format)
    setQuality(preset.quality)
  }, [])

  const handleSavePreset = useCallback(() => {
    if (presetName.trim()) {
      const preset = {
        name: presetName.trim(),
        format,
        quality,
        scale: 3,
        description: `${format.toUpperCase()} at ${quality}% quality`,
      }
      if (saveExportPreset(preset)) {
        setPresets(getExportPresets())
        setPresetName('')
        setShowSavePreset(false)
      }
    }
  }, [presetName, format, quality])

  const handleDeletePreset = useCallback((presetId, e) => {
    e.stopPropagation()
    if (deleteExportPreset(presetId)) {
      setPresets(getExportPresets())
      if (selectedPreset?.id === presetId) {
        setSelectedPreset(null)
      }
    }
  }, [selectedPreset])

  return (
    <div ref={ref} className="relative">
      <div className="flex">
        <button
          type="button"
          onClick={handleExport}
          disabled={isDownloading}
          className="flex items-center gap-1 cursor-pointer rounded-l-full bg-blue-500 pl-3 pr-1.5 py-1 text-xs font-semibold text-white shadow-sm transition-all duration-150 ease-out hover:bg-blue-400 active:scale-[0.97] disabled:opacity-60"
        >
          {isDownloading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Download className="h-3 w-3" />
          )}
          <span>{isDownloading ? 'Exporting...' : `Export ${format.toUpperCase()}`}</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex cursor-pointer items-center rounded-r-full border-l border-blue-400 bg-blue-500 px-1.5 py-1 text-white transition-all hover:bg-blue-400"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-64 rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 shadow-xl">
          {/* Presets */}
          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium text-gray-400">Presets</span>
              <button
                type="button"
                onClick={() => setShowSavePreset(!showSavePreset)}
                className="flex h-5 w-5 items-center justify-center rounded text-gray-500 transition-all hover:bg-[#333] hover:text-white"
                title="Save current settings as preset"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {presets.map((preset) => {
                const isSelected = selectedPreset?.id === preset.id
                const isDefault = DEFAULT_PRESETS.some((p) => p.id === preset.id)
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`group relative flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[10px] transition-all ${isSelected
                        ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500'
                        : 'bg-[#252525] text-gray-400 hover:bg-[#333] hover:text-gray-200'
                      }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        {isSelected && <Bookmark className="h-2.5 w-2.5 fill-current" />}
                        <span className="font-medium">{preset.name}</span>
                      </div>
                      <div className="text-[9px] text-gray-500">{preset.description}</div>
                    </div>
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={(e) => handleDeletePreset(preset.id, e)}
                        className="ml-2 rounded p-0.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400"
                        title="Delete preset"
                      >
                        <Trash2 className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Save Preset Form */}
          {showSavePreset && (
            <div className="mb-3 rounded-md border border-gray-700 bg-[#252525] p-2">
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Preset name"
                className="mb-2 w-full rounded border border-gray-600 bg-[#1a1a1a] px-2 py-1 text-[10px] text-white outline-none focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSavePreset()
                  if (e.key === 'Escape') {
                    setShowSavePreset(false)
                    setPresetName('')
                  }
                }}
                autoFocus
              />
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handleSavePreset}
                  className="flex-1 rounded bg-blue-500 px-2 py-1 text-[10px] font-medium text-white transition-all hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSavePreset(false)
                    setPresetName('')
                  }}
                  className="flex-1 rounded border border-gray-600 bg-[#1a1a1a] px-2 py-1 text-[10px] text-gray-400 transition-all hover:bg-[#333]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mb-3 border-t border-gray-700 pt-3">
            <span className="mb-2 block text-[10px] font-medium text-gray-400">Format</span>
            <div className="mb-3 flex gap-1">
              {['png', 'jpeg', 'webp'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium uppercase transition-all ${format === f
                      ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500'
                      : 'bg-[#252525] text-gray-400 hover:bg-[#333]'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {format !== 'png' && (
              <>
                <span className="mb-1 block text-[10px] font-medium text-gray-400">
                  Quality: {quality}%
                </span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mb-3 w-full accent-blue-500"
                />
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={isDownloading}
            className="w-full rounded-md bg-blue-500 py-1.5 text-xs font-semibold text-white transition-all hover:bg-blue-400 active:scale-[0.97] disabled:opacity-60"
          >
            Export {selectedPreset ? `(${selectedPreset.name})` : ''}
          </button>
        </div>
      )}
    </div>
  )
}

function Navbar({ projectName, setProjectName, onUndo, onRedo, canUndo, canRedo, onDownload, isDownloading, onSave, lastSaveTime }) {
  const navigate = useNavigate()
  const { user, profile, isPro, isAuthenticated } = useAuth()
  const [localName, setLocalName] = useState(projectName)
  const [saveStatus, setSaveStatus] = useState('idle')
  const isFirstRender = useRef(true)

  useEffect(() => {
    setLocalName(projectName)
  }, [projectName])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProjectName(localName)
    }, 300)
    return () => clearTimeout(timeout)
  }, [localName, setProjectName])

  const handleSave = useCallback(() => {
    if (onSave) {
      const success = onSave()
      if (success) {
        setSaveStatus('saving')
        setTimeout(() => setSaveStatus('saved'), 500)
      }
    }
  }, [onSave])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setSaveStatus('saving')
    const timer = setTimeout(() => setSaveStatus('saved'), 1500)
    return () => clearTimeout(timer)
  }, [localName])

  // Update save status when lastSaveTime changes (from auto-save)
  useEffect(() => {
    if (lastSaveTime) {
      setSaveStatus('saved')
      const timer = setTimeout(() => setSaveStatus('idle'), 2000)
      return () => clearTimeout(timer)
    }
  }, [lastSaveTime])

  return (
    <nav
      className="flex h-12 items-center justify-between border-b border-gray-800 px-4"
      style={{ backgroundColor: 'var(--sidebar-bg)' }}
    >
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-0.5 transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="h-6 w-6 rounded-md bg-red-500" />
        <span className="text-sm font-semibold text-white">AppLaunchpad</span>
      </button>

      <div className="flex flex-1 items-center justify-center gap-2">
        <input
          value={localName}
          onChange={(event) => setLocalName(event.target.value)}
          className="w-48 rounded-md border border-transparent bg-transparent px-2 py-1 text-center text-sm text-gray-200 outline-none transition-all duration-150 ease-out focus:border-gray-600 focus:bg-[#222222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        {saveStatus !== 'idle' && (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all duration-300 ${saveStatus === 'saving'
                ? 'bg-gray-700/60 text-gray-400'
                : 'bg-emerald-500/10 text-emerald-400'
              }`}
          >
            {saveStatus === 'saving' ? (
              <>
                <Cloud className="h-3 w-3 animate-pulse" />
                Saving…
              </>
            ) : (
              <>
                <Check className="h-3 w-3" />
                Saved
              </>
            )}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (⌘Z)"
          className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-700 transition-all duration-150 ease-out hover:bg-[#333333] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${canUndo ? 'text-gray-300' : 'cursor-not-allowed text-gray-600'
            }`}
        >
          <Undo2 className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (⌘⇧Z)"
          className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-700 transition-all duration-150 ease-out hover:bg-[#333333] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${canRedo ? 'text-gray-300' : 'cursor-not-allowed text-gray-600'
            }`}
        >
          <Redo2 className="h-3 w-3" />
        </button>
        {onSave && (
          <button
            type="button"
            onClick={handleSave}
            title="Save project (⌘S)"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-700 text-gray-300 transition-all duration-150 ease-out hover:bg-[#333333] hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Save className="h-3 w-3" />
          </button>
        )}

        {!isPro && (
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="flex items-center gap-1 cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1 text-xs font-semibold text-black shadow-sm transition-all duration-150 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Crown className="h-3 w-3" />
            <span>Upgrade</span>
          </button>
        )}

        <ExportDropdown onExport={onDownload} isDownloading={isDownloading} />

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-[10px] font-bold text-white">
          {isAuthenticated
            ? (profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()
            : <User className="h-3 w-3" />
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
