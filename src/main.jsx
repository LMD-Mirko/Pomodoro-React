import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App.jsx'
import { tema } from './estilos/tema'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={tema}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
