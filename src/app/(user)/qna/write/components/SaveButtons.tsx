import React from 'react'

interface SaveButtonsProps {
  handleSave: () => void
  moveBack: () => void
}

export default function SaveButtons({
  handleSave,
  moveBack,
}: SaveButtonsProps) {
  return (
    <div className="flex mt-8 ml-[556px] w-[211px] h-[31px]">
      <button
        aria-label="작성 취소"
        className="w-[98px] h-[31px] bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
        onClick={moveBack}
        type="button"
      >
        작성취소
      </button>
      <button
        aria-label="저장"
        className="ml-20 w-[98px] h-[31px] shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
        onClick={handleSave}
        type="button"
      >
        저장
      </button>
    </div>
  )
}
