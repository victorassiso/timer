import { Outlet } from 'react-router-dom'

import { Header } from '../components/header'

export function DefaultLayout() {
  return (
    <div className="lg2:mx-auto mx-4 my-20 flex h-[calc(100vh-10rem)] max-w-screen-lg flex-col rounded-lg bg-base-800 py-8">
      <Header />
      <Outlet />
    </div>
  )
}
