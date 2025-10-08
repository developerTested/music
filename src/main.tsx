import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouteList from './route'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import { persistedStore, store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

import "./styles/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistedStore} loading={null}>
          <RouteList />
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
    <ToastContainer position="top-center" theme="colored" />
  </StrictMode>,
)
