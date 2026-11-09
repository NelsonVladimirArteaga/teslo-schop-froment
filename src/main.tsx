import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TesloShopApp } from './app/TesloShopApp';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TesloShopApp />
  </StrictMode>,
)
