import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { CountDownCharacter } from '../components/count-down-character'
import {
  buttonBaseStyles,
  Cycle,
  inputBaseStyles,
  NewCycleFormData,
  newCycleFormValidationSchema,
} from './home-aux'

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: undefined,
    },
  })
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassedAmount, setSecondsPassedAmount] = useState<number>(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setSecondsPassedAmount(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsPassedAmount(0)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  const remainingSecondsAmount = activeCycle
    ? activeCycle.minutesAmount * 60 - secondsPassedAmount
    : 0
  const minutesAmount = Math.floor(remainingSecondsAmount / 60)
  const secondsAmount = remainingSecondsAmount % 60
  const minutesStr = String(minutesAmount).padStart(2, '0')
  const secondsStr = String(secondsAmount).padStart(2, '0')

  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesStr}:${secondsStr}`
    }
  }, [minutesStr, secondsStr, activeCycle])

  console.log(cycles)
  return (
    // Main Container
    <div className="flex flex-1 flex-col items-center justify-center px-5">
      <form
        action=""
        className="flex w-full max-w-screen-sm flex-col items-center gap-16 sm:gap-12"
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        {/* Inputs Container */}
        <div className="flex w-full max-w-screen-sm flex-wrap items-center justify-center gap-2 font-bold text-base-200">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            className={inputBaseStyles + 'grow'}
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <input
            id="minutesAmount"
            type="number"
            className={inputBaseStyles + 'w-16'}
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </div>

        {/* Count Down Container */}
        <div className="flex gap-4 font-mono text-7xl leading-[5rem] text-base-200 sm:text-9xl">
          <CountDownCharacter character={minutesStr[0]} />
          <CountDownCharacter character={minutesStr[1]} />
          <span className="flex w-8 justify-center overflow-hidden py-4 text-primary sm:w-12 sm:py-6">
            :
          </span>
          <CountDownCharacter character={secondsStr[0]} />
          <CountDownCharacter character={secondsStr[1]} />
        </div>

        {activeCycle ? (
          <button
            type="button"
            disabled={isSubmitDisabled && !activeCycle}
            className={buttonBaseStyles + ' bg-danger hover:bg-danger-dark'}
            onClick={handleInterruptCycle}
          >
            <HandPalm />
            Interromper
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitDisabled && !activeCycle}
            className={
              buttonBaseStyles + ' bg-primary enabled:hover:bg-primary-dark'
            }
          >
            <Play />
            Começar
          </button>
        )}
      </form>
    </div>
  )
}
