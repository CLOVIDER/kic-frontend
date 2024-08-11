import { useSuspenseQuery } from '@tanstack/react-query'
import {
  GetLotteriesRequest,
  getLotteriesResult,
} from '@/app/(admin)/admin/result/api/index'

export const useGetLotteries = (lotteryInfo: GetLotteriesRequest) =>
  useSuspenseQuery({
    queryKey: [
      'post-lotteries-result',
      lotteryInfo.kindergartenId,
      lotteryInfo.classValue,
      lotteryInfo.page,
      lotteryInfo.q,
    ],
    queryFn: () => getLotteriesResult(lotteryInfo),
    select: ({ result }) => result,
  })
