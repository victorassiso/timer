import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { CyclesContext } from '../../contexts/cycle-context'
import { Button } from './components/button/button'
import { Display } from './components/display/display'
import { FormInputs } from './components/form-inputs/form-inputs'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: undefined,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    // Main Container
    <div className="flex flex-1 flex-col items-center justify-center px-5">
      <form
        action=""
        className="flex w-full max-w-screen-sm flex-col items-center gap-16 sm:gap-12"
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <FormProvider {...newCycleForm}>
          <FormInputs />
        </FormProvider>
        <Display />
        <Button disabled={isSubmitDisabled} />
      </form>
    </div>
  )
}
