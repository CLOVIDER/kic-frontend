'use client'

import { ReactNode } from 'react'
import { cn } from '@/util'
import { useHomeContext } from '@/app/(home)/components/HomeFetcher/HomeContext'

export default function StatusBox({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const { periodStart, periodEnd, recruitStatus, remainPeriod } =
    useHomeContext()

  return (
    <div
      className={cn(
        'w-[664px] h-295 rounded-32 bg-gradient-01 px-50 flex flex-col justify-center gap-20',
        className,
      )}
    >
      {recruitStatus === '모집없음' ? (
        <div className="flex flex-row items-center gap-20 h-80">
          <div className="text-35 font-medium">
            현재 진행중인 공고가 없습니다.
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-20 h-80">
          <span className="font-sans font-semibold text-80">
            D-{remainPeriod}
          </span>
          <div className="flex flex-col leading-35 pt-10">
            <div className="text-35 font-medium">{recruitStatus}</div>
            <div className="text-20">
              {periodStart} ~ {periodEnd}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
