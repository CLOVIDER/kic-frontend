'use client'

import DynamicBlockNoteEditor from '@/components/common/BlockNote/DynamicBlockNoteEditor'
import { useQnaDetail } from '../../../[id]/hooks/useQnaDetail'

export default function AnswerClient() {
  const { qnaData } = useQnaDetail()

  if (!qnaData) {
    return <div>문의사항을 찾을 수 없습니다.</div>
  }

  return (
    <div className="absolute w-[1280px] h-[720px] mt-40 bg-white justify-between">
      <div className="w-[787px] h-[648px] mt-461 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="ml-22 mt-11">
          <div className="w-251 h-39">
            <span className="text-32 leading-39">문의사항 답변 작성</span>
          </div>
          <div className="mt-6 w-[746px] h-213 rounded-20 shadow-md border-[rgba(0,0,0,0.08)] border-1 border-solid box-border overflow-hidden">
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
          <div className="mt-6 w-[746px] h-324 rounded-20 shadow-md border-[rgba(0,0,0,0.08)] border-1 border-solid box-border overflow-hidden">
            <DynamicBlockNoteEditor />
          </div>
        </div>
        <div className="flex ml-[556px] mt-8 w-211 h-31">
          <button
            className="w-98 h-30 padding-3 rounded-16 border-1 text-15 leading-24 text-center border-[#ffc044] text-[#ffab2d]"
            type="button"
          >
            작성취소
          </button>
          <button
            className="ml-15 w-98 h-30 padding-3 rounded-16 text-15 leading-24 text-center shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff]"
            type="button"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
