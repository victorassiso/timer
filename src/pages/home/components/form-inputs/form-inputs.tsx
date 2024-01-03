import { useFormContext } from 'react-hook-form'

const inputBaseStyles =
  'h-10 border-0 border-b-2 bg-transparent px-2 text-lg font-bold text-base-200 placeholder:text-base-500 focus:border-primary focus:shadow-none '

export function FormInputs() {
  const { register } = useFormContext()
  return (
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
  )
}
