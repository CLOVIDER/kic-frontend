import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import {
  GetLotteriesRequest,
  getLotteriesResult,
  postEmailsRecruits,
} from '@/app/(admin)/admin/result/api/index'

export const useGetLotteries = (lotteryInfo: GetLotteriesRequest) =>
  useSuspenseQuery({
    queryKey: [
      'post-lotteries-result',
      lotteryInfo.kindergartenId,
      lotteryInfo.classValue,
      lotteryInfo.page,
      lotteryInfo.accountId,
    ],
    queryFn: () => getLotteriesResult(lotteryInfo),
    select: ({ result }) => result,
  })

export const usePostRecruits = () =>
  useMutation({
    mutationKey: ['post-mail-recriuts'],
    mutationFn: postEmailsRecruits,
  })
