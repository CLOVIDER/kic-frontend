'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { CallIcon, ClockIcon, HomeIcon } from '@/components/common'
import { useKindergartensContext } from './fetcher/KindergartensFetcher'

export default function Page() {
  const { kindergartens } = useKindergartensContext()

  return (
    <AnimatePresence mode="wait">
      <section
        style={{ scrollbarWidth: 'none' }}
        className="flex gap-58 w-[1000px] p-30 overflow-x-scroll"
      >
        {kindergartens.map(
          ({
            kindergartenId,
            kindergartenAddr,
            kindergartenImageUrls,
            kindergartenInfo,
            kindergartenNm,
            kindergartenNo,
            kindergartenScale,
            kindergartenCapacity,
            kindergartenTime,
          }) => (
            <Link
              key={kindergartenId}
              href={`/kindergarten/${kindergartenId}`}
              className="relative hover:translate-y-[-10px] transition-all duration-[250ms]"
            >
              <motion.div
                layoutId={String(kindergartenId)}
                initial={{ width: '333px', opacity: 1 }}
                exit={{ width: '940px', opacity: 0 }}
                style={{
                  borderRadius: '20px',
                }}
                className="shadow-medium h-489 absolute bg-white"
              />

              <Card className="w-333 h-489 px-32 py-27 bg-transparent !shadow-none">
                <CardHeader className="w-fit mx-auto text-center">
                  <header className="w-full">
                    <motion.h1
                      layoutId={`${kindergartenId} title`}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-30 font-bold text-[#FFAB2D]"
                    >
                      {kindergartenNm}
                    </motion.h1>
                    <motion.h2
                      layoutId={`${kindergartenId} sub-header`}
                      className="text-15 font-medium"
                    >
                      {kindergartenAddr}
                    </motion.h2>
                  </header>
                </CardHeader>

                <CardBody className="mt-7 overflow-hidden">
                  <motion.div
                    layoutId={`${kindergartenId} image`}
                    className="flex gap-10 w-268 h-153"
                  >
                    <Image
                      className="rounded-20"
                      src={kindergartenImageUrls[0]}
                      alt="kindergartenImage"
                      width={268}
                      height={153}
                    />
                  </motion.div>

                  <motion.div
                    layoutId={`${kindergartenId} info`}
                    className="flex flex-col gap-3 mt-7"
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
                        <span>{kindergartenScale}평</span> /{' '}
                        <span>{kindergartenCapacity}명</span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-13 text-15"
                  >
                    {kindergartenInfo}
                  </motion.p>
                </CardBody>
              </Card>
            </Link>
          ),
        )}
      </section>
    </AnimatePresence>
  )
}
