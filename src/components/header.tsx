import { Scroll, Timer } from 'phosphor-react'

import logo from '../assets/logo.svg'

export function Header() {
  return (
    <div className="flex h-12 items-center justify-between px-5">
      <div className="">
        <img src={logo} alt="" className="" />
      </div>
      <div className="flex gap-2">
        <a
          href=""
          className="flex h-12 w-12 items-center justify-center text-primary"
        >
          <Timer className="h-[1.35rem] w-[1.6rem]" />
        </a>
        <a
          href=""
          className="flex h-12 w-12 items-center justify-center text-gray-100"
        >
          {' '}
          <Scroll className="h-[1.35rem] w-[1.6rem]" />
        </a>
      </div>
    </div>
  )
}
