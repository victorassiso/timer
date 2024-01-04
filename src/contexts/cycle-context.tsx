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
  secondsPassedAmount: number
  interruptCycle: () => void
  createCycle: (data: CreateCycleProps) => void
  wrapUpCurrentCycle: () => void
  setSecondsPassedAmountHandler: (seconds: number) => void
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

  const { cycles, activeCycleId } = cyclesState as CyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassedAmount, setSecondsPassedAmount] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function wrapUpCurrentCycle() {
    dispatch(wrapUpCurrentCycleAction())
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function setSecondsPassedAmountHandler(seconds: number) {
    setSecondsPassedAmount(seconds)
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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        secondsPassedAmount,
        createCycle,
        interruptCycle,
        wrapUpCurrentCycle,
        setSecondsPassedAmountHandler,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
