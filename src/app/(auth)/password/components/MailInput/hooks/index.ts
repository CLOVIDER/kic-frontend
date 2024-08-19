'use client'

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { usePostEmailsVerify } from '@/app/(auth)/password/api/queries'

export default function useMail(id: string) {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { mutate } = usePostEmailsVerify(id)

  useEffect(() => {
    inputRefs.current[0].focus()
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) => {
      if (e.target.value.length === 1 && index < 5) {
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

  const handleVerifyEmails = useCallback(() => {
    const nums = inputRefs?.current.map(({ value }) => value).join('')
    mutate(nums)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRefs])

  return { handleChange, handleKeyDown, inputRefs, handleVerifyEmails }
}
