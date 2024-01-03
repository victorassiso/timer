import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface CreateCycleProps {
  task: string
  minutesAmount: number
}

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

interface ICyclesContext {
  cycles: ICycle[]
  setCycles: React.Dispatch<React.SetStateAction<ICycle[]>>
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  setActiveCycleId: React.Dispatch<React.SetStateAction<string | null>>
  secondsPassedAmount: number
  createNewCycle: (data: CreateCycleProps) => void
}

export const CyclesContext = createContext({} as ICyclesContext)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<ICycle[]>([])
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

  function createNewCycle(data: CreateCycleProps) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsPassedAmount(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        setActiveCycleId,
        cycles,
        setCycles,
        secondsPassedAmount,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
