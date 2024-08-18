import { http } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const deleteLottery = (id: number) =>
  http.delete<string>({
    url: `api/lotteries/${id}`,
  })

export const deleteApplication = (id: number) =>
  http.delete<string>({
    url: `api/applications/${id}`,
  })

export const useDeleteLottery = (mode: 'application' | 'lottery') => {
  const { push } = useRouter()

  return useMutation({
    mutationKey: ['delete'],
    mutationFn: (id: number) =>
      mode === 'lottery' ? deleteLottery(id) : deleteApplication(id),
    onSuccess: () => {
      if (mode === 'application') {
        toast.success('취소되었습니다.', {
          onClose: () => push('/'),
          autoClose: 1000,
          pauseOnHover: false,
        })
      } else {
        toast.success('취소되었습니다.', {
          autoClose: 1000,
          pauseOnHover: false,
        })
      }
    },
    onError : () => {
      toast.error("다시 시도해주세요.")
    }
  })
}
