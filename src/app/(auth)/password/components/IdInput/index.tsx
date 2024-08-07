import { Dispatch, SetStateAction } from 'react'
import { Button } from '@nextui-org/react'
import { Input } from '@/components/common'
import useIdInput from './hooks'

interface IdInputProps {
  id: string
  setId: Dispatch<SetStateAction<string>>
}

export default function IdInut({ id, setId }: IdInputProps) {
  const { handleNextStep } = useIdInput(id)

  return (
    <div className="flex flex-col gap-16 items-center">
      <h1 className="text-20 text-center font-semibold mb-20">
        비밀번호를 변경할
        <br /> 아이디를 입력해주세요
      </h1>

      <Input
        value={id}
        onValueChange={setId}
        wrapperClassName="w-242 bg-[#EAF0F7] rounded-10 px-17 py-9"
        className="border-none bg-[#EAF0F7]"
        placeholder="아이디 입력"
      />

      <Button
        onClick={handleNextStep}
        className="bg-[#FFAB2D] p-16 font-bold w-full h-48 text-white tracking-[0.4px]"
      >
        변경하기
      </Button>
    </div>
  )
}
