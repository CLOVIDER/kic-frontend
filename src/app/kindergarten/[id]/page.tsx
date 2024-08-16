'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { CallIcon, ClockIcon, HomeIcon, If } from '@/components/common'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { ROLE } from '@/constants'
import { useKindergartensContext } from '../fetcher/KindergartensFetcher'

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { kindergartens } = useKindergartensContext()
  const isAdmin = Cookies.get(ROLE) === 'ADMIN'
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
    kindergartenClass,
  } = kindergartens[Number(id) - 1]

  return (
    <>
      <motion.div
        layoutId={String(kindergartenId)}
        initial={{ width: '940px', opacity: 1 }}
        exit={{ width: '333px', opacity: 0 }}
        style={{ borderRadius: '20px' }}
        className="group shadow-medium h-489 absolute bg-[white]"
      />
      <section className="relative">
        <If condition={isAdmin}>
          <motion.nav
            key="header"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="absolute right-5 top-[-50px] flex gap-12"
          >
            <Link
              href="/kindergarten"
              className="w-81 h-35 py-5 text-[#FFAB2D] bg-white border-[#FFAB2D] border-1 rounded-16 flex justify-center items-center"
            >
              돌아가기
            </Link>

            <Link
              href={`/kindergarten/edit/${id}`}
              className="w-81 h-35 py-5 text-white bg-white [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] rounded-16 flex justify-center items-center"
            >
              편집
            </Link>
          </motion.nav>
        </If>

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
                  <span>{kindergartenScale}평</span> /{' '}
                  <span>{kindergartenCapacity}명</span>
                </p>
              </div>
            </motion.div>
          </CardHeader>

          <CardBody style={{ scrollbarWidth: 'none' }} className="w-full">
            <div className="mt-27 flex mx-auto w-fit gap-17 mb-10">
              <motion.div
                layoutId={`${kindergartenId} image`}
                className="flex gap-20"
              >
                {kindergartenImageUrls.map((src) => (
                  <div key={src} className="w-240 h-160 relative">
                    <Image src={src} alt="image" fill className="rounded-20" />
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-13 text-15 px-51 whitespace-pre-wrap"
            >
              {kindergartenInfo}
            </motion.p>

            <div className="px-51 pt-40 flex flex-col gap-10">
              <h2 className="text-20">분반</h2>

              {kindergartenClass.map(({ className, ageClassString }) => (
                <div key={className} className="flex gap-40 items-center">
                  <div>{className}</div>
                  <div>{ageClassString}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  )
}
