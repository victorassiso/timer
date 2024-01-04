import { ICycle } from './reducers'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  WRAP_UP_CURRENT_CYCLE = 'WRAP_UP_CURRENT_CYCLE',
}

export function createCycleAction(newCycle: ICycle) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function wrapUpCurrentCycleAction() {
  return {
    type: ActionTypes.WRAP_UP_CURRENT_CYCLE,
  }
}
