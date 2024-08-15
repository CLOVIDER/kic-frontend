'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components'
import { Application, If } from '@/components/common'
import Image from 'next/image'
import './application.css'
import { cn } from '@/lib/utils'

export default function Page() {
  const [showComponents, setShowComponents] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimate(true)
    }, 400)

    const timer2 = setTimeout(() => {
      setShowComponents(true)
    }, 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-5 relative p-100">
      <Image
        src="/images/application-bg.svg"
        alt="bg"
        width={290}
        height={400}
        className={cn(
          'absolute transition-all ease-in-out image-center duration-1000',
          animate && 'image-move',
        )}
      />
      <h1
        className={cn(
          'w-full flex justify-center text-30 mb-30 font-sans transition-all duration-1000 ease-in-out text-center',
          animate && 'text-move',
        )}
      >
        이미 신청하신 내역이 있어요 !
      </h1>
      <If condition={showComponents}>
        <div className="ml-270 fade-in ease-in-out delay-300">
          <Application type="user" />
        </div>
      </If>

      <If condition={showComponents}>
        <div className="flex flex-row items-center gap-10 justify-end mr-210 fade-in delay-600">
          <Button className="border-1 p-16 border-orange rounded-[20px] w-120 h-40 bg-white text-[18px] text-orange">
            신청 취소
          </Button>
          <Button className="border-1 p-16 rounded-[20px] w-120 h-40 text-[18px] text-white bg-gradient-to-r from-[#ffbb37] to-[#ffe39e]">
            수정
          </Button>
        </div>
      </If>
    </div>
  )
}
