'use client'

import LetterSpacingAdjuster from './LetterSpacingAdjuster'

export default function CompanyLogo() {
  // TODO: companyName 데이터페치
  const companyName = 'DK techin'
  const descriptionText = '아이와 함께하는 출근길'
  const descriptionId = 'description'
  const companyNameId = 'companyName'

  return (
    <LetterSpacingAdjuster
      companyName={companyName}
      descriptionId={descriptionId}
      companyNameId={companyNameId}
    >
      <div className="relative">
        <div className="w-300 h-80 absolute left-0 top-10 bg-[#f7e486] opacity-50 rounded-full blur-[60px]" />
        <div className="w-238 h-150 absolute left-200 top-0 bg-[#fff3d6] rounded-full blur-[100px]" />
        <div className="ml-120 mt-100">
          <div
            id={companyNameId}
            className="text-[#6C5757] font-mono text-[40px] font-semibold tracking-widest drop-shadow-md"
          >
            {companyName}. KIC
          </div>
          <p id={descriptionId} className="px-5 text-[18px] text-[#6C5757]">
            {descriptionText}
          </p>
        </div>
      </div>
    </LetterSpacingAdjuster>
  )
}
