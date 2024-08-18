import { Button } from '@nextui-org/react'
import { Input } from '@/components/common'
import { useChange } from './hooks'

export default function Change() {
  const { password, setPassword, handleChangePassword } = useChange()

  return (
    <section>
      <form className="flex flex-col gap-42">
        <h1 className="text-31 font-bold text-center">
          변경할 비밀번호를 입력해주세요!
        </h1>

        <div className="w-full flex flex-col justify-center gap-20 text-22 font-bold">
          <Input
            value={password}
            onValueChange={setPassword}
            className="w-full text-16 font-medium"
            wrapperClassName="px-40"
            placeholder="새로운 비밀번호 입력"
          />
        </div>

        <Button
          onClick={handleChangePassword}
          className="bg-[#FFAB2D] p-16 font-bold w-full h-48 text-white tracking-[0.4px]"
        >
          변경하기
        </Button>
      </form>
    </section>
  )
}
