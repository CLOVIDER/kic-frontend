import { useState } from 'react'

export default function useLoginInput() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isPassword, setIsPassword] = useState<boolean>(true)

  return { email, setEmail, password, setPassword, isPassword, setIsPassword }
}
