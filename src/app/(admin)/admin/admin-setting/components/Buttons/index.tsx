'use client'

import { Button } from '@/components'
import useSave from '../useSave'

export default function Buttons() {
  const { handleSave } = useSave()
  return (
    <>
      <Button className="w-98 h-31 bg-white border border-[#fdba74] font-semibold text-[#fb923c] rounded-16 text-sm">
        이전
      </Button>
      <Button
        type="button"
        className="w-98 h-31 shadow-md gradient-button text-[#ffffff] font-bold rounded-16 text-sm"
        onClick={handleSave}
      >
        저장
      </Button>
    </>
  )
}
