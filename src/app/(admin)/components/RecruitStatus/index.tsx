'use client'

import { NumberDisplay } from '@/components'
import { useAdminContext } from '../adminFetcher/adminContext'

export default function RecruitStatus() {
  const {
    recruitStatus: { totalApplications, unAcceptApplications },
  } = useAdminContext()
  return (
    <div className="flex flex-row bg-white w-450 px-50 pt-15 pb-30 rounded-32 shadow-md gap-50">
      <NumberDisplay title="총 신청자" number={totalApplications} />
      <NumberDisplay title="승인 대기" number={unAcceptApplications} />
    </div>
  )
}
