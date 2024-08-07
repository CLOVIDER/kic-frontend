'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { CallIcon, ClockIcon, HomeIcon } from '@/components/common'
import Image from 'next/image'
import { useKindergartensContext } from '../../fetcher/KindergartensFetcher'

export default function KindergartenDetail({ id }: { id: string }) {
  const { kindergartens } = useKindergartensContext()
  const {
    kindergartenId,
    kindergartenAddr,
    kindergartenImageUrls,
    kindergartenInfo,
    kindergartenNm,
    kindergartenNo,
    kindergartenScale,
    kindergartenCapacity,
    kindergartenTime,
  } = kindergartens[Number(id) - 1]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layoutId={String(kindergartenId)}
        initial={{ width: '940px', opacity: 1 }}
        exit={{ width: '333px', opacity: 0 }}
        style={{ borderRadius: '20px' }}
        className="group shadow-medium h-489 absolute bg-[white]"
      />
      <Card className="w-[940px] h-489 py-27 bg-transparent !shadow-none">
        <CardHeader className="w-full flex justify-between px-51 items-start">
          <header className="w-500 relative">
            <motion.h1
              layoutId={`${kindergartenId} title`}
              exit={{ opacity: 0 }}
              className="absolute text-30 font-bold text-[#FFAB2D]"
            >
              {kindergartenNm}
            </motion.h1>
            <motion.h2
              layoutId={`${kindergartenId} sub-header`}
              className="absolute top-45 text-15 font-medium"
            >
              {kindergartenAddr}
            </motion.h2>
          </header>

          <motion.div
            layoutId={`${kindergartenId} info`}
            className="w-270 flex flex-col gap-3 mt-7"
          >
            <div className="flex text-15">
              <div className="flex gap-5">
                <CallIcon />
                <div className="w-70">연락처</div>
              </div>
              <p>{kindergartenNo}</p>
            </div>

            <div className="flex text-15">
              <div className="flex gap-5">
                <ClockIcon />
                <div className="w-70">운영시간</div>
              </div>
              <p>{kindergartenTime}</p>
            </div>

            <div className="flex text-15">
              <div className="flex gap-5">
                <HomeIcon />
                <div className="w-70">규모</div>
              </div>

              <p className="text-14">
                <span>{kindergartenScale}</span>
                <span>{kindergartenCapacity}</span>
              </p>
            </div>
          </motion.div>
        </CardHeader>

        <CardBody className="w-full overflow-hidden">
          <div className="mt-27 grid grid-cols-3 pl-45 w-fit gap-17">
            <motion.div layoutId={`${kindergartenId} image`}>
              {kindergartenImageUrls.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt="image"
                  width={270}
                  height={154}
                  className="rounded-20"
                />
              ))}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-13 text-15 px-51 overflow-hidden"
          >
            {kindergartenInfo}
          </motion.p>
        </CardBody>
      </Card>
    </AnimatePresence>
  )
}
