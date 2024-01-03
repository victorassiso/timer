import { ReactNode } from 'react'

interface StatusProps {
  color: 'green' | 'red' | 'yellow'
  children: ReactNode
}

export function Status({ color, children }: StatusProps) {
  return (
    <span className="flex items-center gap-2">
      <div className={`bg-${color}-500 h-2 w-2 rounded-full content-[]`} />
      {children}
    </span>
  )
}
