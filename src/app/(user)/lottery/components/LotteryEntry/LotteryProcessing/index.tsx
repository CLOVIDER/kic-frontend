'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import LotteryCard from '../LotteryCard'
import { useChildrenContext } from '../../../fetcher/ChildrenFetcher'

export default function LotteryProcessing() {
  const { childrenInfo } = useChildrenContext()
  const { push } = useRouter()

  return (
    <LotteryCard className="gap-11 text-center z-100">
      <LotteryCard.Title className="flex">
        <p className="text-[#FFAB2D]">신청 진행중</p> 이에요.
      </LotteryCard.Title>

      <LotteryCard.Description>
        당첨 확률을 확인할 어린이를 선택해주세요.
      </LotteryCard.Description>

      <LotteryCard.Content className="grid grid-cols-2 gap-20 mt-71">
        {childrenInfo.map(({ childName, className, lotteryId }) => (
          <Button
            key={lotteryId}
            className="border-1 p-16 border-[#F90] rounded-16 w-221 h-56 bg-white text-20 text-[#F90]"
            onClick={() => push(`/lottery/${lotteryId}`)}
          >
            {`${childName} ${className}`}
          </Button>
        ))}
      </LotteryCard.Content>
    </LotteryCard>
  )
}
