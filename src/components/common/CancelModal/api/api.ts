import { http } from '@/api'
import { useMutation } from '@tanstack/react-query'

export const deleteLottery = (id: number) =>
  http.delete<string>({
    url: `api/${id}`,
  })

export const useDeleteLottery = () => {
  return useMutation({
    mutationKey: ['delete'],
    mutationFn: (id: number) => deleteLottery(id),
    onSuccess: () => {},
  })
}
