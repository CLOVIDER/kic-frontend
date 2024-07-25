'use client'

import { useFunnel } from '@/components/common'
import LotteryEntry from './components/LotteryEntry'
import ResultEntry from './components/ResultEntry'

export default function Page() {
  const Funnel = useFunnel(['entry', 'result'] as const, {
    stepQueryKey: 'winning',
    initialStep: 'entry',
  })

  return (
    <Funnel>
      <Funnel.Step name="entry">
        <LotteryEntry />
      </Funnel.Step>

      <Funnel.Step name="result">
        <ResultEntry />
      </Funnel.Step>
    </Funnel>
  )
}
