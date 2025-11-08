import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Add global error handlers to prevent unhandled errors from causing navigation
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  event.preventDefault(); // Prevent default error handling
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default error handling
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
