import { Button } from '@nextui-org/react'
import LotteryCard from '../LotteryCard'

export default function LotteryResult() {
  return (
    <LotteryCard className="gap-11 text-center z-100">
      <LotteryCard.Title className="flex">
        <p className="text-[#FFAB2D]">추첨결과</p> 가 나왔어요!
      </LotteryCard.Title>

      <LotteryCard.Description>
        당첨 결과를 확인할 어린이를 선택해주세요.
      </LotteryCard.Description>

      <LotteryCard.Content className="flex flex-col gap-20 mt-71">
        {/* TODO: click event */}
        <Button className="border-1 p-16 border-[#F90] rounded-16 w-221 h-56 bg-white text-20 text-[#F90]">
          이주애
        </Button>
        <Button className="border-1 p-16 border-[#F90] rounded-16 w-221 h-56 bg-white text-20 text-[#F90]">
          기모리
        </Button>
      </LotteryCard.Content>
    </LotteryCard>
  )
}
