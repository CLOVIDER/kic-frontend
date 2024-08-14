'use client'

import { useState } from 'react'
import { useSettingContext } from '../SettingFetcher/SettingContext'
import { RecruitDateInfo } from '../SettingFetcher/type'

export type PeriodState = {
  startDate: Date | null
  endDate: Date | null
}

const getEndKey = (
  periodType: keyof RecruitDateInfo,
): keyof RecruitDateInfo => {
  switch (periodType) {
    case 'recruitStartDt':
      return 'recruitEndDt'
    case 'firstStartDt':
      return 'firstEndDt'
    case 'secondStartDt':
      return 'secondEndDt'
    default:
      throw new Error('Invalid periodType')
  }
}
export type UsePeriodReturn = {
  recruitmentPeriod: PeriodState
  firstRegistrationPeriod: PeriodState
  secondRegistrationPeriod: PeriodState
  setRecruitmentPeriod: (date: Date | null, type: 'start' | 'end') => void
  setFirstRegistrationPeriod: (date: Date | null, type: 'start' | 'end') => void
  setSecondRegistrationPeriod: (
    date: Date | null,
    type: 'start' | 'end',
  ) => void
}

export const usePeriod = (): UsePeriodReturn => {
  const {
    settingData: { recruitDateAndWeightInfo },
    setSettingData,
  } = useSettingContext()

  const { recruitDateInfo } = recruitDateAndWeightInfo

  const parseDate = (dateString: string) =>
    dateString ? new Date(dateString) : null

  const initialRecruitmentPeriod = {
    startDate: parseDate(recruitDateInfo.recruitStartDt),
    endDate: parseDate(recruitDateInfo.recruitEndDt),
  }

  const initialFirstRegistrationPeriod = {
    startDate: parseDate(recruitDateInfo.firstStartDt),
    endDate: parseDate(recruitDateInfo.firstEndDt),
  }

  const initialSecondRegistrationPeriod = {
    startDate: parseDate(recruitDateInfo.secondStartDt),
    endDate: parseDate(recruitDateInfo.secondEndDt),
  }

  const [recruitmentPeriod, setRecruitmentPeriodState] = useState<PeriodState>(
    initialRecruitmentPeriod,
  )
  const [firstRegistrationPeriod, setFirstRegistrationPeriodState] =
    useState<PeriodState>(initialFirstRegistrationPeriod)
  const [secondRegistrationPeriod, setSecondRegistrationPeriodState] =
    useState<PeriodState>(initialSecondRegistrationPeriod)

  const updateSettingData = (
    periodType: keyof RecruitDateInfo,
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setSettingData((prevData) => {
      const newRecruitDateInfo = {
        ...prevData.recruitDateAndWeightInfo.recruitDateInfo,
        [periodType]: startDate ? startDate.toISOString() : '',
        [getEndKey(periodType)]: endDate ? endDate.toISOString() : '',
      }

      return {
        ...prevData,
        recruitDateAndWeightInfo: {
          ...prevData.recruitDateAndWeightInfo,
          recruitDateInfo: newRecruitDateInfo,
        },
      }
    })
  }

  const setPeriod = (
    type: 'recruitment' | 'firstRegistration' | 'secondRegistration',
    date: Date | null,
    dateType: 'start' | 'end',
  ) => {
    if (type === 'recruitment') {
      const newPeriod = {
        ...recruitmentPeriod,
        [dateType === 'start' ? 'startDate' : 'endDate']: date,
      }
      setRecruitmentPeriodState(newPeriod)
      updateSettingData(
        dateType === 'start' ? 'recruitStartDt' : getEndKey('recruitStartDt'),
        newPeriod.startDate,
        newPeriod.endDate,
      )
    } else if (type === 'firstRegistration') {
      const newPeriod = {
        ...firstRegistrationPeriod,
        [dateType === 'start' ? 'startDate' : 'endDate']: date,
      }
      setFirstRegistrationPeriodState(newPeriod)
      updateSettingData(
        dateType === 'start' ? 'firstStartDt' : getEndKey('firstStartDt'),
        newPeriod.startDate,
        newPeriod.endDate,
      )
    } else if (type === 'secondRegistration') {
      const newPeriod = {
        ...secondRegistrationPeriod,
        [dateType === 'start' ? 'startDate' : 'endDate']: date,
      }
      setSecondRegistrationPeriodState(newPeriod)
      updateSettingData(
        dateType === 'start' ? 'secondStartDt' : getEndKey('secondStartDt'),
        newPeriod.startDate,
        newPeriod.endDate,
      )
    }
  }

  return {
    recruitmentPeriod,
    firstRegistrationPeriod,
    secondRegistrationPeriod,
    setRecruitmentPeriod: (date, type) => setPeriod('recruitment', date, type),
    setFirstRegistrationPeriod: (date, type) =>
      setPeriod('firstRegistration', date, type),
    setSecondRegistrationPeriod: (date, type) =>
      setPeriod('secondRegistration', date, type),
  }
}
