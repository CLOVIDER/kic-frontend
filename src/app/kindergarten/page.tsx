'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Button, CallIcon, ClockIcon, HomeIcon, If } from '@/components/common'
import Cookies from 'js-cookie'
import { ROLE } from '@/constants'
import { useRouter } from 'next/navigation'
import { useKindergartensContext } from './fetcher/KindergartensFetcher'

export default function Page() {
  const { kindergartens } = useKindergartensContext()
  const { back } = useRouter()
  const isAdmin = Cookies.get(ROLE) === 'ADMIN'

  return (
    <AnimatePresence mode="wait">
      <section className="relative p-5">
        <motion.nav
          key="header"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="absolute px-40 justify-between w-full right-5 top-[-10px] flex gap-12"
        >
          <Button
            onClick={back}
            className="w-81 h-35 py-5 text-[#FFAB2D] bg-white border-[#FFAB2D] border-1 rounded-16 text-[16px] flex justify-center items-center"
          >
            돌아가기
          </Button>

          <If condition={isAdmin}>
            <Link
              href="/kindergarten/create"
              className="w-81 h-35 py-5 text-white bg-white [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] rounded-16 flex justify-center items-center"
            >
              추가하기
            </Link>
          </If>
        </motion.nav>

        <section
          style={{ scrollbarWidth: 'none' }}
          className="flex gap-58 w-[1000px] p-30 overflow-x-scroll min-h-520"
        >
          <If condition={kindergartens.length >= 1}>
            <div className="w-full h-500 flex justify-center items-center text-32 font-semibold">
              어린이집이 없어요...🥲
            </div>
          </If>

          <If condition={kindergartens.length < 1}>
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
          </If>
        </section>
      </section>
    </AnimatePresence>
  )
}
