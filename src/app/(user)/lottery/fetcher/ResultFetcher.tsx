import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import { useGetLotteryDetailResult } from '../queries'
import { GetLotteriesDetailResponse } from '../api'

const [LotteryDetailProvider, useLotteryDetailContext] =
  generateContext<GetLotteriesDetailResponse>({ name: 'lottery-detail' })

function ResultFetcher({
  children,
  id,
}: StrictPropsWithChildren<{ id: number }>) {
  const { data } = useGetLotteryDetailResult(id)

  return <LotteryDetailProvider {...data}>{children}</LotteryDetailProvider>
}

export { ResultFetcher, useLotteryDetailContext }
