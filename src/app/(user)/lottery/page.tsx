'use client'

import Image from 'next/image'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { If } from '@/components'
import { motion } from 'framer-motion'
import LotteryEnd from './components/LotteryEntry/LotteryEnd'
import LotteryProcessing from './components/LotteryEntry/LotteryProcessing'
import LotteryPending from './components/LotteryEntry/LotteryPending'
import LotteryResult from './components/LotteryEntry/LotteryResult'
import { ChildrenFetcher } from './fetcher/ChildrenFetcher'
import { useRecruitStatusContext } from './fetcher/RecruitStatusFetcher'

export default function Page() {
  const { recruitStatus } = useRecruitStatusContext()

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

      {recruitStatus === '모집예정' && <LotteryEnd />}
      {recruitStatus === '모집없음' && <LotteryEnd />}

      <If
        condition={
          recruitStatus === '모집기간' ||
          recruitStatus === '1차등록기간' ||
          recruitStatus === '2차등록기간'
        }
      >
        <AsyncBoundaryWithQuery>
          <ChildrenFetcher>
            <LotteryPending>
              <If condition={recruitStatus === '모집기간'}>
                <LotteryProcessing />
              </If>

              <If
                condition={
                  recruitStatus === '1차등록기간' ||
                  recruitStatus === '2차등록기간'
                }
              >
                <LotteryResult />
              </If>
            </LotteryPending>
          </ChildrenFetcher>
        </AsyncBoundaryWithQuery>
      </If>
    </section>
  )
}
