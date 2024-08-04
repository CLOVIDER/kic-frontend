'use client'

import { useKindergartenStatus } from '@/app/(admin)/components/adminFetcher/queries'
import KindergartenChart from './KindergartenChart'

export default function Chart() {
  const { data: kindergartenStatus } = useKindergartenStatus()

  return (
    <div className="flex flex-col bg-white w-370 px-30 pt-15 pb-30 rounded-32 shadow-md">
      <div className="text-red-500 font-bold mb-4 flex items-center text-[#EA7465]">
        <span className="mr-4">▼ </span> 신청 현황
      </div>
      <div className="flex gap-20">
        {kindergartenStatus.map((status, index) => (
          <KindergartenChart
            key={status.kindergartenNm}
            {...status}
            showLegend={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
