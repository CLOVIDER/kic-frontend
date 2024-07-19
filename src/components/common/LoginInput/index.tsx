'use client'

import Button from '../Button'
import { PasswordHidden } from '../Icons'
import Input from '../Input'
import useLoginInput from './hooks/useLoginInput'

export default function LoginInput() {
  const { email, setEmail, password, setPassword, isPassword, setIsPassword } =
    useLoginInput()

  return (
    <div className="flex flex-col gap-16 items-center">
      <Input
        onValueChange={setEmail}
        value={email}
        wrapperClassName="w-242 bg-[#EAF0F7] rounded-10 px-17 py-9"
        placeholder="이메일 입력"
      />

      <Input
        value={password}
        onValueChange={setPassword}
        type={isPassword ? 'password' : 'text'}
        wrapperClassName="w-242 bg-[#EAF0F7] rounded-10 px-17 py-9 flex justify-between"
        placeholder="비밀번호 입력"
        endContent={
          <PasswordHidden
            className="cursor-pointer"
            onClick={() => setIsPassword((prev) => !prev)}
          />
        }
      />

      <Button className="w-full text-19 font-bold rounded-10 bg-[#FFC945] text-[white] shadow-[0px_12px_21px_4px_rgba(68,97,242,0.15)]">
        로그인
      </Button>

      <button type="button" className="text-14 font-medium text-[#C7C7C7] mt-5">
        비밀번호 초기화
      </button>
    </div>
  )
}
