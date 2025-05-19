import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Webpage from './webpage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Webpage />
  </StrictMode>,
)
