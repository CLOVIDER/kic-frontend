import { Button } from '@nextui-org/react'
import LotteryCard from '../LotteryCard'

export default function LotteryEnd() {
  return (
    <LotteryCard className="gap-11 text-center z-100">
      <LotteryCard.Title className="text-[#FFAB2] text-40">
        모집이 마감되었어요!
      </LotteryCard.Title>

      <LotteryCard.Description className="text-30">
        추첨을 진행할까요?
      </LotteryCard.Description>

      <LotteryCard.Content className="flex flex-col gap-20 mt-36">
        {/* TODO: click event */}
        <Button className="border-1 p-16 border-[#F90] rounded-16 w-221 h-56 bg-white text-20 text-[#F90]">
          추첨 시작
        </Button>
      </LotteryCard.Content>
    </LotteryCard>
  )
}
