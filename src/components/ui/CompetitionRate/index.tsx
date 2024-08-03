'use client'

import { cn } from '@/util'
import { ProgressBar } from '@/components/common'
import { useHomePage } from '@/app/(home)/components/api/queries'

export default function CompetitionRate({ className }: { className?: string }) {
  const { data } = useHomePage()

  if (!data || !data.kindergartenClassList || !data.rateList) return <></>

  const { kindergartenClassList, rateList } = data

  return (
    <div
      className={cn(
        'bg-white w-450 px-30 pt-15 pb-30 rounded-32 shadow-md',
        className,
      )}
    >
      <div className="text-red-500 font-bold mb-4 flex items-center text-[#EA7465]">
        <span className="mr-4">▼ </span> 실시간 경쟁률
      </div>
      <div className="ml-20 mt-10">
        {kindergartenClassList!.map(
          (kindergartenClass: string, index: number) => (
            <ProgressBar
              key={kindergartenClass}
              label={kindergartenClass}
              value={Number(rateList![index])}
              bar={index % 2 === 0 ? 'bg-[#34C759]' : 'bg-[#FD5353]'}
            />
          ),
        )}
      </div>
    </div>
  )
}
