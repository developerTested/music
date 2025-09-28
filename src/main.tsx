import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouteList from './route'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import { store, persistedStore } from './redux/store'

import "./styles/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <RouteList />
      </PersistGate>
    </ReduxProvider>
    <ToastContainer position="top-center" theme="colored" />
  </StrictMode>,
)
