'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { CallIcon, ClockIcon, HomeIcon } from '@/components'
import { dummyCards } from '../../constants'

export default function KindergartenList() {
  const {
    name,
    description,
    address,
    area,
    squareFeet,
    capacity,
    phone,
    time,
  } = dummyCards[0]

  return (
    <AnimatePresence mode="wait">
      <Link
        href={`?id=${1}`}
        className="hover:translate-y-[-10px] transition-all duration-[250ms]"
      >
        <motion.div
          layoutId="card"
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
                layoutId="name"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-30 font-bold text-[#FFAB2D]"
              >
                {name}
              </motion.h1>
              <motion.h2 layoutId="sub-header" className="text-15 font-medium">
                {address}
              </motion.h2>
            </header>
          </CardHeader>

          <CardBody className="mt-7">
            <div className="w-full h-154 rounded-20 bg-primary" />
            <div className="flex flex-col gap-3 mt-7">
              <div className="flex text-15">
                <div className="flex gap-5">
                  <CallIcon />
                  <div className="w-70">연락처</div>
                </div>
                <p>{phone}</p>
              </div>

              <div className="flex text-15">
                <div className="flex gap-5">
                  <ClockIcon />
                  <div className="w-70">운영시간</div>
                </div>
                <p>{time}</p>
              </div>

              <div className="flex text-15">
                <div className="flex gap-5">
                  <HomeIcon />
                  <div className="w-70">규모</div>
                </div>
                <p>
                  {area}{' '}
                  <span className="text-10 text-[#A0A5A9]">
                    ({squareFeet}평)
                  </span>{' '}
                  / {capacity}명
                </p>
              </div>
            </div>

            <p className="mt-13 text-15">{description}</p>
          </CardBody>
        </Card>
      </Link>
    </AnimatePresence>
  )
}
