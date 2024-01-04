import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import {
  createCycleAction,
  interruptCycleAction,
  wrapUpCurrentCycleAction,
} from '../reducers/cycles/actions'
import { cyclesReducer, CyclesState, ICycle } from '../reducers/cycles/reducers'

interface CreateCycleProps {
  task: string
  minutesAmount: number
}
interface ICyclesContext {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  minutesStr: string
  secondsStr: string
  interruptCycle: () => void
  createCycle: (data: CreateCycleProps) => void
  wrapUpCurrentCycle: () => void
}

export const CyclesContext = createContext({} as ICyclesContext)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  useEffect(setSecondsPassedAmountHandler, [setSecondsPassedAmountHandler])
  useEffect(saveToLocalStorage, [cyclesState])
  useEffect(updatePageTitle, [updatePageTitle])

  const { cycles, activeCycleId } = cyclesState as CyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassedAmount, setSecondsPassedAmount] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  function saveToLocalStorage() {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@timer:cycles-state-1.0.0', stateJSON)
  }

  function wrapUpCurrentCycle() {
    dispatch(wrapUpCurrentCycleAction())
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function setSecondsPassedAmountHandler() {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDiff < totalSecondsAmount) {
          setSecondsPassedAmount(secondsDiff)
        } else {
          wrapUpCurrentCycle()
          clearInterval(interval)
          setSecondsPassedAmount(0)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }

  function createCycle(data: CreateCycleProps) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createCycleAction(newCycle))

    setSecondsPassedAmount(0)
  }

  const totalSecondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const remainingSecondsAmount = activeCycle
    ? activeCycle.minutesAmount * 60 - secondsPassedAmount
    : 0

  const minutesAmount = Math.floor(remainingSecondsAmount / 60)
  const secondsAmount = remainingSecondsAmount % 60

  const minutesStr = String(minutesAmount).padStart(2, '0')
  const secondsStr = String(secondsAmount).padStart(2, '0')

  function updatePageTitle() {
    if (activeCycle) {
      document.title = `${minutesStr}:${secondsStr}`
    }
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        minutesStr,
        secondsStr,
        createCycle,
        interruptCycle,
        wrapUpCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
