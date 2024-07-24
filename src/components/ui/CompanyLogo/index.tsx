'use client'

import { useEffect } from 'react'

export default function CompanyLogo() {
  // TODO: api 연결 : companyName, 모집 현황 데이터 페치
  const companyName = 'DK techin'

  useEffect(() => {
    function adjustLetterSpacing() {
      const companyNameElement = document.getElementById('companyName')
      const descriptionElement = document.getElementById('description')!

      if (companyNameElement) {
        const companyNameStyles = window.getComputedStyle(companyNameElement)

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) return

        context.font = `${companyNameStyles.fontWeight} ${companyNameStyles.fontSize} ${companyNameStyles.fontFamily}`
        const companyNameWidth = context.measureText(
          companyNameElement.textContent || '',
        ).width

        const letterSpacing = (companyNameWidth - 120) / 11
        descriptionElement.style.letterSpacing = `${letterSpacing}px`
      }
    }
    adjustLetterSpacing()
  }, [])

  return (
    <div className="relative">
      <div className="w-180 h-100 absolute left-40 top-0 bg-[#fbe268] rounded-full blur-[100px]" />
      <div className="w-238 h-150 absolute left-241 top-0 bg-[#fff3d6] rounded-full blur-[100px]" />
      <div className="ml-120 mt-100">
        <div
          id="companyName"
          className="text-[#6C5757] font-mono text-40 font-semibold tracking-widest drop-shadow-md"
        >
          {companyName}. KIC
        </div>
        <p id="description" className="px-5 text-18 text-[#6C5757]">
          아이와 함께하는 출근길
        </p>
      </div>
    </div>
  )
}
