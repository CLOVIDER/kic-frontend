import { usePostLogin } from '@/app/(auth)/auth/api/queries'
import { useCallback, useState } from 'react'

export default function useLoginInput() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isPassword, setIsPassword] = useState<boolean>(true)
  const { mutate } = usePostLogin({ accountId: email, password })

  const handleLogin = useCallback(() => {
    mutate()
  }, [mutate])

  return {
    email,
    setEmail,
    password,
    setPassword,
    isPassword,
    setIsPassword,
    handleLogin,
  }
}
