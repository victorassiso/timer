import { BrowserRouter } from 'react-router-dom'

import { Router } from './router'

export function App() {
  return (
    <BrowserRouter basename="/timer">
      <Router />
    </BrowserRouter>
  )
}
