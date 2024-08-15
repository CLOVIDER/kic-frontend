'use client'

import ChildResultCard from '.'
import { useChildResultContext } from '../HistoryFetcher'
import { ChildLottery } from '../HistoryFetcher/api'

export default function ChildResultCards() {
  const { childResult } = useChildResultContext()

  return (
    <>
      {childResult?.map(({ childName, lotteryResults }: ChildLottery) => (
        <ChildResultCard
          key={childName}
          name={childName}
          lotteryResults={lotteryResults}
        />
      ))}
    </>
  )
}
