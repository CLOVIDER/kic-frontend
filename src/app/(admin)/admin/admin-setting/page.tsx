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
        <div className="mx-100">
          <form className="flex flex-col z-10 gap-120 px-150 py-100 justify-center relative bg-white/50 rounded-10">
            <div className="flex flex-row items-center gap-10">
              <Image
                src="/images/bg-setting.svg"
                alt="bg"
                width={100}
                height={100}
              />

              <Title title="회사명" className="mr-10" />
              <Input placeholder="DK Techin" />
            </div>

            <Kindergarten />

            <Period />

            <Weight />
          </form>

          <Buttons />
        </div>
      </SettingFetcher>
    </AsyncBoundaryWithQuery>
  )
}
