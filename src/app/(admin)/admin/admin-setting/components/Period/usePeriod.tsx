'use client'

import { useState } from 'react'
import { useSettingContext } from '../SettingFetcher/SettingContext'
import { RecruitDateInfo } from '../SettingFetcher/type'

export type PeriodState = {
  startDate: Date | null
  endDate: Date | null
}

export type UsePeriodReturn = {
  recruitmentPeriod: PeriodState
  firstRegistrationPeriod: PeriodState
  secondRegistrationPeriod: PeriodState
  setRecruitmentPeriod: (startDate: Date | null, endDate: Date | null) => void
  setFirstRegistrationPeriod: (
    startDate: Date | null,
    endDate: Date | null,
  ) => void
  setSecondRegistrationPeriod: (
    startDate: Date | null,
    endDate: Date | null,
  ) => void
}

const getEndKey = (periodType: keyof RecruitDateInfo) => {
  switch (periodType) {
    case 'recruitStartDt':
      return 'recruitEndDt'
    case 'firstStartDt':
      return 'firstEndDt'
    case 'secondStartDt':
      return 'secondEndDt'
    default:
      return ''
  }
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

  const setRecruitmentPeriod = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setRecruitmentPeriodState({ startDate, endDate })
    updateSettingData('recruitStartDt', startDate, endDate)
  }

  const setFirstRegistrationPeriod = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setFirstRegistrationPeriodState({ startDate, endDate })
    updateSettingData('firstStartDt', startDate, endDate)
  }

  const setSecondRegistrationPeriod = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setSecondRegistrationPeriodState({ startDate, endDate })
    updateSettingData('secondStartDt', startDate, endDate)
  }

  return {
    recruitmentPeriod,
    firstRegistrationPeriod,
    secondRegistrationPeriod,
    setRecruitmentPeriod,
    setFirstRegistrationPeriod,
    setSecondRegistrationPeriod,
  }
}
