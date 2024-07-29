'use client'

import { ReactNode } from 'react'
import { useStatusBox } from './useStatusBox'

export default function StatusBox({ children }: { children: ReactNode }) {
  const { currentStatus, currentPeriod, dDay } = useStatusBox()
  return (
    <div className="w-[664px] h-295 rounded-32 bg-gradient-01 px-50 flex flex-col">
      <div className="flex flex-row items-center gap-20">
        <p className="font-sans font-bold text-90">D-{dDay}</p>
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
