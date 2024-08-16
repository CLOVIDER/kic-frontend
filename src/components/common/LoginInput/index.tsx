'use client'

import { useRouter } from 'next/navigation'
import Button from '../Button'
import { PasswordHidden } from '../Icons'
import Input from '../Input'
import useLoginInput from './hooks/useLoginInput'

export default function LoginInput() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isPassword,
    setIsPassword,
    handleLogin,
  } = useLoginInput()

  const { push } = useRouter()

  return (
    <div className="flex flex-col gap-16 items-center">
      <Input
        onValueChange={setEmail}
        value={email}
        wrapperClassName="w-242 bg-[#EAF0F7] rounded-10 px-17 py-9"
        className="border-none bg-[#EAF0F7]"
        placeholder="이름 입력"
      />

      <Input
        value={password}
        onValueChange={setPassword}
        type={isPassword ? 'password' : 'text'}
        wrapperClassName="w-242 bg-[#EAF0F7] rounded-10 px-17 py-9 flex justify-between"
        className="border-none bg-[#EAF0F7]"
        placeholder="비밀번호 입력"
        onClick={() => push('/password')}
        endContent={
          <PasswordHidden
            className="cursor-pointer"
            onClick={() => setIsPassword((prev) => !prev)}
          />
        }
      />

      <Button
        className="w-full text-19 font-bold rounded-10 bg-[#FFC945] text-[white] shadow-[0px_12px_21px_4px_rgba(68,97,242,0.15)]"
        onClick={handleLogin}
      >
        로그인
      </Button>

      <button type="button" className="text-14 font-medium text-[#C7C7C7] mt-5">
        비밀번호 초기화
      </button>
    </div>
  )
}
