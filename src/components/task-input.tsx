interface TaskInputProps {
  id?: string
  type?: string
  style?: string
  placeholder?: string
  step?: number
  list?: string
}

export function TaskInput({
  id = '',
  type = 'text',
  style = '',
  placeholder = '',
  step = 1,
  list = '',
}: TaskInputProps) {
  return (
    <input
      id={id}
      type={type}
      className={
        'h-10 border-0 border-b-2 bg-transparent px-2 text-lg font-bold text-base-200 placeholder:text-base-500 focus:border-primary focus:shadow-none ' +
        style
      }
      placeholder={placeholder}
      step={step}
      min={5}
      list={list}
    />
  )
}
