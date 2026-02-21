import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ToastProvider } from './components/Toast.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { preloadCommonFonts } from './utils/googleFonts'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Eager load homepage (landing page — needs instant render)
import HomePage from './pages/HomePage.jsx'

// Lazy load other pages for better initial load
const EditorPage = lazy(() => import('./pages/EditorPage.jsx'))
const SavedDesignsPage = lazy(() => import('./pages/SavedDesignsPage.jsx'))
const AuthPage = lazy(() => import('./pages/AuthPage.jsx'))
const PricingPage = lazy(() => import('./pages/PricingPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))

// Preload common Google Fonts
preloadCommonFonts()

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-blue-500" />
        <span className="text-xs text-gray-500">Loading…</span>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/saved" element={
                <ProtectedRoute>
                  <SavedDesignsPage />
                </ProtectedRoute>
              } />
              <Route path="/editor/:templateId" element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
