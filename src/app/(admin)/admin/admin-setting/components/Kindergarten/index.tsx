'use client'

import {
  Input,
  Setting,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components'
import Title from '../Title'
import { useKindergarten } from './useKindergarten'
import '../setting.css'

enum AgeClass {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export default function Kindergarten() {
  const { kindergartens, classes, updateClassCapacity } = useKindergarten()

  const defaultClasses = [0, 1, 2, 3, 4, 5].map((ageClass) => ({
    ageClass,
    recruitCnt: 0,
  }))

  const mergedClasses = (kIndex: number) =>
    defaultClasses.map((defaultClass) => {
      const existingClass = classes[kIndex].find(
        (cls) => cls.ageClass === defaultClass.ageClass,
      )
      return existingClass || defaultClass
    })

  return (
    <section className="mt-20 px-20">
      <div className="flex flex-row items-start relative border-b-1 border-[#ccc2c2]">
        <Title title="모집 인원" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Setting width={30} height={20} />
            </TooltipTrigger>
            <TooltipContent className="text-9 border-[#a6a5a5] py-0">
              어린이집 수정 페이지로 이동합니다.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-15 text-[#E86565] mb-50">
        0명으로 설정하면 모집이 열리지 않아요 !
      </p>

      <div className="grid grid-cols-2 gap-50">
        {kindergartens.map((kindergarten, kIndex) => (
          <div key={kindergarten.kindergartenId} className="mb-40">
            <div className="w-350 shadow-md bg-[#ffe4a2] mb-2 px-20 py-10">
              <p className="">{kindergarten.kindergartenNm}</p>
            </div>

            <div className="flex flex-row px-10 my-10 text-14 text-[#666666]">
              <p className="w-260">분반 이름</p>
              <p>모집인원</p>
            </div>
            <div className="p-5">
              {mergedClasses(kIndex).map(({ ageClass, recruitCnt }) => (
                <div
                  key={ageClass}
                  className="flex flex-row gap-10 mb-10 px-5 border-b-1 border-[#ccc2c2] items-center"
                >
                  <p className="w-250">{ageClass}세</p>

                  <Input
                    type="number"
                    value={recruitCnt}
                    onChange={(e) =>
                      updateClassCapacity(
                        kIndex,
                        ageClass,
                        parseInt(e.target.value, 10),
                      )
                    }
                    className="appearance-none w-100 text-center"
                    placeholder="모집인원"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
