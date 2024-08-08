'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader, Textarea } from '@nextui-org/react'
import {
  Button,
  CallIcon,
  ClockIcon,
  FileEdit,
  HomeIcon,
  Input,
} from '@/components/common'
import useEdit from './hooks'

export default function Page({ params: { id } }: { params: { id: string } }) {
  const {
    kindergartenId,
    name,
    setName,
    addr,
    setAddr,
    info,
    setInfo,
    phone,
    setPhone,
    time,
    setTime,
    scale,
    setScale,
    capacity,
    setCapacity,
    handleSubmit,
    images,
    handleImages,
  } = useEdit(Number(id))

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
        <nav className="absolute right-5 top-[-50px] flex gap-12">
          <Link
            href="/kindergarten"
            className="w-81 h-35 py-5 text-[#FFAB2D] bg-white border-[#FFAB2D] border-1 rounded-16 flex justify-center items-center"
          >
            돌아가기
          </Link>

          <Button
            onClick={handleSubmit}
            className="w-81 h-35 py-5 text-white bg-white [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] rounded-16 flex justify-center items-center"
          >
            저장
          </Button>
          <FileEdit onFileSelect={handleImages} />
        </nav>

        <Card className="w-[940px] h-489 py-27 bg-transparent !shadow-none">
          <CardHeader className="w-full flex justify-between px-51 items-start">
            <header className="w-500 relative">
              <Input
                value={name}
                onValueChange={setName}
                wrapperClassName="absolute font-bold text-[#FFAB2D]"
                className="text-30 p-0"
              />

              <Input
                value={addr}
                onValueChange={setAddr}
                wrapperClassName="absolute top-45"
                className="text-15 font-medium p-2"
              />
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
                <Input
                  className="p-2"
                  type="tel"
                  value={phone}
                  onValueChange={setPhone}
                />
              </div>

              <div className="flex text-15">
                <div className="flex gap-5">
                  <ClockIcon />
                  <div className="w-70">운영시간</div>
                </div>
                <Input className="p-2" value={time} onValueChange={setTime} />
              </div>

              <div className="flex text-15">
                <div className="flex gap-5">
                  <HomeIcon />
                  <div className="w-70">규모</div>
                </div>

                <div className="w-full text-14 flex gap-5 items-center">
                  <Input
                    className="p-2 w-40"
                    value={scale}
                    onValueChange={(value: string) => {
                      if (!Number.isNaN(Number(value))) {
                        setScale(Number(value))
                      }
                    }}
                  />{' '}
                  평<p className="px-10">/</p>
                  <Input
                    className="p-2 w-40"
                    value={capacity}
                    onValueChange={(value: string) => {
                      if (!Number.isNaN(Number(value))) {
                        setCapacity(Number(value))
                      }
                    }}
                  />
                  명
                </div>
              </div>
            </motion.div>
          </CardHeader>

          <CardBody className="w-full overflow-hidden">
            <div className="mt-27 grid grid-cols-3 pl-45 w-fit gap-17">
              <motion.div
                layoutId={`${kindergartenId} image`}
                className="flex gap-20 h-200"
              >
                {images.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt="image"
                    width={270}
                    height={154}
                    className="rounded-20 hover:opacity-45"
                  />
                ))}
              </motion.div>
            </div>

            <Textarea
              classNames={{
                base: 'px-51 mt-13 text-15 ',
                input: 'bg-white',
                mainWrapper: 'bg-[white]',
                innerWrapper: 'bg-white',
              }}
              value={info}
              onValueChange={setInfo}
            />
          </CardBody>
        </Card>
      </section>
    </>
  )
}
