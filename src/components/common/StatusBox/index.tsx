'use client'

import { ReactNode } from 'react'
import { cn } from '@/util'
import { useHomePage } from '@/app/(home)/components/api/queries'
import { useHomePage } from '@/app/(home)/components/api/queries'

export default function StatusBox({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const {
    data: { periodStart, periodEnd, recruitStatus, remainPeriod },
  } = useHomePage()

  const splitDateTime = (dateTime: string) => {
    const date = dateTime.slice(0, dateTime.lastIndexOf('.'))
    const time = dateTime.slice(dateTime.lastIndexOf('.') + 1)
    return { date, time }
  }

  const { date: startDate, time: startTime } = periodStart
    ? splitDateTime(periodStart)
    : { date: 'N/A', time: 'N/A' }
  const { date: endDate, time: endTime } = periodEnd
    ? splitDateTime(periodEnd)
    : { date: 'N/A', time: 'N/A' }

  const {
    data: { periodStart, periodEnd, recruitStatus, remainPeriod },
  } = useHomePage()

  const splitDateTime = (dateTime: string) => {
    const date = dateTime.slice(0, dateTime.lastIndexOf('.'))
    const time = dateTime.slice(dateTime.lastIndexOf('.') + 1)
    return { date, time }
  }

  const { date: startDate, time: startTime } = periodStart
    ? splitDateTime(periodStart)
    : { date: 'N/A', time: 'N/A' }
  const { date: endDate, time: endTime } = periodEnd
    ? splitDateTime(periodEnd)
    : { date: 'N/A', time: 'N/A' }

  return (
    <div
      className={cn(
        'w-[664px] h-295 rounded-32 bg-gradient-01 px-50 flex flex-col pt-10 font-sans shadow-sm',
        className,
      )}
    >
      {recruitStatus === '모집없음' ? (
        <div className="flex flex-row gap-20 h-80">
          <div className="text-35 font-medium">
            현재 진행중인 공고가 없습니다.
          </div>
        </div>
      ) : (
        <div className="flex flex-col relative pb-10 mb-10">
          <p className="flex flex-row items-center font-semibold text-80 gap-10">
            <span>D-{remainPeriod}</span>
            <span className="text-50 font-medium">{recruitStatus}</span>
          </p>
          <div className="text-20 absolute bottom-0 ml-5">
            {startDate} {startTime}시 ~ {endDate} {endTime}시
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
