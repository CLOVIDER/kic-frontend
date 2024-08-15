import { useMutation } from '@tanstack/react-query'
import { ACCESS_TOKEN, ROLE } from '@/constants'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { postLogin } from '.'
import { LoginRequest } from './type'

export const usePostLogin = (data: LoginRequest) => {
  const { push } = useRouter()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: () => postLogin(data),

    onSuccess: ({ result: { accessToken, role } }) => {
      Cookies.set(ACCESS_TOKEN, accessToken)
      Cookies.set(ROLE, role)

      if (role === 'ADMIN') {
        push('/admin')
      } else {
        push('/')
      }
    },
  })
}
