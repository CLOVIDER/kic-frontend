'use client'

import { ReactNode } from 'react'
import { cn } from '@/util'
import { useStatusBox } from './useStatusBox'

export default function StatusBox({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const { currentStatus, currentPeriod, dDay } = useStatusBox()
  return (
    <div
      className={cn(
        'w-[664px] h-295 rounded-32 bg-gradient-01 px-50 flex flex-col justify-center gap-20',
        className,
      )}
    >
      <div className="flex flex-row items-center gap-20 h-80">
        <span className="font-sans font-semibold text-80">D-{dDay}</span>
        <div className="flex flex-col leading-35 pt-10">
          <div className="text-35 font-medium">{currentStatus}</div>
          <div className="text-20">
            {currentPeriod.start} ~ {currentPeriod.end}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
