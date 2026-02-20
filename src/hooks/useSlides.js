import { useMemo, useState, useRef, useCallback, useEffect } from 'react'
import { BUILDERS } from '../data/slideBuilders'

const baseSlide = (id, overrides = {}) => ({
  id,
  backgroundColor: '#1b00f6',
  elements: [],
  ...overrides,
})

let elementIdCounter = 1000

const MAX_HISTORY = 50

function useSlides(initialTemplate, savedSlides = null) {
  const initialSlides = useMemo(() => {
    // If we have saved slides (from a loaded project), use them directly
    if (savedSlides && Array.isArray(savedSlides) && savedSlides.length > 0) {
      return savedSlides.map((slide) => ({
        ...slide,
        elements: slide.elements || [],
      }))
    }

    if (!initialTemplate || !initialTemplate.slides) {
      return [baseSlide(1)]
    }

    const builder = BUILDERS[initialTemplate.id]
    if (builder) {
      return builder(initialTemplate)
    }

    return initialTemplate.slides.map((slide, index) => {
      const bg = slide.backgroundColor || initialTemplate.backgroundColor
      return baseSlide(index + 1, {
        backgroundColor: bg,
        elements: [
          {
            id: `text-${index + 1}`,
            type: 'text',
            x: 24,
            y: 40,
            width: 220,
            height: 90,
            content: slide.subtitle ? `${slide.title}\n${slide.subtitle}` : slide.title,
            style: { fontSize: 26, fontWeight: '800', align: 'left' },
          },
          {
            id: `device-${index + 1}`,
            type: 'device',
            x: 140,
            y: 160,
            width: 110,
            height: 220,
            style: { rotation: index === 0 ? -10 : index === 2 ? 5 : 0 },
          },
        ],
      })
    })
  }, [initialTemplate, savedSlides])

  const [slides, setSlides] = useState(initialSlides)
  const [activeSlide, setActiveSlide] = useState(0)

  // Reset slides when switching to a different template (e.g. from sidebar Templates tab)
  useEffect(() => {
    setSlides(initialSlides)
    setActiveSlide(0)
    historyRef.current = [{ slides: initialSlides, activeSlide: 0 }]
    historyIndexRef.current = 0
    setCanUndo(false)
    setCanRedo(false)
  }, [initialTemplate?.id])
  
  // History management
  const historyRef = useRef([{ slides: initialSlides, activeSlide: 0 }])
  const historyIndexRef = useRef(0)
  const isUndoRedoRef = useRef(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // Save current state to history
  const saveToHistory = useCallback((newSlides, newActiveSlide) => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false
      return
    }

    const history = historyRef.current
    const currentIndex = historyIndexRef.current

    // Remove any future history if we're not at the end
    const trimmedHistory = history.slice(0, currentIndex + 1)

    // Add new state
    trimmedHistory.push({
      slides: JSON.parse(JSON.stringify(newSlides)),
      activeSlide: newActiveSlide,
    })

    // Limit history to MAX_HISTORY
    if (trimmedHistory.length > MAX_HISTORY) {
      trimmedHistory.shift()
    }

    historyIndexRef.current = trimmedHistory.length - 1
    historyRef.current = trimmedHistory
    setCanUndo(historyIndexRef.current > 0)
    setCanRedo(false)
  }, [])

  // Update state and save to history
  const updateState = useCallback((newSlides, newActiveSlide) => {
    setSlides(newSlides)
    setActiveSlide(newActiveSlide)
    saveToHistory(newSlides, newActiveSlide)
  }, [saveToHistory])

  const addSlide = useCallback(() => {
    const newSlide = baseSlide(slides.length + 1)
    const newSlides = [...slides, newSlide]
    updateState(newSlides, slides.length)
  }, [slides, updateState])

  const copySlide = useCallback((index) => {
    const slide = slides[index]
    if (!slide) return
    const copy = {
      ...slide,
      id: slides.length + 1,
      elements: slide.elements.map((el) => ({
        ...el,
        id: `${el.id}-copy-${Date.now()}`,
      })),
    }
    const newSlides = [...slides]
    newSlides.splice(index + 1, 0, copy)
    updateState(newSlides, index + 1)
  }, [slides, updateState])

  const deleteSlide = useCallback((index) => {
    if (slides.length === 1) return
    const newSlides = slides.filter((_, i) => i !== index)
    updateState(newSlides, Math.max(0, index - 1))
  }, [slides, updateState])

  const moveSlideLeft = useCallback((index) => {
    if (index <= 0) return
    const newSlides = [...slides]
    const [removed] = newSlides.splice(index, 1)
    newSlides.splice(index - 1, 0, removed)
    updateState(newSlides, index - 1)
  }, [slides, updateState])

  const moveSlideRight = useCallback((index) => {
    if (index >= slides.length - 1) return
    const newSlides = [...slides]
    const [removed] = newSlides.splice(index, 1)
    newSlides.splice(index + 1, 0, removed)
    updateState(newSlides, index + 1)
  }, [slides, updateState])

  const setSlideBackground = useCallback((index, color) => {
    const newSlides = slides.map((slide, i) =>
      i === index ? { ...slide, backgroundColor: color } : slide,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const addElementToSlide = useCallback((index, element) => {
    const newSlides = slides.map((slide, i) =>
      i === index
        ? {
            ...slide,
            elements: [
              ...slide.elements,
              { ...element, id: element.id || `el-${elementIdCounter++}` },
            ],
          }
        : slide,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const updateElementOnSlide = useCallback((slideIndex, elementId, updates) => {
    const newSlides = slides.map((slide, i) =>
      i === slideIndex
        ? {
            ...slide,
            elements: slide.elements.map((el) => {
              if (el.id !== elementId) return el
              if (updates.style) {
                return {
                  ...el,
                  ...updates,
                  style: { ...el.style, ...updates.style },
                }
              }
              return { ...el, ...updates }
            }),
          }
        : slide,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const deleteElementFromSlide = useCallback((slideIndex, elementId) => {
    const newSlides = slides.map((slide, i) =>
      i === slideIndex
        ? {
            ...slide,
            elements: slide.elements.filter((el) => el.id !== elementId),
          }
        : slide,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const duplicateElementOnSlide = useCallback((slideIndex, elementId) => {
    const slide = slides[slideIndex]
    if (!slide) return

    const element = slide.elements.find((el) => el.id === elementId)
    if (!element) return

    const duplicatedElement = {
      ...element,
      id: `el-${elementIdCounter++}`,
      x: (element.x || 0) + 10,
      y: (element.y || 0) + 10,
    }

    const newSlides = slides.map((s, i) =>
      i === slideIndex
        ? {
            ...slide,
            elements: [...slide.elements, duplicatedElement],
          }
        : s,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const applyBackgroundToAllSlides = useCallback((color) => {
    const newSlides = slides.map((slide) => ({ ...slide, backgroundColor: color }))
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const reorderElements = useCallback((slideIndex, newElements) => {
    const newSlides = slides.map((slide, i) =>
      i === slideIndex ? { ...slide, elements: newElements } : slide,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const toggleElementVisibility = useCallback((slideIndex, elementId) => {
    const newSlides = slides.map((slide, i) =>
      i === slideIndex
        ? {
            ...slide,
            elements: slide.elements.map((el) =>
              el.id === elementId ? { ...el, isHidden: !el.isHidden } : el,
            ),
          }
        : slide,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const toggleElementLock = useCallback((slideIndex, elementId) => {
    const newSlides = slides.map((slide, i) =>
      i === slideIndex
        ? {
            ...slide,
            elements: slide.elements.map((el) =>
              el.id === elementId ? { ...el, isLocked: !el.isLocked } : el,
            ),
          }
        : slide,
    )
    updateState(newSlides, activeSlide)
  }, [slides, activeSlide, updateState])

  const bringElementForward = useCallback((slideIndex, elementId) => {
    const slide = slides[slideIndex]
    if (!slide) return
    const idx = slide.elements.findIndex((el) => el.id === elementId)
    if (idx < 0 || idx >= slide.elements.length - 1) return
    const next = [...slide.elements]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    reorderElements(slideIndex, next)
  }, [slides, reorderElements])

  const sendElementBackward = useCallback((slideIndex, elementId) => {
    const slide = slides[slideIndex]
    if (!slide) return
    const idx = slide.elements.findIndex((el) => el.id === elementId)
    if (idx <= 0) return
    const next = [...slide.elements]
    ;[next[idx], next[idx - 1]] = [next[idx - 1], next[idx]]
    reorderElements(slideIndex, next)
  }, [slides, reorderElements])

  const bringElementToFront = useCallback((slideIndex, elementId) => {
    const slide = slides[slideIndex]
    if (!slide) return
    const idx = slide.elements.findIndex((el) => el.id === elementId)
    if (idx < 0 || idx >= slide.elements.length - 1) return
    const next = [...slide.elements]
    const [el] = next.splice(idx, 1)
    next.push(el)
    reorderElements(slideIndex, next)
  }, [slides, reorderElements])

  const sendElementToBack = useCallback((slideIndex, elementId) => {
    const slide = slides[slideIndex]
    if (!slide) return
    const idx = slide.elements.findIndex((el) => el.id === elementId)
    if (idx <= 0) return
    const next = [...slide.elements]
    const [el] = next.splice(idx, 1)
    next.unshift(el)
    reorderElements(slideIndex, next)
  }, [slides, reorderElements])

  const loadTemplate = useCallback((template) => {
    let newSlides

    if (!template || !template.slides) {
      newSlides = [baseSlide(1)]
    } else {
      const builder = BUILDERS[template.id]
      if (builder) {
        newSlides = builder(template)
      } else {
        newSlides = template.slides.map((slide, index) => {
          const bg = slide.backgroundColor || template.backgroundColor
          return baseSlide(index + 1, {
            backgroundColor: bg,
            elements: [
              {
                id: `text-${index + 1}`,
                type: 'text',
                x: 24,
                y: 40,
                width: 220,
                height: 90,
                content: slide.subtitle ? `${slide.title}\n${slide.subtitle}` : slide.title,
                style: { fontSize: 26, fontWeight: '800', align: 'left' },
              },
              {
                id: `device-${index + 1}`,
                type: 'device',
                x: 140,
                y: 160,
                width: 110,
                height: 220,
                style: { rotation: index === 0 ? -10 : index === 2 ? 5 : 0 },
              },
            ],
          })
        })
      }
    }

    updateState(newSlides, 0)
  }, [updateState])

  const undo = useCallback(() => {
    const history = historyRef.current
    const currentIndex = historyIndexRef.current

    if (currentIndex > 0) {
      isUndoRedoRef.current = true
      historyIndexRef.current = currentIndex - 1
      const previousState = history[currentIndex - 1]
      setSlides(JSON.parse(JSON.stringify(previousState.slides)))
      setActiveSlide(previousState.activeSlide)
      setCanUndo(historyIndexRef.current > 0)
      setCanRedo(true)
    }
  }, [])

  const redo = useCallback(() => {
    const history = historyRef.current
    const currentIndex = historyIndexRef.current

    if (currentIndex < history.length - 1) {
      isUndoRedoRef.current = true
      historyIndexRef.current = currentIndex + 1
      const nextState = history[currentIndex + 1]
      setSlides(JSON.parse(JSON.stringify(nextState.slides)))
      setActiveSlide(nextState.activeSlide)
      setCanUndo(true)
      setCanRedo(historyIndexRef.current < history.length - 1)
    }
  }, [])

  return {
    slides,
    activeSlide,
    setActiveSlide: useCallback((index) => {
      setActiveSlide(index)
      // Don't save to history for simple slide navigation
    }, []),
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
    loadTemplate,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}

export default useSlides
