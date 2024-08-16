import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { postEmails, postEmailsVerify } from '.'

export const usePostEmails = () =>
  useMutation({
    mutationKey: ['post-emails'],
    mutationFn: (accountId: string) => postEmails({ accountId }),
  })

export const usePostEmailsVerify = (accountId: string) => {
  const { push } = useRouter()
  return useMutation({
    mutationKey: ['emails-verify'],
    mutationFn: (authCode: string) => postEmailsVerify({ accountId, authCode }),

    onSuccess: () => {
      // TODO: FIXME
      push('/')
    },
    onError: () => {
      // TODO: Modal
      // eslint-disable-next-line
      alert('인증 번호가 틀렸습니다.')
    },
  })
}
