'use client'

import { forwardRef } from 'react'
import { useInput, UseInputProps } from './useInput'

const Input = forwardRef<HTMLInputElement, UseInputProps>((props, ref) => {
  const { endContent, startContent } = props
  const { getBaseProps, getInputProps, isClearable, getClearButtonProps } =
    useInput({ ...props, ref })

  return (
    <div {...getBaseProps()}>
      {startContent}
      <input {...getInputProps()} />

      {/* eslint-disable-next-line */}
      {isClearable && <button {...getClearButtonProps()}>x</button>}
      {endContent}
    </div>
  )
})

Input.displayName = 'KIC-Input'

export default Input
