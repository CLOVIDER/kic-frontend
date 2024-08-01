import ChildCard from '../ChildCard'
import InfoCard from './InfoCard'
import CheckboxWithLabel from '../CheckboxWithLabel'

export default function Application() {
  return (
    <div className="bg-[#FFFDF5] border border-[#BDB6B6] w-[800px] min-h-500 rounded-20 p-10 flex flex-col shadow-sm">
      <div className="flex flex-row p-20 gap-100 font-sans">
        <div className="text-20 font-semibold whitespace-nowrap w-170 flex justify-end">
          사원 정보
        </div>
        <InfoCard />
      </div>

      <div className="flex flex-row p-20 gap-100 my-10">
        <div className="text-20 font-semibold whitespace-nowrap w-170 flex justify-end">
          아이 정보
        </div>

        <div className="grid grid-cols-2 gap-20 w-auto">
          <ChildCard
            name="공에엉"
            kindergartenList={['햇빛어린이집 3세반', '새빛어린이집 4세반']}
          />
          <ChildCard
            name="이주에"
            kindergartenList={['햇빛어린이집 3세반', '새빛어린이집 4세반']}
          />
        </div>
      </div>

      <div className="flex flex-row p-20 gap-100">
        <div className="text-20 font-semibold whitespace-nowrap w-170 flex justify-end">
          해당 항목
        </div>
        <div className="grid grid-cols-2 w-430 gap-20 text-[#666666] px-10">
          <CheckboxWithLabel text="다자녀" checked />
          <CheckboxWithLabel text="항목1" checked />
          <CheckboxWithLabel text="항목3" checked />
          <CheckboxWithLabel text="다자녀" checked />
          <CheckboxWithLabel text="다자녀" checked />
        </div>
      </div>
    </div>
  )
}
