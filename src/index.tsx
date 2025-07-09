import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.module.scss'

import App from './components/App'
import { DarkModeContextProvider } from './contexts/DarkModeContext'
import * as serviceWorker from './serviceWorker'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(container)
root.render(
  <BrowserRouter>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </BrowserRouter>,
)

// Register service worker for offline capability and better performance
serviceWorker.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    const waitingServiceWorker = registration.waiting
    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event: Event) => {
        if ((event.target as ServiceWorker).state === 'activated') {
          window.location.reload()
        }
      })
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
    }
  },
})
