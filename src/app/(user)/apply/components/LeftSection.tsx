import React from 'react'
import Image from 'next/image'
import { LeftSectionProps } from '@/type/application'
import { useLeftSection } from '../hooks/useLeftSection'

export default function LeftSection({ name, date, ifCC }: LeftSectionProps) {
  const { formattedDate, ccStatus } = useLeftSection(date, ifCC)

  return (
    <div className="h-screen flex flex-col items-center mt-300">
      <div className="font-bold text-[31px]">
        <span className="text-[#202020]">안녕하세요 </span>
        <span className="text-[#ffaa2c]">{name}</span>
        <span className="text-[#202020]">님 !</span>
      </div>
      <p className="relative mt-49 left-[16px] font-medium text-[20px] text-center text-[#202020]">
        아래 정보와 다른 부분이 있다면
        <br />
        채널톡을 통해 관리자에게 문의해주세요.
      </p>
      <Image
        className="relative mt-24"
        alt=""
        src="/images/boy-standing-front.svg"
        width={208.89}
        height={249.85}
        priority
      />
      <div className="w-342 h-110 rounded-2xl border-2 border-[#ffaa2c] mt-30">
        <div className="flex w-194 h-72 mt-19 ml-74 ">
          <div className="w-93 h-70 mr-20 text-16 text-center text-[#FFAB2D]">
            <div>입사일</div>
            <div className="w-93 mt-22">사내 부부 여부</div>
          </div>
          <div className="w-90 h-72 text-[#666666] text-16 text-center">
            <div className="w-90 h-24">{formattedDate}</div>
            <div className="mt-22">{ccStatus}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
