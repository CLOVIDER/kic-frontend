import { useCallback, useState } from 'react'
import { usePatchPassword } from '../../../api/queries'

export const useChange = () => {
  const [password, setPassword] = useState<string>('')
  const { mutate } = usePatchPassword()

  const handleChangePassword = useCallback(() => {
    mutate(password)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password])

  return { password, setPassword, handleChangePassword }
}
