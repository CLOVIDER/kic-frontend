'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LoginInput } from '@/components/common'
import 'react-toastify/dist/ReactToastify.css'

export default function Page() {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="relative h-492">
        <div className="absolute top-0 w-226 h-226 rounded-full bg-[#DDA82A] blur-[158.5px]" />

        <div className="flex justify-end">
          <div className="absolute bottom-0 w-226 h-226 rounded-full bg-[#FFAB2D] blur-[158.5px]" />
        </div>

        <div className="flex flex-col gap-30 h-full justify-center">
          <p className="text-58 font-bold">
            우리 아이와
            <br />
            함께하는 출근길
          </p>

          <p className="text-23">사내 어린이집 신청 서비스</p>
        </div>
      </div>

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
          src="/images/adminLogin.svg"
          width={566}
          height={566}
          alt="adminLogin"
        />
      </motion.div>

      <LoginInput />
    </section>
  )
}
