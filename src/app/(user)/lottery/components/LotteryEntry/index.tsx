import Image from 'next/image'
import LotteryProcessing from './LotteryProcessing'
import LotteryPending from './LotteryPending'
import LotteryResult from './LotteryResult'
import { useRecruitStatusContext } from '../../fetcher/RecruitStatusFetcher'

export default function LotteryEntry() {
  const { recruitStatus } = useRecruitStatusContext()

  return (
    <section className="flex">
      <Image
        className="relative"
        src="/images/lottery.svg"
        alt="lottery"
        width={452}
        height={452}
      />

      {recruitStatus === '모집없음' && <LotteryPending />}
      {recruitStatus === '모집기간' && <LotteryProcessing />}
      {(recruitStatus === '1차등록기간' || recruitStatus === '2차등록기간') && (
        <LotteryResult />
      )}
    </section>
  )
}
