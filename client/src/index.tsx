import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import './i18n/localization'
import { store } from './redux/store'

import AuthMiddleware from './Helpers/AuthMiddleware'
import App from './App'

const container = document.getElementById('root')! as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <AuthMiddleware>
            <App />
          </AuthMiddleware>
        </CookiesProvider>
      </Router>
    </Provider>
  </React.StrictMode>
)
