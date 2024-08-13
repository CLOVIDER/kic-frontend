'use client'

import { useFunnel } from '@/components/common'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { RecruitStatusFetcher } from '@/app/(user)/lottery/fetcher/RecruitStatusFetcher'
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
        <AsyncBoundaryWithQuery>
          <RecruitStatusFetcher>
            <LotteryEntry />
          </RecruitStatusFetcher>
        </AsyncBoundaryWithQuery>
      </Funnel.Step>

      <Funnel.Step name="result">
        <ResultEntry />
      </Funnel.Step>
    </Funnel>
  )
}
