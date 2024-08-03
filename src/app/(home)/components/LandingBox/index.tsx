'use client'

import { Button, CompetitionRate, Right, StatusBox } from '@/components'
import { useHomeContext } from '../HomeFetcher/HomeContext'

export default function LandingBox() {
  const { recruitStatus } = useHomeContext()

  return (
    <StatusBox>
      {recruitStatus === '모집없음' ? null : (
        <>
          <CompetitionRate />
          <Button
            className="absolute z-10 right-160 top-120 w-auto px-20 h-35 bg-[#000000] rounded-full !text-15 whitespace-nowrap"
            rightIcon={<Right width="20" />}
          >
            신청하기
          </Button>
        </>
      )}
    </StatusBox>
  )
}
