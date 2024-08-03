'use client'

import {
  Button,
  Input,
  Setting,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components'
import Image from 'next/image'
import Title from '../Title'
import { useKindergarten } from './useKindergarten'

export default function Kindergarten() {
  const {
    kindergartens,
    classes,
    addClass,
    removeClass,
    updateClassName,
    updateClassCapacity,
  } = useKindergarten()

  return (
    <section className="mt-20 px-20">
      <div className="flex flex-row items-start mb-15">
        <Title
          title="어린이집별 모집"
          subtitle="+ 버튼을 눌러 반을 생성하세요."
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Setting width={15} height={20} />
            </TooltipTrigger>
            <TooltipContent className="text-9 border-[#a6a5a5] py-0">
              어린이집 수정 페이지로 이동합니다.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {kindergartens.map((kindergarten, kIndex) => (
        <div key={kindergarten.kindergartenId} className="mb-40">
          <div className="flex flex-row justify-between items-center mb-2">
            <p>{kindergarten.kindergartenNm}</p>
            <Button
              onClick={() => addClass(kIndex)}
              className="items-center justify-center p-13 w-15 h-18 bg-[#FFE4A3] font-bold text-[20px] text-[#ffffff] shadow-md"
            >
              +
            </Button>
          </div>
          <div className="bg-[#ccc2c2] h-1 w-full mb-4" />
          <div className="flex flex-row px-5 mb-4 text-14 text-[#666666]">
            <p className="w-160">분반 이름</p>
            <p>모집인원</p>
          </div>
          <div className="mt-4">
            {classes[kIndex].map((classInfo, cIndex) => (
              <div
                key={classInfo.classIndex}
                className="flex flex-row gap-10 mb-2"
              >
                <Input
                  type="text"
                  value={classInfo.className}
                  onChange={(e) =>
                    updateClassName(kIndex, cIndex, e.target.value)
                  }
                  className="w-150"
                  placeholder="분반 이름"
                />
                <Input
                  type="number"
                  value={classInfo.capacity}
                  onChange={(e) =>
                    updateClassCapacity(
                      kIndex,
                      cIndex,
                      parseInt(e.target.value, 10),
                    )
                  }
                  className="appearance-none w-60 text-center"
                  placeholder="모집인원"
                  min="0"
                />
                <Button
                  type="button"
                  className="p-0 ml-40 w-30"
                  onClick={() => removeClass(kIndex, cIndex)}
                  aria-label="Remove Class"
                >
                  <Image
                    alt="분반 삭제하기"
                    src="/images/x-circle-1.svg"
                    width={30}
                    height={30}
                  />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
