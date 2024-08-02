import { Button, Input } from '@/components'
import Image from 'next/image'
import Kindergarten from './components/Kindergarten'
import Title from './components/Title'
import Period from './components/Period'
import Weight from './components/Weight'

export default function Page() {
  return (
    <div className="w-full h-full flex flex-row z-10 gap-120 p-120 justify-center relative">
      <section className="w-full">
        <div className="flex flex-row">
          <Image
            src="/images/bg-setting.svg"
            alt="bg"
            width={100}
            height={100}
          />
          <div className="pt-20">
            <Title title="회사명" />
            <Input />
          </div>
        </div>
        <div className="mt-60">
          <Weight />
        </div>
      </section>
      <Kindergarten />
      <div className="mt-20">
        <Period />
      </div>
      <div className="flex flex-row gap-10 absolute bottom-150 right-130">
        <Button className="w-98 h-31 bg-white border border-[#fdba74] font-semibold text-[#fb923c] rounded-16 text-sm">
          이전
        </Button>
        <Button className="w-98 h-31 shadow-md gradient-button text-[#ffffff] font-bold rounded-16 text-sm">
          저장
        </Button>
      </div>
    </div>
  )
}
