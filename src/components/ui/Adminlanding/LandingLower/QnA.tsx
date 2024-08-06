'use client'

import { Plus } from '@/components/common'
import { useAdminQnAContext } from '@/app/(admin)/components/adminFetcher/adminContext'
import NumberDisplay from '../NumberDisplay'

export default function QnA() {
  const { num = 0 } = useAdminQnAContext()

  return (
    <div className="flex flex-row bg-white rounded-20 py-20 gap-30 justify-center w-300 border shadow-md border-[#F2F2F2]">
      <p className="text-[#ea7465] text-30 font-bold">QnA</p>
      <div className="mt-8">
        <NumberDisplay title="답변대기" number={num} />
      </div>
      <div className="bg-[#FFC5BD] h-30 w-30 p-10 shadow-sm rounded-2 flex items-center justify-center mt-6">
        <Plus width={10} />
      </div>
    </div>
  )
}
