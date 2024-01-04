import { Outlet } from 'react-router-dom'

import { Header } from '../components/header'

export function DefaultLayout() {
  return (
    <div className="mx-4 my-20 flex min-h-[calc(100vh-10rem)] max-w-screen-lg flex-col overflow-y-auto rounded-lg bg-base-800 py-8 lg2:mx-auto">
      <Header />
      <Outlet />
    </div>
  )
}
