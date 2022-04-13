import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.module.scss'

import App from './components/App'
import { DarkModeContextProvider } from './contexts/DarkModeContext'
ReactDOM.render(
  // @ts-expect-error all
  <BrowserRouter>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
