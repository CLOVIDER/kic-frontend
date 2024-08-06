'use client'

import { Button } from '@nextui-org/react'
import { Input } from '@/components/common'
import useMail from './hooks'

export default function MailInput() {
  const { handleChange, handleKeyDown, inputRefs } = useMail()

  return (
    <section>
      <form className="flex flex-col gap-42">
        <h1 className="text-31 font-bold text-center">메일을 확인해주세요!</h1>

        <div className="w-full flex gap-20 text-22 font-bold">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el as HTMLInputElement
              }}
              type="text"
              maxLength={1}
              className="w-49 h-49 p-6 text-center rounded-6 border-[1.6px] border-[#CFDBEC] focus:border-[#FFAB2D] outline-none"
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <Button className="bg-[#FFAB2D] p-16 font-bold w-full h-48 text-white tracking-[0.4px]">
          확인하기
        </Button>
      </form>

      <div className="w-full mt-52 text-13 flex gap-4 justify-center">
        <span className="font-semibold">메일을 못받으셨나요?</span>
        <span className="font-bold text-[#FFAB2D] underline underline-offset-[3px]">
          재전송하기
        </span>
      </div>
    </section>
  )
}
