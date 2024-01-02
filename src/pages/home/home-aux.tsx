import * as zod from 'zod'

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

export const inputBaseStyles =
  'h-10 border-0 border-b-2 bg-transparent px-2 text-lg font-bold text-base-200 placeholder:text-base-500 focus:border-primary focus:shadow-none '

export const buttonBaseStyles =
  'flex w-full items-center justify-center gap-2 rounded-lg border-0 p-4 font-bold text-base-200 duration-300 disabled:opacity-[0.7]'
