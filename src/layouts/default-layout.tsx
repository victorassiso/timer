import { Outlet } from 'react-router-dom'

import { Header } from '../components/header'

export function DefaultLayout() {
  return (
    // <div className="m-auto my-20 flex h-[calc(100vh-10rem)] max-w-[74rem] flex-col rounded-[8px] bg-gray-700 p-4 min-m">
    <div className="lg2:mx-auto mx-4 my-20 flex h-[calc(100vh-10rem)] max-w-screen-lg flex-col rounded-lg bg-base-700">
      <Header />
      <Outlet />
    </div>
  )
}
