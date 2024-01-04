import { useContext } from 'react'

import { CyclesContext } from '../../../../contexts/cycle-context'
import { DisplayCell } from './display-cell'

export function Display() {
  const { minutesStr, secondsStr } = useContext(CyclesContext)

  return (
    <div className="flex gap-4 font-mono text-7xl leading-[5rem] text-base-200 sm:text-9xl">
      <DisplayCell character={minutesStr[0]} />
      <DisplayCell character={minutesStr[1]} />
      <span className="flex w-8 justify-center overflow-hidden py-4 text-primary sm:w-12 sm:py-6">
        :
      </span>
      <DisplayCell character={secondsStr[0]} />
      <DisplayCell character={secondsStr[1]} />
    </div>
  )
}
