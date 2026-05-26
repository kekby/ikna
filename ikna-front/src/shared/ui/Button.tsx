import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant} ${className}`.trim()}
      type="button"
      {...props}
    />
  )
}
