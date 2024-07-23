'use client'

import { useFunnel } from '@/components/common'
import LotteryEntry from './components/LotteryEntry'

export default function Page() {
  const Funnel = useFunnel(['entry', 'result'] as const, {
    initialStep: 'entry',
  })

  return (
    <Funnel>
      <Funnel.Step name="entry">
        <LotteryEntry />
      </Funnel.Step>

      <Funnel.Step name="result">result</Funnel.Step>
    </Funnel>
  )
}
