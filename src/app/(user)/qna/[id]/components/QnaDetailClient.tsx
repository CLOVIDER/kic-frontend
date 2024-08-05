'use client'

import { useRouter } from 'next/navigation'
import cn from '@/util/cn'
import { useQnaDetail } from '../hooks/useQnaDetail'

export default function QnaDetailClient() {
  const router = useRouter()
  const { qnaData } = useQnaDetail()

  if (!qnaData) {
    return <div>문의사항을 찾을 수 없습니다.</div>
  }

  return (
    <div className="absolute w-[1280px] h-[720px] mt-40 bg-white flex-col flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="mt-22 ml-21 w-[118px] h-[39px] text-32 font-inter font-bold">
          문의사항
        </div>
        <div className="ml-25 mt-14 w-[745px] h-473 rounded-20 shadow-md border-[#00000014] border-1 border-solid box-border overflow-hidden">
          <div className="ml-20 mt-6 relative w-full flex flex-row items-center justify-start py-0 px-5 box-border gap-2.5 text-left text-base text-dimgray font-noto-sans">
            <div className="relative text-16 leading-[24px] font-bold">
              제목
            </div>
            <div className="w-[284px] relative text-16 leading-[24px] text-black flex items-center shrink-0">
              {qnaData.title}
            </div>
            <div className="relative text-16 leading-[24px] font-bold">
              작성자
            </div>
            <div className="relative text-16 leading-[24px] text-black">
              {qnaData.author}
            </div>
            <div className="relative text-16 leading-[24px] font-bold">
              작성일자
            </div>
            <div className="relative text-16 leading-[24px] text-black">
              {qnaData.date}
            </div>
            <div className="relative text-16 leading-[24px] font-bold">
              공개여부
            </div>
            <div
              className={cn(
                `relative text-16 leading-[24px] ${qnaData.privacy ? 'text-[#ff0000]' : 'text-[#7DBC72]'}`,
              )}
            >
              {qnaData.privacy ? '비공개' : '공개'}
            </div>
          </div>
          <div className="ml-16 mt-4 w-[712px] relative max-w-full border-solid border-[#D5D1D1] border-[0.3px] overflow-hidden" />
          <div className="ml-20 mt-5 px-5">
            <div className="font-bold mb-2">내용</div>
            <div>{qnaData.content}</div>
          </div>
        </div>
        <div className="flex ml-[669px] mt-8 w-324 h-31">
          <button
            className="w-98 h-30 padding-3 rounded-16 border-1 text-15 leading-24 text-center border-[#ffc044] text-[#ffab2d]"
            type="button"
            onClick={() => router.back()}
          >
            이전
          </button>
        </div>
      </div>
    </div>
  )
}
