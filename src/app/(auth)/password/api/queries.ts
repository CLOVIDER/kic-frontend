import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useFunnelContext } from '@/components'
import { patchPassword, postEmails, postEmailsVerify } from '.'

export const usePostEmails = () =>
  useMutation({
    mutationKey: ['post-emails'],
    mutationFn: (accountId: string) => postEmails({ accountId }),
  })

export const usePostEmailsVerify = (accountId: string) => {
  const { setStep } = useFunnelContext()

  return useMutation({
    mutationKey: ['emails-verify', accountId],
    mutationFn: (authCode: string) => postEmailsVerify({ accountId, authCode }),

    onSuccess: () => {
      setStep('change')
    },

    onError: () => {
      // eslint-disable-next-line
      alert('인증 번호가 틀렸습니다.')
    },
  })
}

export const usePatchPassword = () => {
  const { push } = useRouter()

  return useMutation({
    mutationKey: ['post-password'],
    mutationFn: (password: string) => patchPassword(password),

    onSuccess: () => {
      push('/')
    },

    onError: () => {
      // eslint-disable-next-line
      alert('인증 번호가 틀렸습니다.')
    },
  })
}
