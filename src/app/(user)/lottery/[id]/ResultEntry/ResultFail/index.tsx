import Image from 'next/image'
import { useLotteryDetailContext } from '@/app/(user)/lottery/fetcher/ResultFetcher'
import ResultCard from '../ResultCard'

export default function ResultFail() {
  const { kindergartenNm } = useLotteryDetailContext()

  return (
    <ResultCard className="gap-15">
      <Image src="/images/Crab.svg" alt="winning" width={177} height={177} />

      <ResultCard.Title className="mt-15">아쉬워요..</ResultCard.Title>

      <ResultCard.SubTitle className="flex">
        <span className="text-[#FFAB2D]">{kindergartenNm}</span>에 당첨되지
        못했어요.
      </ResultCard.SubTitle>
    </ResultCard>
  )
}
