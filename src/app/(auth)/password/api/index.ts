import { http } from '@/api'

export const postEmails = ({ accountId }: { accountId: string }) =>
  http.post({
    url: '/api/emails/verify',
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
