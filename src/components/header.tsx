import { Scroll, Timer } from 'phosphor-react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.svg'

export function Header() {
  return (
    <div className="flex h-12 items-end justify-between px-8">
      <img src={logo} alt="" className="h-10 w-10" />
      <div className="flex gap-2">
        <Link
          to="/"
          className="flex h-12 w-12 items-center justify-center text-primary"
        >
          <Timer className="h-[1.35rem] w-[1.6rem]" />
        </Link>
        <Link
          to="/history"
          className="flex h-12 w-12 items-center justify-center text-gray-100"
        >
          {' '}
          <Scroll className="h-[1.35rem] w-[1.6rem]" />
        </Link>
      </div>
    </div>
  )
}
