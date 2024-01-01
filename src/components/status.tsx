interface StatusProps {
  status: 'completed' | 'in progress' | 'interrupted'
}

export function Status({ status }: StatusProps) {
  let color, text
  switch (status) {
    case 'completed':
      color = 'green-500'
      text = 'Completo'
      break
    case 'in progress':
      color = 'yellow-500'
      text = 'Em andamento'
      break
    case 'interrupted':
      color = 'red-500'
      text = 'Interrompido'
      break
  }

  return (
    <span className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full bg-${color} content-[]`} />
      {text}
    </span>
  )
}
