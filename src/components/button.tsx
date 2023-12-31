import { MouseEvent, ReactNode } from 'react'

interface ButtonProps {
  variant?:
    | 'primary'
    | 'primary-hovered'
    | 'primary-disabled'
    | 'danger'
    | 'danger-hovered' // Add more variants as needed
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export function Button({
  variant = 'primary',
  children,
  onClick,
}: ButtonProps) {
  const baseClasses = 'flex w-[648px] h-[64px] px-[40px] py-[16px] li'

  let variantClasses = ''

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-primary text-white'
      break
    case 'danger':
    default:
      variantClasses = 'bg-gray-500 text-white'
  }

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {children}
    </button>
  )
}
