'use client'

import { Plus } from '@/components/common'
import { useQnA } from '@/app/(admin)/components/adminFetcher/queries'
import NumberDisplay from '../NumberDisplay'

export default function QnA() {
  const { data } = useQnA()

  return (
    <div className="flex flex-row bg-white rounded-20 py-20 shadow-md gap-30 justify-center w-300">
      <p className="text-[#ea7465] text-30 font-bold">QnA</p>
      <div className="mt-8">
        <NumberDisplay title="답변대기" number={data} />
      </div>
      <div className="bg-[#FFC5BD] h-30 w-30 p-10 shadow-sm rounded-2 flex items-center justify-center mt-6">
        <Plus width={10} />
      </div>
    </div>
  )
}
