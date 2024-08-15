'use client'

import Navigator from '@/components/common/Header/Sidebar/Navigator'
import Image from 'next/image'
import {
  Button,
  CompanyLogo,
  CompetitionRate,
  Right,
  StatusBox,
} from '@/components'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { useRouter } from 'next/navigation'
import HomeFallback from './components/HomeFallback'

export default function Home() {
  const { push } = useRouter()

  return (
    <main className="flex flex-row bg-[#FBFBFB] h-screen">
      <div className="w-340 h-full pt-250 border-r-1 border-[#EEEEEE] bg-white">
        <Navigator />
      </div>

      <div className="mt-40 ml-40">
        <CompanyLogo />
        <div className="relative pl-110 pt-150">
          <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
            <StatusBox>
              <CompetitionRate />
              <Button
                className="absolute z-10 right-210 top-150 w-auto px-20 h-40 bg-[#000000] !rounded-13 !text-15 text-white whitespace-nowrap"
                rightIcon={<Right width="20" />}
                onClick={() => push('/apply')}
              >
                신청하기
              </Button>
            </StatusBox>
          </AsyncBoundaryWithQuery>
          <Image
            src="/images/landing.svg"
            alt="landing"
            width={460}
            height={428}
            className="absolute bottom-0 right-0"
            priority
          />
        </div>
      </div>
    </main>
  )
}
