import { useState } from 'react'

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

export const usePeriod = (): UsePeriodReturn => {
  const [recruitmentPeriod, setRecruitmentPeriodState] = useState<PeriodState>({
    startDate: new Date(),
    endDate: new Date(),
  })
  const [firstRegistrationPeriod, setFirstRegistrationPeriodState] =
    useState<PeriodState>({
      startDate: new Date(),
      endDate: new Date(),
    })
  const [secondRegistrationPeriod, setSecondRegistrationPeriodState] =
    useState<PeriodState>({
      startDate: new Date(),
      endDate: new Date(),
    })

  const setRecruitmentPeriod = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setRecruitmentPeriodState({ startDate, endDate })
  }

  const setFirstRegistrationPeriod = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setFirstRegistrationPeriodState({ startDate, endDate })
  }

  const setSecondRegistrationPeriod = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setSecondRegistrationPeriodState({ startDate, endDate })
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
