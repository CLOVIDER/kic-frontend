import { ProgressBar } from '@/components/common'
import { cn } from '@/util'

export default function CompetitionRate({ className }: { className?: string }) {
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
        <ProgressBar label="새빛 어린이집" value={4.1} bar="bg-[#34C759]" />
        <ProgressBar label="햇빛 어린이집" value={5.6} bar="bg-[#FD5353]" />
      </div>
    </div>
  )
}
