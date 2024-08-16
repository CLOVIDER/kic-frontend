import LotteryCard from '../LotteryCard'

export default function LotteryEnd() {
  return (
    <LotteryCard className="gap-11 text-center z-100">
      <LotteryCard.Title className="text-[#FFAB2] text-40">
        곧 모집이 시작돼요!!
      </LotteryCard.Title>

      <LotteryCard.Description className="text-30">
        일정을 확인해주세요 !
      </LotteryCard.Description>
    </LotteryCard>
  )
}
