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
import HomeFallback from './components/HomeFallback'

export default function Home() {
  return (
    <main className="flex flex-row bg-[#FBFBFB] h-screen">
      <div className="w-356 h-full pt-90 border-r-1 border-[#EEEEEE] bg-white">
        <p className="py-50 px-55 text-20 text-[#D7D7D7]">menu</p>
        <Navigator />
      </div>
      <div className="mt-40 ml-60">
        <CompanyLogo />
        <div className="relative ml-110 mt-150">
          <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
            <StatusBox>
              <CompetitionRate />
              <Button
                className="absolute z-10 right-160 top-120 w-auto px-20 h-35 bg-[#000000] rounded-full !text-15 whitespace-nowrap"
                rightIcon={<Right width="20" />}
              >
                신청하기
              </Button>
            </StatusBox>
          </AsyncBoundaryWithQuery>
        </div>
      </div>
      <Image
        src="/images/landing.svg"
        alt="landing"
        width={460}
        height={428}
        className="absolute bottom-150 right-120"
        priority
      />
    </main>
  )
}
