import { Outlet } from 'react-router-dom'

import { Header } from '../components/header'

export function DefaultLayout() {
  return (
    <div className="mx-4 my-20 flex h-[calc(100vh-10rem)] min-h-[500px] max-w-screen-lg flex-col rounded-lg bg-base-800 py-8 lg2:mx-auto">
      <Header />
      <Outlet />
    </div>
  )
}
