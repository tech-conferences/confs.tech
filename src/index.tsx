import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'

import App from './components/App'
import { DarkModeContextProvider } from './contexts/DarkModeContext'

ReactDOM.render(
  <BrowserRouter>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
