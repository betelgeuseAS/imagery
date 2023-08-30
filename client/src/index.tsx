import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CookiesProvider } from 'react-cookie'

import { store } from './redux/store'
import { theme } from './mui/theme'

import AuthMiddleware from './Helpers/AuthMiddleware'
import App from './App'

const container = document.getElementById('root')! as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <CookiesProvider>
            <AuthMiddleware>
              <App />
            </AuthMiddleware>
          </CookiesProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
