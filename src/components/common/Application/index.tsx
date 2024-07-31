import ChildCard from '../ChildCard'
import InfoCard from './InfoCard'
import { Plus } from '../Icons'

export default function Appplication() {
  return (
    <div className="bg-[#FFFDF5] border border-[#BDB6B6] w-[700px] h-[540px] rounded-20 p-20 flex flex-col items-center">
      <div className="text-20 font-bold mt-50">
        <span className="text-orange">김현겸 </span>
        지원자님
      </div>
      <InfoCard />
      <div className="flex flex-wrap gap-20">
        <ChildCard
          name="공에엉"
          kindergartenList={['햇빛어린이집 3세반', '새빛어린이집 4세반']}
        />
        <ChildCard
          name="이주에"
          kindergartenList={['햇빛어린이집 3세반', '새빛어린이집 4세반']}
        />
      </div>
      <div className="flex flex-wrap my-20 gap-40 w-400 text-[#666666]">
        <div className="flex flex-row items-center gap-10 w-180">
          <Plus fill="#000000" width={10} />
          맞벌이
        </div>
        <div className="flex flex-row items-center gap-10 w-180">
          <Plus fill="#000000" width={10} />
          다자녀가정
        </div>
      </div>
    </div>
  )
}
