'use client'

import { MouseEvent, useCallback, ButtonHTMLAttributes, ReactNode } from 'react'
import type { ReactRef } from '@/type'
import useDOMRef from '@/hooks/useDOMRef'
import { cn } from '@/util'

export type UseButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: ReactRef<HTMLButtonElement>
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function useButton(props: UseButtonProp) {
  const { ref, onClick, disabled, className, ...otherProps } = props
  const domRef = useDOMRef(ref)

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(e)
      }
    },
    [disabled, onClick],
  )

  const getButtonProps = useCallback(
    () => ({
      disabled,
      ...otherProps,
      ref: domRef,
      onClick: handleClick,
      className: cn(
        `py-10 px-40 rounded-button bg-primary h-51 text-[22px] text-[#fff] flex items-center gap-10 justify-center focus:outline-none`,
        disabled && 'cursor-not-allowed opacity-70',
        className,
      ),
    }),

    [handleClick, otherProps, disabled, className, domRef],
  )

  return { getButtonProps }
}
