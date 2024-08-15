'use client'

import ChildResultCard from '.'
import { useChildResultContext } from '../HistoryFetcher'
import { ChildLotteryResponse } from '../HistoryFetcher/api'

export default function ChildResultCards() {
  const { childResult } = useChildResultContext()

  return (
    <>
      {childResult.map(
        ({ childName, lotteryResults }: ChildLotteryResponse) => (
          <ChildResultCard
            key={childName}
            name={childName}
            lotteryResults={lotteryResults}
          />
        ),
      )}
    </>
  )
}
