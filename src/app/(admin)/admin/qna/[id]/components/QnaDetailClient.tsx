'use client'

import { useRouter } from 'next/navigation'
import { useQnaDetail } from '../hooks/useQnaDetail'
import { qna } from '../../data'

export default function QnaDetailClient() {
  const router = useRouter()
  const { qnaData } = useQnaDetail()

  const currentQna = qna.find((item) => item.id === qnaData?.id)

  if (!qnaData || !currentQna) {
    return <div>문의사항을 찾을 수 없습니다.</div>
  }

  const handleAnswerClick = (id: number) => {
    router.push(`/admin/qna/answer/${id}`)
  }

  return (
    <div className="w-[1280px] h-[720px] mt-40 bg-white flex-col flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="ml-21 mt-22 w-[118px] h-[39px] text-32 font-inter font-bold">
          문의사항
        </div>
        <div className="ml-21 mt-25 w-[745px] h-467 rounded-20 shadow-md border-[rgba(0,0,0,0.08)] border-1 border-solid box-border overflow-hidden">
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
              className={`relative text-16 leading-[24px] ${qnaData.privacy ? 'text-[#ff0000]' : 'text-[#7DBC72]'}`}
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
        <div className="flex ml-[443px] mt-8 w-324 h-31">
          <button
            className="w-98 h-30 padding-3 rounded-16 border-1 text-15 leading-24 text-center border-[#ffc044] text-[#ffab2d]"
            type="button"
            onClick={() => router.back()}
          >
            이전
          </button>
          <button
            className={`ml-15 w-98 h-30 text-16 text-[#ffffff] rounded-16 ${
              currentQna.answered ? 'bg-[#ffbb38]' : 'bg-[#7DBC72]'
            }`}
            type="button"
            onClick={() => handleAnswerClick(qnaData.id)}
          >
            {currentQna.answered ? '답변수정' : '답변작성'}
          </button>
          <button
            className="ml-15 w-98 h-30 rounded-16 bg-[#FF7E6D] text-[#ffffff] text-16"
            type="button"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
