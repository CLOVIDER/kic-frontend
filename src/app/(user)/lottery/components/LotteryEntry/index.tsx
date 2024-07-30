import Image from 'next/image'
import LotteryProcessing from './LotteryProcessing'
// import LotteryPending from './LotteryPending'
// import LotteryResult from './LotteryResult'
// import LotteryEnd from './LotteryEnd'

const currentProcesses = ['pending', 'processing', 'result', 'end'] as const

export default function LotteryEntry() {
  const currentProess = currentProcesses[1]

  return (
    <section className="flex">
      <Image
        className="relative"
        src="/images/lottery.svg"
        alt="lottery"
        width={452}
        height={452}
      />

      {/* TODO: setStep 구현 */}
      {/* TODO: 추후 리팩토링 */}
      {/* {currentProess === 'pending' && <LotteryPending />} */}
      {currentProess === 'processing' && <LotteryProcessing />}
      {/* {currentProess === 'result' && <LotteryResult />} */}
      {/* {currentProess === 'end' && <LotteryEnd />} */}
    </section>
  )
}
