import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { CssBaseline } from '@mui/material'
import App from './App'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'app/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <CssBaseline>
          <App />
        </CssBaseline>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
