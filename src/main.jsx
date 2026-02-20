import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ToastProvider } from './components/Toast.jsx'
import { preloadCommonFonts } from './utils/googleFonts'
import HomePage from './pages/HomePage.jsx'
import EditorPage from './pages/EditorPage.jsx'
import SavedDesignsPage from './pages/SavedDesignsPage.jsx'

// Preload common Google Fonts
preloadCommonFonts()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved" element={<SavedDesignsPage />} />
          <Route path="/editor/:templateId" element={<EditorPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
