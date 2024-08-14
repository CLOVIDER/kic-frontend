import Image from 'next/image'
import ResultCard from '../ResultCard'

export default function ResultFail() {
  return (
    <ResultCard className="gap-15">
      <Image src="/images/Crab.svg" alt="winning" width={177} height={177} />

      <ResultCard.Title className="mt-15">아쉬워요..</ResultCard.Title>

      <ResultCard.SubTitle className="flex">
        <span className="text-[#FFAB2D]">어린이집 이름</span>에 당첨되지
        못했어요.
      </ResultCard.SubTitle>
    </ResultCard>
  )
}
