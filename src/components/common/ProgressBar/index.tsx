/* eslint-disable react/require-default-props */
import { cn } from '@/util'

interface ProgressBarProps {
  label: string
  value: number
  bar?: string
}

export default function ProgressBar({ label, value, bar }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-10 h-20">
      <div className="whitespace-nowrap text-13 text-[#6D6C6C] font-semibold">
        {label}
      </div>
      <div className="flex items-center w-full mt-2">
        <div
          className={cn(`h-15 rounded-r-full bg-[#000000]`, bar)}
          style={{ width: `${(value / 10) * 100}%` }}
        />
        <span className="ml-4 font-['Cairo'] font-bold text-[#6d6c6c] text-20">
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  )
}
