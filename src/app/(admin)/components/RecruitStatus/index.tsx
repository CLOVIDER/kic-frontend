'use client'

import { NumberDisplay } from '@/components'
import { useAdminRecuritContext } from '../adminFetcher/adminContext'

export default function RecruitStatus() {
  const { totalApplications, unAcceptApplications } = useAdminRecuritContext()

  return (
    <div className="flex flex-row bg-white w-400 px-50 pt-15 pb-30 rounded-32 shadow-md gap-80">
      <NumberDisplay title="총 신청자" number={totalApplications} />
      <NumberDisplay title="승인 대기" number={unAcceptApplications} />
    </div>
  )
}
