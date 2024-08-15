import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { useLotteryDetailContext } from '@/app/(user)/lottery/fetcher/ResultFetcher'
import ResultCard from '../ResultCard'
import { useDeleteLottery, usePatchRegisterLottery } from '../../../queries'

export default function ResultWinning({ id }: { id: number }) {
  const { mutate } = useDeleteLottery(id)
  const { mutate: mutateRegistry } = usePatchRegisterLottery(id)
  const { kindergartenNm, endDate } = useLotteryDetailContext()

  return (
    <ResultCard className="gap-15">
      <Image src="/images/Winning.svg" alt="winning" width={177} height={177} />

      <ResultCard.Title className="mt-15">축하해요 !</ResultCard.Title>

      <ResultCard.SubTitle className="flex">
        <span className="text-[#FFAB2D] mx-5">{kindergartenNm}</span>에
        당첨됐어요 !!
      </ResultCard.SubTitle>

      <ResultCard.Description className="mt-23 text-center">
        등록기한 : ~ {endDate}까지
        <br />
        등록기한까지 등록하지 않으시면 당첨 취소 처리됩니다.
      </ResultCard.Description>

      <ResultCard.Footer className="w-full flex justify-between font-semibold mt-45">
        <Button className="bg-white w-105 h-40 border-1 border-[#FFAB2D] text-[#FFAB2D]">
          이전
        </Button>

        <div className="flex gap-7">
          <Button
            onClick={() => mutate()}
            className="bg-[white] w-105 h-40 border-1 border-[#E2C9A4] text-[#FFAB2D] "
          >
            등록 취소
          </Button>
          <Button
            onClick={() => mutateRegistry()}
            className="w-105 h-40 text-white gradient-button"
          >
            등록
          </Button>
        </div>
      </ResultCard.Footer>
    </ResultCard>
  )
}
