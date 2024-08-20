'use client'

import { MouseEvent, useCallback, ButtonHTMLAttributes, ReactNode } from 'react'
import type { ReactRef } from '@/type'
import useDOMRef from '@/hooks/useDOMRef'
import { cn } from '@/util'

export type UseButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: ReactRef<HTMLButtonElement>
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
}

export function useButton(props: UseButtonProp) {
  const { ref, onClick, disabled, isLoading, className, ...otherProps } = props
  const domRef = useDOMRef(ref)

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!disabled || !isLoading) {
        onClick?.(e)
      }
    },
    [disabled, onClick, isLoading],
  )

  const getButtonProps = useCallback(
    () => ({
      disabled,
      ...otherProps,
      ref: domRef,
      onClick: handleClick,
      className: cn(
        `py-10 px-40 rounded-button h-51 text-[22px] text-[#fff] flex items-center gap-10 justify-center focus:outline-none whitespace-nowrap`,
        disabled && 'cursor-not-allowed opacity-70',
        className,
      ),
    }),

    [handleClick, otherProps, disabled, className, domRef],
  )

  return { getButtonProps }
}
