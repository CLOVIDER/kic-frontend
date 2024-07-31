import { Button } from '@/components'
import { Application } from '@/components/common'

export default function Page() {
  return (
    <div className="w-auto h-auto flex flex-col items-end justify-center gap-5">
      <Application />
      <div className="flex flex-row items-center gap-10">
        <Button className="border-1 p-16 border-orange rounded-[16px] w-100 h-20 bg-white text-[15px] text-orange">
          신청 취소
        </Button>
        <Button className="border-1 p-16 border-orange rounded-[16px] w-100 h-20 bg-white text-[15px] text-orange">
          수정하기
        </Button>
      </div>
    </div>
  )
}
