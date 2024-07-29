import {
  Button,
  CompanyLogo,
  StatusBox,
  NumberDisplay,
  LandingLower,
  CompetitionRate,
  Plus,
  Chart,
  Right,
} from '@/components'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="w-full h-full px-20 flex flex-col justify-center items-center">
      <div className="absolute top-10 left-140 w-full mb-100">
        <CompanyLogo />
      </div>
      <div className="flex flex-row gap-100 px-110 mt-100 relative">
        <div className="flex flex-col gap-40">
          <StatusBox className="relative w-[590px] h-300">
            <div className="flex flex-row bg-white w-450 px-50 pt-15 pb-30 rounded-32 shadow-md gap-50">
              <NumberDisplay title="총 신청자" number={670} />
              <NumberDisplay title="승인 대기" number={100} />
            </div>
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
            className="absolute bottom-130 left-475"
            priority
          />
          <LandingLower />
        </div>
        <div className="flex flex-col gap-20">
          <div className="relative">
            <CompetitionRate className="w-370" />
            <div className="flex items-center justify-center w-23 h-23 right-13 top-15 absolute bg-[#ffa5a5] rounded-50">
              <Plus width={10} />
            </div>
          </div>
          <Chart />
        </div>
      </div>
    </div>
  )
}
