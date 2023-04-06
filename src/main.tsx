import React from 'react'
import ReactDOM from 'react-dom/client'
import { RelayEnvironmentProvider } from 'react-relay'

import { App } from './app'
import { environment } from './environment';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <App />
    </RelayEnvironmentProvider>
  </React.StrictMode>,
)
