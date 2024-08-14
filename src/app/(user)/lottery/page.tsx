'use client'

import Image from 'next/image'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { motion } from 'framer-motion'
import LotteryProcessing from './components/LotteryEntry/LotteryProcessing'
import LotteryResult from './components/LotteryEntry/LotteryResult'
import { ChildrenFetcher } from './fetcher/ChildrenFetcher'
import { useRecruitStatusContext } from './fetcher/RecruitStatusFetcher'
// import LotteryPending from './components/LotteryEntry/LotteryPending'

export default function LotteryEntry() {
  const { recruitStatus } = useRecruitStatusContext()
  const abc = '모집기간'

  return (
    <section className="flex">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <Image
          className="relative"
          src="/images/lottery.svg"
          alt="lottery"
          width={452}
          height={452}
        />
      </motion.div>

      {/* {recruitStatus === '모집예정' && <LotteryEnd />}
      {recruitStatus === '모집없음' && <LotteryEnd />} */}
      {/* <LotteryPending /> */}

      <AsyncBoundaryWithQuery>
        <ChildrenFetcher>
          {abc === '모집기간' && <LotteryProcessing />}

          {(recruitStatus === '1차등록기간' ||
            recruitStatus === '2차등록기간') && <LotteryResult />}
        </ChildrenFetcher>
      </AsyncBoundaryWithQuery>
    </section>
  )
}
