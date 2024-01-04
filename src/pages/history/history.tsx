import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useContext } from 'react'

import { CyclesContext } from '../../contexts/cycle-context'

const thStyle =
  'bg-base-600 text-left p-4 text-base-200 text-sm leading-[1.6] first:rounded-tl-lg first:pl-6 last:rounded-tr-lg last:pr-6'

const tdStyle =
  'bg-base-700 border-t-base-800 border-t-4 p-4 text-sm leading-[1.6] first:pl-6 last:pr-6 first:w-[49%]'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <div className="flex flex-1 flex-col p-20">
      <h1 className="text-2xl leading-4 text-base-200">Meu Histórico</h1>
      <div className="mt-8 flex-1 overflow-auto">
        <table className="min-w-600px w-full border-collapse">
          <thead>
            <tr>
              <th className={thStyle}>Tarefa</th>
              <th className={thStyle}>Duração</th>
              <th className={thStyle}>Início</th>
              <th className={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td className={tdStyle}>{cycle.task}</td>
                <td className={tdStyle}>{cycle.minutesAmount} minutos</td>
                <td className={tdStyle}>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td className={tdStyle}>
                  {cycle.finishedDate && (
                    <span className="flex items-center gap-2 leading-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Concluído
                    </span>
                  )}

                  {cycle.interruptedDate && (
                    <span className="flex items-center gap-2 leading-3">
                      <div className="h-2 w-2 rounded-full bg-red-500 " />
                      <span className="">Interrompido</span>
                    </span>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <span className="flex items-center gap-2 leading-3">
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      Em andamento
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
