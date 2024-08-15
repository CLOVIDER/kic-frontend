'use client'

import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import { ChildLotteryResponse, HistoryResponse } from './api'
import { useChildResult, useHistory } from './queries'

export const [ChildResultProvider, useChildResultContext] = generateContext<{
  childResult: ChildLotteryResponse
}>({
  name: 'child-result-context',
})

export function ChildResultFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useChildResult()

  return (
    <ChildResultProvider childResult={data}>{children}</ChildResultProvider>
  )
}

export const [HistoryProvider, useHistoryContext] = generateContext<{
  history: HistoryResponse
}>({
  name: 'history-context',
})

export function HistoryFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useHistory()

  return <HistoryProvider history={data}>{children}</HistoryProvider>
}
