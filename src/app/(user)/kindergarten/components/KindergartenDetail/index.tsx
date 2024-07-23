'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { CallIcon, ClockIcon, HomeIcon } from '@/components'
import { dummyCards } from '../../constants'

export default function KindergartenDetail() {
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
      <motion.div
        layoutId="card"
        initial={{ width: '940px', opacity: 1 }}
        exit={{ width: '333px', opacity: 0 }}
        style={{ borderRadius: '20px' }}
        className="group shadow-medium h-489 absolute bg-[white]"
      />
      <Card className="w-[940px] h-489 py-27 bg-transparent !shadow-none">
        <CardHeader className="w-full flex justify-between px-51 items-start">
          <header className="w-500 relative">
            <motion.h1
              // TODO: layout name을 key로 사용해서 가변적으로 수정해야 함
              layoutId="name"
              exit={{ opacity: 0 }}
              className="absolute text-30 font-bold text-[#FFAB2D]"
            >
              {name}
            </motion.h1>
            <motion.h2
              layoutId="sub-header"
              className="absolute top-45 text-15 font-medium"
            >
              {address}
            </motion.h2>
          </header>

          <div className="w-270 flex flex-col gap-3 mt-7">
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
                <span className="text-10 text-[#A0A5A9]">({squareFeet}평)</span>{' '}
                / {capacity}명
              </p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="w-full">
          <div className="mt-27 grid grid-cols-3 pl-45 w-fit gap-17">
            <div className="w-270 h-154 rounded-20 bg-primary" />
            <div className="w-270 h-154 rounded-20 bg-primary" />
            <div className="w-270 h-154 rounded-20 bg-primary" />
          </div>

          <p className="mt-13 text-15 px-51">{description}</p>
        </CardBody>
      </Card>
    </AnimatePresence>
  )
}
