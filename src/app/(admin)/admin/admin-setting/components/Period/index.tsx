'use client'

import { DateRangePicker } from '@/components'
import Title from '../Title'
import { usePeriod } from './usePeriod'

export default function Period() {
  const {
    recruitmentPeriod,
    firstRegistrationPeriod,
    secondRegistrationPeriod,
    setRecruitmentPeriod,
    setFirstRegistrationPeriod,
    setSecondRegistrationPeriod,
  } = usePeriod()

  return (
    <section>
      <Title
        title="모집 기간"
        subtitle="설정된 기간에 따라 자동으로 모집이 진행됩니다."
      />
      <DateRangePicker
        startDate={recruitmentPeriod.startDate}
        endDate={recruitmentPeriod.endDate}
        onChange={(startDate, endDate) =>
          setRecruitmentPeriod(startDate, endDate)
        }
        showTimeSelect
      />

      <Title title="1차 등록 기간" className="mt-40" />
      <DateRangePicker
        startDate={firstRegistrationPeriod.startDate}
        endDate={firstRegistrationPeriod.endDate}
        onChange={(startDate, endDate) =>
          setFirstRegistrationPeriod(startDate, endDate)
        }
        showTimeSelect
      />

      <Title title="2차 등록 기간" className="mt-40" />
      <DateRangePicker
        startDate={secondRegistrationPeriod.startDate}
        endDate={secondRegistrationPeriod.endDate}
        onChange={(startDate, endDate) =>
          setSecondRegistrationPeriod(startDate, endDate)
        }
        showTimeSelect
      />
    </section>
  )
}
