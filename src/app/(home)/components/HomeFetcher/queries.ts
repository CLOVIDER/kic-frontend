'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getHomeData } from './api'

export const useHomePage = () =>
  useSuspenseQuery({
    queryKey: ['landing-page'],
    queryFn: () => getHomeData(),
    refetchOnMount: false,
    select: (data) => {
      const { result } = data
      let periodStart = null
      let periodEnd = null

      switch (result.recruitStatus) {
        case '모집예정':
        case '모집기간':
          periodStart = result.recruitStartDt
          periodEnd = result.recruitEndDt
          break
        case '1차등록기간':
          periodStart = result.firstStartDt
          periodEnd = result.firstEndDt
          break
        case '2차등록기간':
          periodStart = result.secondStartDt
          periodEnd = result.secondEndDt
          break
        default:
          break
      }

      return { ...result, periodStart, periodEnd }
    },
  })
