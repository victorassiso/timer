import { CreateCycleAction, ICycle, OtherCycleAction } from './reducers'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  WRAP_UP_CURRENT_CYCLE = 'WRAP_UP_CURRENT_CYCLE',
}

export function createCycleAction(newCycle: ICycle): CreateCycleAction {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCycleAction(): OtherCycleAction {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function wrapUpCurrentCycleAction(): OtherCycleAction {
  return {
    type: ActionTypes.WRAP_UP_CURRENT_CYCLE,
  }
}
