'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import MailInput from './components/MailInput'

export default function Page() {
  return (
    <>
      <div className="relative flex justify-center items-center">
        <div className="absolute left-160 h-492">
          <div className="absolute top-0 w-226 h-226 rounded-full bg-[#DDA82A] blur-[158.5px]" />

          <div className="flex justify-end">
            <div className="absolute bottom-0 w-226 h-226 rounded-full bg-[#FFAB2D] blur-[158.5px]" />
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
      </div>

      <MailInput />
    </>
  )
}
