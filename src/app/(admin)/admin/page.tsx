'use client'

import HomeFallback from '@/app/(home)/components/HomeFallback'
import {
  Button,
  CompanyLogo,
  StatusBox,
  LandingLower,
  Right,
  Chart,
  Plus,
  CompetitionRate,
} from '@/components'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import Image from 'next/image'
import { Suspense } from 'react'
import RecruitStatus from '../components/RecruitStatus'
import {
  AdminKinderStatusFetcher,
  AdminRecruitFetcher,
} from '../components/adminFetcher'

export default function Page() {
  return (
    <Suspense>
      <div className="w-full h-full px-20 flex flex-col justify-center items-center">
        <div className="absolute top-10 left-140 w-full mb-100">
          <CompanyLogo />
        </div>
        <div className="flex flex-row gap-70 px-110 mt-150 relative">
          <div className="flex flex-col gap-30">
            <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
              <StatusBox>
                <AdminRecruitFetcher>
                  <RecruitStatus />
                </AdminRecruitFetcher>
                <Button
                  className="absolute z-10 left-460 top-180 w-auto px-20 h-40 bg-[#000000] rounded-12 !text-15 whitespace-nowrap"
                  rightIcon={<Right width="20" />}
                >
                  모집 현황
                </Button>
              </StatusBox>
            </AsyncBoundaryWithQuery>
            <Image
              src="/images/landing.svg"
              alt="landing"
              width={400}
              height={367}
              className="absolute bottom-165 left-490"
              priority
            />

            <LandingLower />
          </div>
          <div className="flex flex-col gap-30">
            <div className="relative">
              <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
                <CompetitionRate className="w-370" />
              </AsyncBoundaryWithQuery>
              <div className="flex items-center justify-center w-23 h-23 right-13 top-15 absolute bg-[#ffa5a5] rounded-50">
                <Plus width={10} />
              </div>
            </div>
            <AsyncBoundaryWithQuery>
              <AdminKinderStatusFetcher>
                <Chart />
              </AdminKinderStatusFetcher>
            </AsyncBoundaryWithQuery>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
