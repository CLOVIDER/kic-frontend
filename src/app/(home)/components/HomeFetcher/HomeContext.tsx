'use client'

import { generateContext } from '@/react-utils'
import { HomeResponse } from './type'

export const [HomeProvider, useHomeContext] = generateContext<HomeResponse>({
  name: 'landing-context',
})
