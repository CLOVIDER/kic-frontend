'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getHomeData } from './api'

export const useHomePage = () =>
  useSuspenseQuery({
    queryKey: ['landng-page'],
    queryFn: () => getHomeData(),
    refetchOnMount: false,
    select: (data) => data.result,
  })
