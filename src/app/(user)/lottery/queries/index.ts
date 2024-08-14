import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import {
  deleteLottery,
  getLotteriesEmployee,
  getLotteryDetailResult,
  getLotteryPercent,
  patchRegistry,
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

export const useDeleteLottery = (lotteryId: number) =>
  useMutation({
    mutationKey: ['delete-lottery', lotteryId],
    mutationFn: () => deleteLottery(lotteryId),
  })

export const usePatchRegisterLottery = (lotteryId: number) =>
  useMutation({
    mutationKey: ['patch-lottery', lotteryId],
    mutationFn: () => patchRegistry(lotteryId),
  })
