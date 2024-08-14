import { useCallback } from 'react'
import { useFunnelContext } from '@/components/common'
import { usePostEmails } from '@/app/(auth)/password/api/queries'

export default function useIdInput(id: string) {
  const { setStep } = useFunnelContext()
  const { mutate } = usePostEmails()

  const handleNextStep = useCallback(() => {
    if (id) {
      mutate(id, {
        onSuccess: () => {
          setStep('mail')
        },
      })
      return
    }
    alert('아이디를 입력해주세요.')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return { handleNextStep }
}
