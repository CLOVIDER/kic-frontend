import { useSuspenseQuery } from '@tanstack/react-query'
import {
  getLotteriesEmployee,
  getLotteryDetailResult,
  getLotteryPercent,
} from '../api'

export const useGetLotteriesEmployee = () =>
  useSuspenseQuery({
    queryKey: ['get-lotteries'],
    queryFn: getLotteriesEmployee,
    select: ({ result }) => result,
  })

export const useGetLotteryDetailResult = (lotteryId: number) =>
  useSuspenseQuery({
    queryKey: ['get-lotteries-result', lotteryId],
    queryFn: () => getLotteryDetailResult(lotteryId),
    select: ({ result }) => result,
  })

export const useGetLotteryPercent = (lotteryId: number) =>
  useSuspenseQuery({
    queryKey: ['get-lotteries-percent', lotteryId],
    queryFn: () => getLotteryPercent(lotteryId),
    select: ({ result }) => result,
  })
