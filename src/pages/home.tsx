import { Play } from 'phosphor-react'

import { CountDownCharacter } from '../components/count-down-character'

export function Home() {
  const inputBaseStyles =
    'h-10 border-0 border-b-2 bg-transparent px-2 text-lg font-bold text-base-200 placeholder:text-base-500 focus:border-primary focus:shadow-none '

  return (
    // Main Container
    // <div className="flex flex-1 flex-col items-center justify-center px-5">
    <div className="flex flex-1 flex-col items-center justify-center px-5">
      {/* <form action="" className="flex flex-col items-center gap-14"> */}
      <form
        action=""
        className="flex w-full max-w-screen-sm flex-col items-center gap-16 sm:gap-12"
      >
        {/* Inputs Container */}
        {/* <div className="flex w-full flex-wrap items-center justify-center gap-2 text-lg font-bold text-base-200"> */}
        <div className="flex w-full max-w-screen-sm flex-wrap items-center justify-center gap-2 font-bold text-base-200">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            className={inputBaseStyles + 'grow'}
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
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
          />

          <span>minutos.</span>
        </div>

        {/* Count Down Container */}
        {/* <div className="flex gap-4 font-mono text-8xl leading-[5rem] text-base-200 sm:text-9xl sm:leading-[6.5rem] md:text-[10rem] md:leading-[8rem]"> */}
        <div className="flex gap-4 font-mono text-7xl leading-[5rem] text-base-200 sm:text-9xl">
          {/* <span className="rounded-lg bg-base-700 px-4 py-8">0</span> */}
          <CountDownCharacter character={0} />
          <CountDownCharacter character={0} />
          {/* <span className="flex w-16 justify-center overflow-hidden py-8 text-primary"> */}
          <span className="flex w-8 justify-center overflow-hidden py-4 text-primary sm:w-12 sm:py-6">
            :
          </span>
          <CountDownCharacter character={0} />
          <CountDownCharacter character={0} />
        </div>

        <button
          type="submit"
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-lg border-0 bg-primary p-4 font-bold text-base-200 duration-300 enabled:hover:bg-primary-dark disabled:opacity-[0.7]"
        >
          <Play />
          Começar
        </button>
      </form>
    </div>
  )
}
