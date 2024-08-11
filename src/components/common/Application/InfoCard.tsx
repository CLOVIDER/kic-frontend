'use client'

import { useEmployeeContext } from './ApplicationContext/fetcher'

export default function InfoCard() {
  const { accountId, employeeNo, workedAt, isCouple } = useEmployeeContext()

  return (
    <div className="border border-orange rounded-20 p-10 bg-white text-15 w-420 items-center justify-center">
      <div className="grid grid-cols-4 gap-y-2 gap-x-7">
        <div className="text-right font-bold text-[#F90]">메일</div>
        <div className="text-left">{accountId}</div>

        <div className="text-right font-bold text-[#F90]">사내부부</div>
        <div className="text-left">{isCouple ? 'O' : 'X'}</div>

        <div className="text-right font-bold text-[#F90]">사원번호</div>
        <div className="text-left">{employeeNo}</div>

        <div className="text-right font-bold text-[#F90]">입사일</div>
        <div className="text-left">{workedAt}</div>
      </div>
    </div>
  )
}
