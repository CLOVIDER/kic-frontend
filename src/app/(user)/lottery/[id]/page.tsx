'use client'

import { LotteryPercentFetcher } from '../fetcher/LotteryPercentFetcher'
import { useRecruitStatusContext } from '../fetcher/RecruitStatusFetcher'
import { useLotteryDetailContext } from '../fetcher/ResultFetcher'
import ResultFail from './ResultEntry/ResultFail'
import ResultProcessing from './ResultEntry/ResultProcessing'
import ResultWaiting from './ResultEntry/ResultWaiting'
import ResultWinning from './ResultEntry/ResultWinning'

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { recruitStatus } = useRecruitStatusContext()
  const { result } = useLotteryDetailContext()

  if (recruitStatus === '모집기간') {
    return (
      <LotteryPercentFetcher id={id}>
        <ResultProcessing />
      </LotteryPercentFetcher>
    )
  }

  if (recruitStatus === '1차등록기간' || recruitStatus === '2차등록기간') {
    if (result === 'WIN') {
      return <ResultWinning id={Number(id)} />
    }
    return result === 'LOSE' ? (
      <ResultFail />
    ) : (
      <ResultWaiting id={Number(id)} />
    )
  }

  return <div>현재는 모집 결과 확인 기간이 아니에요...</div>
}
