'use client'

import HomeFallback from '@/app/(home)/components/HomeFallback'
import {
  Button,
  CompanyLogo,
  StatusBox,
  LandingLower,
  CompetitionRate,
  Plus,
  Chart,
  Right,
} from '@/components'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import Image from 'next/image'
import RecruitStatus from '../components/RecruitStatus'

export default function Page() {
  return (
    <div className="w-full h-full px-20 flex flex-col justify-center items-center">
      <div className="absolute top-10 left-140 w-full mb-100">
        <CompanyLogo />
      </div>
      <div className="flex flex-row gap-100 px-110 mt-150 relative">
        <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
          <div className="flex flex-col gap-30">
            <StatusBox className="relative w-[590px] h-300">
              <RecruitStatus />
              <Button
                className="absolute z-10 right-130 top-125 w-auto px-20 h-35 bg-[#000000] rounded-full !text-15 whitespace-nowrap"
                rightIcon={<Right width="20" />}
              >
                신청하기
              </Button>
            </StatusBox>
            <Image
              src="/images/landing.svg"
              alt="landing"
              width={400}
              height={367}
              className="absolute bottom-117 left-475"
              priority
            />
            <LandingLower />
          </div>
          <div className="flex flex-col gap-30">
            <div className="relative">
              <CompetitionRate className="w-370" />
              <div className="flex items-center justify-center w-23 h-23 right-13 top-15 absolute bg-[#ffa5a5] rounded-50">
                <Plus width={10} />
              </div>
            </div>
            <Chart />
          </div>
        </AsyncBoundaryWithQuery>
      </div>
    </div>
  )
}
