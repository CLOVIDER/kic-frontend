import { http } from '@/api'

export const postEmails = ({ accountId }: { accountId: string }) =>
  http.post({
    url: '/api/emails',
    data: { accountId },
  })

export const postEmailsVerify = ({
  accountId,
  authCode,
}: {
  accountId: string
  authCode: string
}) =>
  http.post({
    url: '/api/emails/verify',
    data: { accountId, authCode },
  })

export const patchPassword = (password: string) =>
  http.patch({
    url: `/api/employees`,
    data: { password },
  })
