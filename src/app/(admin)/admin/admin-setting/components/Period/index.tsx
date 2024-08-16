'use client'

import { usePeriod } from './usePeriod'
import { DateTimePicker } from './DateTimePicker'
import Title from '../Title'

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
    <section className="space-y-70 mb-30">
      <Title
        className="border-b-1 border-[#ccc2c2]"
        title="모집 / 등록 기간"
        subtitle=" 설정한 기간에 따라 모집이 자동으로 진행돼요."
      />
      <div className="grid grid-cols-[1fr,2fr,2fr] gap-y-70 items-center w-[750px] ml-30">
        <p className="text-25 font-medium text-end text-[#593c3c]">모집 기간</p>
        <div className="flex flex-col gap-10 items-end">
          <DateTimePicker
            value={recruitmentPeriod.startDate!}
            onChange={(startDate) => setRecruitmentPeriod(startDate!, 'start')}
            hourCycle={12}
          />
        </div>
        <div className="flex flex-col gap-10 items-end">
          <DateTimePicker
            value={recruitmentPeriod.endDate!}
            onChange={(date) => setRecruitmentPeriod(date!, 'end')}
            minDate={recruitmentPeriod.startDate || undefined}
            maxDate={firstRegistrationPeriod.startDate || undefined}
            hourCycle={12}
          />
        </div>

        <p className="text-25 font-medium text-end text-[#593c3c]">
          1차 등록 기간
        </p>
        <div className="flex flex-col gap-10 items-end">
          <DateTimePicker
            value={firstRegistrationPeriod.startDate!}
            onChange={(date) => setFirstRegistrationPeriod(date!, 'start')}
            minDate={recruitmentPeriod.endDate || undefined}
            maxDate={firstRegistrationPeriod.endDate || undefined}
            hourCycle={12}
          />
        </div>
        <div className="flex flex-col gap-10 items-end">
          <DateTimePicker
            value={firstRegistrationPeriod.endDate!}
            onChange={(date) => setFirstRegistrationPeriod(date!, 'end')}
            minDate={firstRegistrationPeriod.startDate || undefined}
            maxDate={secondRegistrationPeriod.startDate || undefined}
            hourCycle={12}
          />
        </div>

        <p className="text-25 font-medium text-end text-[#593c3c]">
          2차 등록 기간
        </p>
        <div className="flex flex-col gap-10 items-end">
          <DateTimePicker
            value={secondRegistrationPeriod.startDate!}
            minDate={firstRegistrationPeriod.endDate || undefined}
            maxDate={secondRegistrationPeriod.endDate || undefined}
            onChange={(date) => setSecondRegistrationPeriod(date!, 'start')}
            hourCycle={12}
          />
        </div>
        <div className="flex flex-col gap-10 items-end">
          <DateTimePicker
            value={secondRegistrationPeriod.endDate!}
            minDate={secondRegistrationPeriod.startDate || undefined}
            onChange={(date) => setSecondRegistrationPeriod(date!, 'end')}
            hourCycle={12}
          />
        </div>
      </div>
    </section>
  )
}
