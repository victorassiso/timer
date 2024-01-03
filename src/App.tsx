import { BrowserRouter } from 'react-router-dom'

import { CyclesContextProvider } from './contexts/cycle-context'
import { Router } from './router'

export function App() {
  return (
    <BrowserRouter basename="/timer">
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
    </BrowserRouter>
  )
}
