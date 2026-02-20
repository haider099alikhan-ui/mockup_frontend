import { useState, useEffect, useCallback } from 'react'
import { X, ChevronRight, Layers, Type, Image, Palette, Download, MousePointer } from 'lucide-react'

const STEPS = [
  {
    icon: MousePointer,
    title: 'Welcome to ScreenSnap',
    description: 'Create stunning app store screenshots in minutes. Let us show you around!',
  },
  {
    icon: Image,
    title: 'Upload Screenshots',
    description: 'Click any device screen to upload your app screenshot. It fits automatically inside the phone frame.',
  },
  {
    icon: Type,
    title: 'Edit Text & Elements',
    description: 'Click any text to edit it. Use the sidebar to add new text, devices, and design elements.',
  },
  {
    icon: Palette,
    title: 'Customize Backgrounds',
    description: 'Choose from solid colors, gradients, or images. Use "Apply to all slides" for consistency.',
  },
  {
    icon: Layers,
    title: 'Manage Layers',
    description: 'Use the Layers tab to reorder, hide, or lock elements. Right-click any element for quick actions.',
  },
  {
    icon: Download,
    title: 'Export Your Work',
    description: 'Click Download to export all slides as a ZIP. Use ⌘Z to undo and ⌘D to duplicate elements.',
  },
]

const STORAGE_KEY = 'screensnap-onboarding-complete'

function Onboarding({ forceShow, onClose: externalClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (forceShow) {
      setCurrentStep(0)
      setIsVisible(true)
      return
    }
    const completed = localStorage.getItem(STORAGE_KEY)
    if (!completed) {
      const timer = setTimeout(() => setIsVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [forceShow])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setCurrentStep(0)
    localStorage.setItem(STORAGE_KEY, 'true')
    externalClose?.()
  }, [externalClose])

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      handleClose()
    }
  }, [currentStep, handleClose])

  if (!isVisible) return null

  const step = STEPS[currentStep]
  const Icon = step.icon
  const isLast = currentStep === STEPS.length - 1

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md animate-fade-down rounded-2xl border border-gray-700 bg-[#1a1a1a] p-6 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-700 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
          <Icon className="h-6 w-6 text-blue-400" />
        </div>

        <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-gray-400">{step.description}</p>

        <div className="mb-4 flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={`step-${i}`}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= currentStep ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleClose}
            className="text-sm text-gray-500 transition-colors hover:text-gray-300"
          >
            Skip tour
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-400 active:scale-95"
          >
            <span>{isLast ? 'Get Started' : 'Next'}</span>
            {!isLast && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
