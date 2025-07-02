import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.module.scss'

import App from './components/App'
import { DarkModeContextProvider } from './contexts/DarkModeContext'
import * as serviceWorker from './serviceWorker'
ReactDOM.render(
  <BrowserRouter>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </BrowserRouter>,
  document.getElementById('root'),
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
