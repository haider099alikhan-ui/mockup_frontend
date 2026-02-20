import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import AppNavbar from './components/Navbar'
import SidebarRail from './components/Sidebar/SidebarRail'
import SidebarPanel from './components/Sidebar/SidebarPanel'
import CanvasArea from './components/Canvas/CanvasArea'
import useCanvas from './hooks/useCanvas'
import useDownload from './hooks/useDownload'
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal'
import { useToast } from './components/Toast'
import { autoSaveProject, saveProject, getCurrentProject } from './utils/projectStorage'

function App({ slidesHook, templateId, templateName }) {
  const clipboardRef = useRef(null)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [activeSidebarTab, setActiveSidebarTab] = useState('templates')
  const [activeElementsSubTab, setActiveElementsSubTab] = useState('devices')
  const [activeBackgroundSubTab, setActiveBackgroundSubTab] = useState('solid')
  const [projectId] = useState(() => {
    // Try to load current project or create new ID
    const current = getCurrentProject()
    return current?.id || `project-${Date.now()}`
  })
  const [projectName, setProjectName] = useState(() => {
    try {
      const current = getCurrentProject()
      return current?.name || localStorage.getItem('screensnap-project-name') || 'Untitled Project'
    } catch { return 'Untitled Project' }
  })
  const [selectedElementIds, setSelectedElementIds] = useState([])
  const [lastSaveTime, setLastSaveTime] = useState(null)

  const handleSidebarTabChange = useCallback((tab) => {
    setActiveSidebarTab(tab)
    setSelectedElementIds([])
  }, [])

  const {
    slides,
    activeSlide,
    setActiveSlide,
    addSlide,
    copySlide,
    deleteSlide,
    moveSlideLeft,
    moveSlideRight,
    setSlideBackground,
    addElementToSlide,
    updateElementOnSlide,
    deleteElementFromSlide,
    duplicateElementOnSlide,
    applyBackgroundToAllSlides,
    reorderElements,
    toggleElementVisibility,
    toggleElementLock,
    bringElementForward,
    sendElementBackward,
    bringElementToFront,
    sendElementToBack,
    undo,
    redo,
    canUndo,
    canRedo,
  } = slidesHook

  // Auto-save project whenever slides or project name changes
  useEffect(() => {
    if (slides && slides.length > 0) {
      autoSaveProject({
        id: projectId,
        name: projectName,
        templateId: templateId || null,
        templateName: templateName || null,
        slides,
      }, 2000) // 2 second debounce
    }
  }, [slides, projectName, projectId, templateId, templateName])

  // Manual save function
  const handleManualSave = useCallback(() => {
    if (!slides || slides.length === 0) return false
    const result = saveProject({
      id: projectId,
      name: projectName,
      templateId: templateId || null,
      templateName: templateName || null,
      slides,
    })
    if (result.success) {
      setLastSaveTime(new Date())
      return true
    }
    return false
  }, [projectId, projectName, templateId, templateName, slides])

  const toast = useToast()
  const { zoom, zoomIn, zoomOut, resetZoom, fitToViewport, showGrid, toggleGrid, snapToGrid, toggleSnapToGrid, gridSize, setGridSize, snapValue } = useCanvas()
  const { isDownloading, downloadProgress, downloadAllSlides } = useDownload()

  const handleSelectElement = useCallback((elementId, isShiftClick = false) => {
    if (!elementId) {
      setSelectedElementIds([])
      return
    }
    
    if (isShiftClick) {
      // Multi-select: toggle element in selection
      setSelectedElementIds((prev) => {
        if (prev.includes(elementId)) {
          // Deselect if already selected
          return prev.filter((id) => id !== elementId)
        } else {
          // Add to selection
          return [...prev, elementId]
        }
      })
    } else {
      // Single select: replace selection
      setSelectedElementIds([elementId])
    }
  }, [])

  const handleUpdateSelectedElement = useCallback(
    (elementId, updates) => {
      updateElementOnSlide(activeSlide, elementId, updates)
    },
    [activeSlide, updateElementOnSlide],
  )

  const handleDeleteSelected = useCallback(() => {
    if (selectedElementIds.length > 0) {
      selectedElementIds.forEach((elementId) => {
        deleteElementFromSlide(activeSlide, elementId)
      })
      setSelectedElementIds([])
    }
  }, [selectedElementIds, activeSlide, deleteElementFromSlide])

  const handleDuplicateSelected = useCallback(() => {
    if (selectedElementIds.length > 0) {
      // Smart duplication: duplicate with offset
      selectedElementIds.forEach((elementId, index) => {
        const element = slides[activeSlide]?.elements.find((el) => el.id === elementId)
        if (element) {
          // Create duplicate with offset
          const { id: _discardId, ...rest } = element
          const offset = 15 + (index * 5) // Stagger offset for multiple selections
          const duplicated = {
            ...rest,
            x: (rest.x || 0) + offset,
            y: (rest.y || 0) + offset,
          }
          addElementToSlide(activeSlide, duplicated)
        } else {
          // Fallback to regular duplicate
          duplicateElementOnSlide(activeSlide, elementId)
        }
      })
    }
  }, [selectedElementIds, activeSlide, slides, duplicateElementOnSlide, addElementToSlide])

  const handleDownload = useCallback(async (options = {}) => {
    const result = await downloadAllSlides(slides, projectName, options)
    if (result.success) {
      toast(`Exported ${result.count} slides successfully!`, 'success')
    } else {
      toast(result.error || 'Export failed', 'error', 5000)
    }
  }, [downloadAllSlides, slides, projectName, toast])

  const selectedElements = useMemo(() => {
    if (selectedElementIds.length === 0) return []
    const slide = slides[activeSlide]
    if (!slide) return []
    return slide.elements.filter((el) => selectedElementIds.includes(el.id))
  }, [selectedElementIds, slides, activeSlide])

  const selectedElement = useMemo(() => {
    // For backward compatibility, return first selected element if single selection
    return selectedElements.length === 1 ? selectedElements[0] : null
  }, [selectedElements])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.isContentEditable) return

      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        handleDeleteSelected()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        handleDuplicateSelected()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        if (selectedElements.length > 0) {
          e.preventDefault()
          // Copy all selected elements
          clipboardRef.current = selectedElements.map((el) => JSON.parse(JSON.stringify(el)))
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        if (clipboardRef.current) {
          e.preventDefault()
          // Paste all copied elements
          const elementsToPaste = Array.isArray(clipboardRef.current) 
            ? clipboardRef.current 
            : [clipboardRef.current]
          
          elementsToPaste.forEach((element, index) => {
            const { id: _discardId, ...rest } = element
            const pasted = { 
              ...rest, 
              x: (rest.x || 0) + 15 + (index * 10), 
              y: (rest.y || 0) + 15 + (index * 10) 
            }
            addElementToSlide(activeSlide, pasted)
          })
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleManualSave()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        setShowShortcuts((s) => !s)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, handleDeleteSelected, handleDuplicateSelected, selectedElements, activeSlide, addElementToSlide, handleManualSave])

  return (
    <div className="flex h-full flex-col bg-[#111111] text-gray-100">
      <AppNavbar
        projectName={projectName}
        setProjectName={setProjectName}
        slides={slides}
        activeSlide={activeSlide}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        onSave={handleManualSave}
        lastSaveTime={lastSaveTime}
      />

      <div className="flex flex-1 overflow-hidden">
        <SidebarRail
          activeTab={activeSidebarTab}
          setActiveTab={handleSidebarTabChange}
        />

        <SidebarPanel
          activeTab={activeSidebarTab}
          activeElementsSubTab={activeElementsSubTab}
          setActiveElementsSubTab={setActiveElementsSubTab}
          activeBackgroundSubTab={activeBackgroundSubTab}
          setActiveBackgroundSubTab={setActiveBackgroundSubTab}
          slides={slides}
          activeSlide={activeSlide}
          setSlideBackground={setSlideBackground}
          addElementToSlide={addElementToSlide}
          selectedElement={selectedElement}
          selectedElements={selectedElements}
          onUpdateElement={handleUpdateSelectedElement}
          onDeleteElement={handleDeleteSelected}
          onDuplicateElement={handleDuplicateSelected}
          selectedElementIds={selectedElementIds}
          onSelectElement={handleSelectElement}
          onReorderElements={reorderElements}
          onToggleVisibility={toggleElementVisibility}
          onToggleLock={toggleElementLock}
          onApplyToAllSlides={applyBackgroundToAllSlides}
        />

        <CanvasArea
          slides={slides}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          addSlide={addSlide}
          copySlide={copySlide}
          deleteSlide={deleteSlide}
          moveSlideLeft={moveSlideLeft}
          moveSlideRight={moveSlideRight}
          zoom={zoom}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetZoom={resetZoom}
          fitToViewport={fitToViewport}
          showGrid={showGrid}
          toggleGrid={toggleGrid}
          snapToGrid={snapToGrid}
          toggleSnapToGrid={toggleSnapToGrid}
          gridSize={gridSize}
          snapValue={snapValue}
          updateElementOnSlide={updateElementOnSlide}
          selectedElementIds={selectedElementIds}
          onSelectElement={handleSelectElement}
          onDeleteElement={handleDeleteSelected}
          onDuplicateElement={handleDuplicateSelected}
          bringElementForward={bringElementForward}
          sendElementBackward={sendElementBackward}
          bringElementToFront={bringElementToFront}
          sendElementToBack={sendElementToBack}
          toggleElementVisibility={toggleElementVisibility}
          toggleElementLock={toggleElementLock}
        />
      </div>
      {showShortcuts && <KeyboardShortcutsModal onClose={() => setShowShortcuts(false)} />}
    </div>
  )
}

export default App
