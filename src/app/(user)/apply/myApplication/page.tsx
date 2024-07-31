import { Button } from '@/components'
import { Application } from '@/components/common'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-5 relative p-100">
      <Image
        src="/images/bg.svg"
        alt="bg"
        width={290}
        height={400}
        className="absolute left-140 bottom-145"
      />
      <h1 className="w-full flex justify-center text-30 mb-30 font-sans">
        이미 신청하신 내역이 있어요 !
      </h1>
      <div className="ml-270">
        <Application />
      </div>
      <div className="flex flex-row items-center gap-10 justify-end mr-210">
        <Button className="border-1 p-16 border-orange rounded-[20px] w-120 h-40 bg-white text-[18px] text-orange">
          신청 취소
        </Button>
        <Button className="border-1 p-16 rounded-[20px] w-120 h-40 text-[18px] text-white bg-gradient-to-r from-[#ffbb37] to-[#ffe39e]">
          수정
        </Button>
      </div>
    </div>
  )
}
