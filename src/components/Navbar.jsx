import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, Cloud, Crown, Download, Loader2, Redo2, Undo2, User, Bookmark, Plus, Trash2, Save, Zap } from 'lucide-react'
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
      const preset = { name: presetName.trim(), format, quality, scale: 3, description: `${format.toUpperCase()} at ${quality}% quality` }
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
      if (selectedPreset?.id === presetId) setSelectedPreset(null)
    }
  }, [selectedPreset])

  return (
    <div ref={ref} className="relative">
      {/* Split export button */}
      <div className="flex">
        <button
          type="button"
          onClick={handleExport}
          disabled={isDownloading}
          className="flex cursor-pointer items-center gap-1.5 rounded-l-full bg-blue-500 pl-3.5 pr-2 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-400 active:scale-[0.97] disabled:opacity-60 focus-visible:outline-none"
        >
          {isDownloading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
          <span>{isDownloading ? 'Exporting…' : `Export ${format.toUpperCase()}`}</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex cursor-pointer items-center rounded-r-full border-l border-blue-400/60 bg-blue-500 px-1.5 py-1.5 text-white transition-all hover:bg-blue-400 focus-visible:outline-none"
        >
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div className="animate-scale-in absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-white/8 bg-[#1c1c1c] shadow-2xl shadow-black/60">
          {/* Presets */}
          <div className="border-b border-white/6 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Presets</span>
              <button
                type="button"
                onClick={() => setShowSavePreset(!showSavePreset)}
                className="flex h-5 w-5 items-center justify-center rounded-md text-gray-500 transition-all hover:bg-white/8 hover:text-gray-300"
                title="Save current settings as preset"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {showSavePreset && (
              <div className="mb-2 overflow-hidden rounded-lg border border-white/8 bg-[#252525] p-2">
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="Preset name…"
                  className="mb-2 w-full rounded-md border border-white/8 bg-[#1a1a1a] px-2.5 py-1.5 text-[11px] text-white outline-none placeholder-gray-600 focus:border-blue-500"
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSavePreset(); if (e.key === 'Escape') { setShowSavePreset(false); setPresetName('') } }}
                  autoFocus
                />
                <div className="flex gap-1.5">
                  <button type="button" onClick={handleSavePreset} className="flex-1 rounded-md bg-blue-500 py-1 text-[10px] font-semibold text-white hover:bg-blue-400">Save</button>
                  <button type="button" onClick={() => { setShowSavePreset(false); setPresetName('') }} className="flex-1 rounded-md border border-white/8 py-1 text-[10px] text-gray-400 hover:bg-white/5">Cancel</button>
                </div>
              </div>
            )}

            <div className="max-h-28 space-y-1 overflow-y-auto">
              {presets.map((preset) => {
                const isSelected = selectedPreset?.id === preset.id
                const isDefault = DEFAULT_PRESETS.some((p) => p.id === preset.id)
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`group relative flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[10px] transition-all ${isSelected ? 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/40' : 'text-gray-400 hover:bg-white/6 hover:text-gray-200'}`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        {isSelected && <Bookmark className="h-2.5 w-2.5 fill-current" />}
                        <span className="font-semibold">{preset.name}</span>
                      </div>
                      <div className="mt-0.5 text-[9px] text-gray-600">{preset.description}</div>
                    </div>
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={(e) => handleDeletePreset(preset.id, e)}
                        className="ml-2 rounded p-0.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500/15 hover:text-red-400"
                      >
                        <Trash2 className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Format + Quality */}
          <div className="p-3">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">Format</span>
            <div className="mb-3 flex gap-1">
              {['png', 'jpeg', 'webp'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`flex-1 rounded-lg py-1.5 text-[11px] font-bold uppercase transition-all ${format === f ? 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/40' : 'bg-white/5 text-gray-400 hover:bg-white/8 hover:text-gray-200'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {format !== 'png' && (
              <>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Quality</span>
                  <span className="text-[10px] font-bold text-blue-400">{quality}%</span>
                </div>
                <input
                  type="range"
                  min={10} max={100} step={5}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mb-3 w-full accent-blue-500"
                />
              </>
            )}

            <button
              type="button"
              onClick={handleExport}
              disabled={isDownloading}
              className="w-full rounded-lg bg-blue-500 py-2 text-xs font-bold text-white transition-all hover:bg-blue-400 active:scale-[0.97] disabled:opacity-60"
            >
              {isDownloading ? 'Exporting…' : `Export ${selectedPreset ? `(${selectedPreset.name})` : ''}`}
            </button>
          </div>
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

  useEffect(() => { setLocalName(projectName) }, [projectName])

  useEffect(() => {
    const timeout = setTimeout(() => setProjectName(localName), 300)
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
    if (isFirstRender.current) { isFirstRender.current = false; return }
    setSaveStatus('saving')
    const timer = setTimeout(() => setSaveStatus('saved'), 1500)
    return () => clearTimeout(timer)
  }, [localName])

  useEffect(() => {
    if (lastSaveTime) {
      setSaveStatus('saved')
      const timer = setTimeout(() => setSaveStatus('idle'), 2000)
      return () => clearTimeout(timer)
    }
  }, [lastSaveTime])

  return (
    <nav
      className="flex h-13 items-center justify-between border-b px-4 gap-2"
      style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}
    >
      {/* ─── Logo ─── */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-lg px-1 py-0.5 transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-black text-white shadow-sm shadow-blue-500/30" />
        <span className="text-sm font-semibold text-white">ShotMock</span>
      </button>

      {/* ─── Centre: project name + save indicator ─── */}
      <div className="flex flex-1 items-center justify-center gap-2">
        <input
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          className="w-48 rounded-lg border border-transparent bg-transparent px-2 py-1 text-center text-sm text-gray-300 outline-none transition-all focus:border-white/10 focus:bg-white/5"
        />
        {saveStatus !== 'idle' && (
          <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-all duration-300 ${saveStatus === 'saving' ? 'bg-white/5 text-gray-500' : 'bg-emerald-500/12 text-emerald-400'
            }`}>
            {saveStatus === 'saving'
              ? <><Cloud className="h-2.5 w-2.5 animate-pulse" />Saving…</>
              : <><Check className="h-2.5 w-2.5" />Saved</>
            }
          </span>
        )}
      </div>

      {/* ─── Right tools ─── */}
      <div className="flex flex-shrink-0 items-center gap-2">
        {/* Undo / Redo group */}
        <div className="flex overflow-hidden rounded-lg border border-white/8">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (⌘Z)"
            className={`flex h-7 w-7 cursor-pointer items-center justify-center transition-all hover:bg-white/8 active:scale-[0.97] focus-visible:outline-none ${canUndo ? 'text-gray-300' : 'cursor-not-allowed text-gray-700'}`}
          >
            <Undo2 className="h-3.5 w-3.5" />
          </button>
          <div className="w-px bg-white/8" />
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (⌘⇧Z)"
            className={`flex h-7 w-7 cursor-pointer items-center justify-center transition-all hover:bg-white/8 active:scale-[0.97] focus-visible:outline-none ${canRedo ? 'text-gray-300' : 'cursor-not-allowed text-gray-700'}`}
          >
            <Redo2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Save */}
        {onSave && (
          <button
            type="button"
            onClick={handleSave}
            title="Save project (⌘S)"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-white/8 text-gray-400 transition-all hover:bg-white/8 hover:text-gray-100 active:scale-[0.97] focus-visible:outline-none"
          >
            <Save className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Upgrade */}
        {!isPro && (
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 text-xs font-bold text-amber-950 shadow-md shadow-amber-500/25 transition-all hover:from-amber-300 hover:to-orange-300 active:scale-[0.97] focus-visible:outline-none"
          >
            <Crown className="h-3 w-3" />
            Upgrade
          </button>
        )}

        {/* Export */}
        <ExportDropdown onExport={onDownload} isDownloading={isDownloading} />

        {/* Avatar */}
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10">
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
