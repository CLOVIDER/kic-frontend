'use client'

import { InputHTMLAttributes, ChangeEvent, useCallback } from 'react'
import type { ReactRef } from '@/type'
import { cn } from '@/util'
import { useDOMRef } from '@/hooks'

export interface UseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: ReactRef<HTMLInputElement>
  wrapperClassName?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  isClearable?: boolean
  onValueChange?: (value: string) => void
  onClear?: () => void
}

export function useInput(props: UseInputProps) {
  const {
    ref,
    wrapperClassName,
    startContent,
    endContent,
    isClearable,
    onValueChange,
    onClear,
    ...otherProps
  } = props

  const domRef = useDOMRef(ref)

  const handleClear = useCallback(() => {
    onValueChange?.('')
    onClear?.()
  }, [onValueChange, onClear])

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!otherProps.disabled) {
        otherProps.onChange?.(e)
        onValueChange?.(e.target.value)
      }
    },
    [otherProps, onValueChange],
  )

  const getBaseProps = useCallback(
    () => ({
      className: cn('flex items-center', wrapperClassName),
    }),
    [wrapperClassName],
  )

  const getInputProps = useCallback(
    () => ({
      ...otherProps,
      ref: domRef,
      className: cn(
        'bg-transparent p-5 focus:outline-none',
        otherProps.className,
      ),
      onChange: handleChangeValue,
    }),
    [domRef, handleChangeValue, otherProps],
  )

  const getClearButtonProps = useCallback(
    () => ({
      onClick: handleClear,
    }),
    [handleClear],
  )

  return {
    handleClear,
    getBaseProps,
    getInputProps,
    getClearButtonProps,
    isClearable,
  }
}
