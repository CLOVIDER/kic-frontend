import Navigator from '@/components/common/Header/Sidebar/Navigator'
import Image from 'next/image'
import { CompanyLogo } from '@/components'
import { HomeFetcher } from './components/HomeFetcher'
import LandingBox from './components/LandingBox'

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
          <HomeFetcher>
            <LandingBox />
          </HomeFetcher>
        </div>
      </div>
      <Image
        src="/images/landing.svg"
        alt="landing"
        width={460}
        height={428}
        className="absolute bottom-150 right-140"
        priority
      />
    </main>
  )
}
