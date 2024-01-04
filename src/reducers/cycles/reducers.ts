import { ActionTypes } from './actions'

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}

export interface CreateCycleActionPayload {
  newCycle: ICycle
}

export interface CreateCycleAction {
  type: ActionTypes.CREATE_NEW_CYCLE
  payload: CreateCycleActionPayload
}

export interface OtherCycleAction {
  type: Exclude<ActionTypes, ActionTypes.CREATE_NEW_CYCLE>
}

export type CyclesAction = CreateCycleAction | OtherCycleAction

export function cyclesReducer(state: CyclesState, action: CyclesAction) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionTypes.WRAP_UP_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
