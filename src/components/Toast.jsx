import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const COLORS = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  error: 'border-red-500/30 bg-red-500/10 text-red-300',
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
}

function ToastItem({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false)
  const Icon = ICONS[toast.type] || Info

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), toast.duration || 3000)
    return () => clearTimeout(timer)
  }, [toast.duration])

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(() => onRemove(toast.id), 300)
      return () => clearTimeout(timer)
    }
  }, [exiting, onRemove, toast.id])

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ${
        COLORS[toast.type] || COLORS.info
      } ${exiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-sm">{toast.message}</span>
      <button
        type="button"
        onClick={() => setExiting(true)}
        className="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[10000] flex flex-col gap-2 max-w-sm">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const addToast = useContext(ToastContext)
  if (!addToast) {
    return () => {}
  }
  return addToast
}
