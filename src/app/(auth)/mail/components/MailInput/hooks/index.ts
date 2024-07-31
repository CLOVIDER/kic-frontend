'use client'

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'

export default function useMail() {
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    inputRefs.current[0].focus()
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) => {
      if (e.target.value.length === 1 && index < 4) {
        inputRefs.current[index + 1].focus()
      }
    },
    [],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && index > 0 && e.currentTarget.value === '') {
        inputRefs.current[index - 1].focus()
      }
    },
    [],
  )

  // TODO: API 연결
  // const handleSubmitMail = useCallback(() => {}, [])

  return { handleChange, handleKeyDown, inputRefs }
}
