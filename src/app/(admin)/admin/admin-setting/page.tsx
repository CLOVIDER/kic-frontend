import { Input } from '@/components'
import Image from 'next/image'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import Kindergarten from './components/Kindergarten'
import Title from './components/Title'
import Period from './components/Period'
import Weight from './components/Weight'
import SettingFetcher from './components/SettingFetcher'
import Buttons from './components/Buttons'

export default function Page() {
  return (
    <AsyncBoundaryWithQuery>
      <SettingFetcher>
        <form className="w-full h-full flex flex-row z-10 gap-120 p-120 justify-center relative">
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
                <Input placeholder="DK Techin" />
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
            <Buttons />
          </div>
        </form>
      </SettingFetcher>
    </AsyncBoundaryWithQuery>
  )
}
