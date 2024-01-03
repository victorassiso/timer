import { useContext, useEffect } from 'react'

import { CyclesContext } from '../../../../contexts/cycle-context'
import { DisplayCell } from './display-cell'

export function Display() {
  const { activeCycle, secondsPassedAmount } = useContext(CyclesContext)

  const remainingSecondsAmount = activeCycle
    ? activeCycle.minutesAmount * 60 - secondsPassedAmount
    : 0
  const minutesAmount = Math.floor(remainingSecondsAmount / 60)
  const secondsAmount = remainingSecondsAmount % 60
  const minutesStr = String(minutesAmount).padStart(2, '0')
  const secondsStr = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesStr}:${secondsStr}`
    }
  }, [minutesStr, secondsStr, activeCycle])

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
