import Image from 'next/image'
import { Button } from '@nextui-org/react'
import ResultCard from '../ResultCard'

export default function ResultWaiting() {
  return (
    <ResultCard className="gap-15">
      <Image src="/images/Crab.svg" alt="winning" width={100} height={100} />

      <ResultCard.Title className="mt-15">대기번호</ResultCard.Title>
      <ResultCard.Title className="text-80">17번</ResultCard.Title>

      <ResultCard.Description className="mt-23 text-center">
        차례가 되면 메일로 알려드릴게요.
        <br />
        대기 취소를 원하실 경우 꼭{' '}
        <span className="text-[#FFAB2D]">대기 취소 버튼</span>을 눌러주세요 !
      </ResultCard.Description>

      <ResultCard.Footer className="w-full flex justify-center font-semibold mt-45">
        <div className="flex gap-7">
          <Button className="bg-[white] w-105 h-40 border-1 border-[#E2C9A4] text-[#FFAB2D] ">
            대기 취소
          </Button>

          <Button className="w-105 h-40 text-white gradient-button">
            확인
          </Button>
        </div>
      </ResultCard.Footer>
    </ResultCard>
  )
}
