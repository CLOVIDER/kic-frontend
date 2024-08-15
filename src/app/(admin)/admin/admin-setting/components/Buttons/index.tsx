'use client'

import { Button } from '@nextui-org/react'
import useSave from '../useSave'

export default function Buttons() {
  const { handleSave } = useSave()
  return (
    <div className="flex flex-row justify-end mt-20 gap-20">
      <Button className="w-150 h-50 bg-white border border-[#fdba74] font-semibold text-[#fb923c] rounded-16 text-lg">
        돌아가기
      </Button>

      <Button
        type="button"
        className="w-150 h-50 shadow-md gradient-button text-[#ffffff] font-bold rounded-16 text-lg"
        onClick={handleSave}
      >
        저장
      </Button>
    </div>
  )
}
