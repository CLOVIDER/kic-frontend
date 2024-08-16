'use client'

import HomeFallback from '@/app/(home)/components/HomeFallback'
import {
  Button,
  CompanyLogo,
  StatusBox,
  LandingLower,
  Right,
  Chart,
  CompetitionRate,
} from '@/components'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import RecruitStatus from '../components/RecruitStatus'
import {
  AdminKinderStatusFetcher,
  AdminRecruitFetcher,
} from '../components/adminFetcher'

export default function Page() {
  const { push } = useRouter()
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute top-10 left-140 w-full">
          <CompanyLogo />
        </div>
        <div className="flex flex-row gap-70 px-110 mt-170 relative">
          <div className="flex flex-col gap-30">
            <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
              <div className="w-auto">
                <StatusBox className="mt-50 w-680">
                  <AdminRecruitFetcher>
                    <RecruitStatus />
                  </AdminRecruitFetcher>
                  <Button
                    onClick={() => push('/admin/applications')}
                    className="absolute z-10 left-460 top-218 w-auto px-20 h-40 bg-[#000000] rounded-15 !text-15 whitespace-nowrap hover:bg-[#2d2c2c]"
                    rightIcon={<Right width="20" />}
                  >
                    모집 현황
                  </Button>

                  <Image
                    src="/images/landing.svg"
                    alt="landing"
                    width={400}
                    height={367}
                    className="absolute top-0 left-500"
                    priority
                  />
                </StatusBox>
              </div>
            </AsyncBoundaryWithQuery>

            <LandingLower />
          </div>
          <div className="flex flex-col gap-30 mt-50">
            <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
              <CompetitionRate className="w-370" />
            </AsyncBoundaryWithQuery>

            <AsyncBoundaryWithQuery>
              <AdminKinderStatusFetcher>
                <Chart />
              </AdminKinderStatusFetcher>
            </AsyncBoundaryWithQuery>
          </div>
        </div>
      </div>
    </>
  )
}
