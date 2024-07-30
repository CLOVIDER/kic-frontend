import { useState, useEffect } from 'react'

interface Period {
  start: string
  end: string
}

interface ApiResponse {
  status: '모집중' | '1차등록' | '2차등록' | '마감'
  recruitmentPeriod: Period
  firstRegistrationPeriod: Period
  secondRegistrationPeriod: Period
}

const dummyApiResponse: ApiResponse = {
  status: '모집중',
  recruitmentPeriod: {
    start: '2024-08-01',
    end: '2024-08-05',
  },
  firstRegistrationPeriod: {
    start: '2024-08-10',
    end: '2024-08-15',
  },
  secondRegistrationPeriod: {
    start: '2024-08-20',
    end: '2024-08-25',
  },
}

export function useStatusBox() {
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [currentPeriod, setCurrentPeriod] = useState<Period>({
    start: '',
    end: '',
  })
  const [dDay, setDDay] = useState<number>(0)

  useEffect(() => {
    const {
      status,
      recruitmentPeriod,
      firstRegistrationPeriod,
      secondRegistrationPeriod,
    } = dummyApiResponse

    const today = new Date()

    const calculateDDay = (start: Date): number => {
      return Math.ceil(
        (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      )
    }

    const setStatusAndPeriod = (newStatus: string, period: Period) => {
      setCurrentStatus(newStatus)
      setCurrentPeriod(period)
      setDDay(calculateDDay(new Date(period.start)))
    }

    switch (status) {
      case '모집중':
        setStatusAndPeriod(status, recruitmentPeriod)
        break
      case '1차등록':
        setStatusAndPeriod(status, firstRegistrationPeriod)
        break
      case '2차등록':
        setStatusAndPeriod(status, secondRegistrationPeriod)
        break
      case '마감':
        setCurrentStatus(status)
        setCurrentPeriod(secondRegistrationPeriod)
        setDDay(0)
        break
      default:
        break
    }
  }, [])

  return { currentStatus, currentPeriod, dDay }
}
