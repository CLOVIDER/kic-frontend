'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getSettingData } from './api'

export const useSettingData = () =>
  useSuspenseQuery({
    queryKey: ['recuit-setting'],
    queryFn: getSettingData,
    refetchOnMount: false,
    select: (data) => data.result,
  })
