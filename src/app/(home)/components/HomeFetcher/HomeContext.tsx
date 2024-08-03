'use client'

import { generateContext } from '@/react-utils'
import { HomeResponse } from './type'

interface HomeContextValue extends HomeResponse {
  periodStart: string | null
  periodEnd: string | null
}

export const [HomeProvider, useHomeContext] = generateContext<HomeContextValue>(
  {
    name: 'landing-context',
  },
)
