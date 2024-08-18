'use client'

import ChildResultCard from '.'
import { useChildResultContext } from '../HistoryFetcher'
import { ChildLottery } from '../HistoryFetcher/api'

export default function ChildResultCards() {
  const { childResult } = useChildResultContext()

  return (
    <>
      {childResult && childResult.length > 0 ? (
        childResult.map(({ childName, lotteryResults }: ChildLottery) => (
          <ChildResultCard
            key={childName}
            name={childName}
            lotteryResults={lotteryResults}
          />
        ))
      ) : (
        <p>신청 내역이 없습니다.</p>
      )}
    </>
  )
}
