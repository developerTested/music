import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouteList from './route'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from './redux/store'

import "./styles/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouteList />
    </ReduxProvider>
    <ToastContainer position="top-center" theme="colored" />
  </StrictMode>,
)
