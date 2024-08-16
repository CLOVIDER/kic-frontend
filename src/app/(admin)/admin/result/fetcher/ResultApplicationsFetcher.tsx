'use client'

import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import {
  GetLotteriesRequest,
  GetLotteriesResponse,
} from '@/app/(admin)/admin/result/api/index'
import { useGetLotteries } from '../queries'

export const [LotteriesProvider, useLotteriesContext] = generateContext<{
  lotteries: GetLotteriesResponse
}>({
  name: 'lotteries',
})

export default function LotteriesFetcher({
  children,
  ...params
}: StrictPropsWithChildren<GetLotteriesRequest>) {
  const { data } = useGetLotteries(params)

  return <LotteriesProvider lotteries={data}>{children}</LotteriesProvider>
}
