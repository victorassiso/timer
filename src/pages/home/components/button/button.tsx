import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'

import { CyclesContext } from '../../../../contexts/cycle-context'

const buttonBaseStyles =
  'flex w-full items-center justify-center gap-2 rounded-lg border-0 p-4 font-bold text-base-200 duration-300 disabled:opacity-[0.7]'

interface ButtonProps {
  disabled: boolean
}
export function Button({ disabled }: ButtonProps) {
  const { activeCycle, interruptCycle } = useContext(CyclesContext)

  return (
    <>
      {activeCycle ? (
        <button
          type="button"
          className={buttonBaseStyles + ' bg-danger hover:bg-danger-dark'}
          onClick={interruptCycle}
        >
          <HandPalm />
          Interromper
        </button>
      ) : (
        <button
          type="submit"
          disabled={disabled}
          className={
            buttonBaseStyles + ' bg-primary enabled:hover:bg-primary-dark'
          }
        >
          <Play />
          Começar
        </button>
      )}
    </>
  )
}
