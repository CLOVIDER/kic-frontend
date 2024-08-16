import { StrictPropsWithChildren } from '@/type'
import { useChildrenContext } from '../../../fetcher/ChildrenFetcher'
import LotteryCard from '../LotteryCard'

export default function LotteryPending({ children }: StrictPropsWithChildren) {
  const { childrenInfo } = useChildrenContext()
  const isPending = childrenInfo.some(({ isAccept }) => isAccept !== 'ACCEPT')

  if (isPending)
    return (
      <LotteryCard className="gap-11 text-center z-100">
        <LotteryCard.Title className="flex">
          <p className="text-[#FFAB2D]">승인 대기중</p> 이에요.
        </LotteryCard.Title>

        <LotteryCard.Description>
          승인이 완료되면 이메일로 알려드릴게요 !
        </LotteryCard.Description>
      </LotteryCard>
    )
  return <>{children}</>
}
