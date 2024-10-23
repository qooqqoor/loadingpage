import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './page/Index.jsx'
import './hooks/i18n/i18n.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
  </StrictMode>,
)
