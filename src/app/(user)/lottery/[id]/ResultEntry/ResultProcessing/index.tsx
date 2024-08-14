'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import ResultCard from '../ResultCard'

export default function ResultProcessing() {
  const { back } = useRouter()

  return (
    <ResultCard className="gap-15">
      <Image src="/images/face.svg" alt="face" width={177} height={177} />

      <ResultCard.Title>추첨 대기중...</ResultCard.Title>

      <ResultCard.SubTitle className="flex">
        당첨 확률은 <span className="text-[#FFAB2D]">68.6%</span>에요 !!
      </ResultCard.SubTitle>

      <Button
        onClick={back}
        className="text-[#969797] mt-20 bg-transparent h-16 underline underline-offset-2"
      >
        돌아가기
      </Button>
    </ResultCard>
  )
}
