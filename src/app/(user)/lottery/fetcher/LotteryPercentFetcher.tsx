import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import { useGetLotteryPercent } from '../queries'

const [LotteryPercentProvider, useLotteryPercentContext] = generateContext<{
  percent: number
}>({
  name: 'lottery-percent',
})

function LotteryPercentFetcher({
  children,
  id,
}: StrictPropsWithChildren<{ id: string }>) {
  const { data } = useGetLotteryPercent(Number(id))

  return (
    <LotteryPercentProvider percent={data}>{children}</LotteryPercentProvider>
  )
}

export { LotteryPercentFetcher, useLotteryPercentContext }
