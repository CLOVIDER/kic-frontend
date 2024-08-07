'use client'

import { useAdminKinderStatusContext } from '@/app/(admin)/components/adminFetcher/adminContext'
import KindergartenChart from './KindergartenChart'

export default function Chart() {
  const { kindergartens } = useAdminKinderStatusContext()

  return (
    <div className="flex flex-col bg-white w-370 px-30 pt-15 pb-30 rounded-32 shadow-md">
      <div className="text-red-500 font-bold mb-4 flex items-center text-[#EA7465]">
        <span className="mr-4">▼ </span> 신청 현황
      </div>
      <div className="flex gap-20">
        {kindergartens.map((data, index) => (
          <KindergartenChart
            key={data.kindergartenNm}
            {...data}
            showLegend={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
