'use client'

import { generateContext } from '@/react-utils'
import { NonEmptyArray } from '@/type'

export interface SetStepOptions {
  stepChangeType?: 'push' | 'replace'
  preserveQuery?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: Record<string, any>
}

export const [FunnelProvider, useFunnelContext] = generateContext<{
  setStep: <Steps extends NonEmptyArray<string>>(
    step: Steps[number],
    setStepOptions?: SetStepOptions,
  ) => void
}>({
  name: 'funnel',
  defaultContextValue: { setStep: () => {} },
})
