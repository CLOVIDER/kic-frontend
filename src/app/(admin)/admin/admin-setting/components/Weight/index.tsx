'use client'

import { Toggle } from '@/components'
import { useWeight } from './useWeight'
import Title from '../Title'
import { useSettingContext } from '../SettingFetcher/SettingContext'

const switchItems = [
  { label: '근속년수', id: 'workYearsUsage' },
  { label: '사내부부', id: 'isEmployeeCoupleUsage' },
  { label: '형제자매 재원', id: 'isSiblingUsage' },
  { label: '한부모가정', id: 'isSingleParentUsage' },
  { label: '장애부모', id: 'isDisabilityUsage' },
  { label: '다자녀가정', id: 'childrenCntUsage' },
  { label: '맞벌이', id: 'isDualIncomeUsage' },
]

export default function Weight() {
  const { recruitWeightInfo } =
    useSettingContext().settingData.recruitDateAndWeightInfo

  const { handleToggle } = useWeight(switchItems)

  return (
    <section className="pl-20">
      <Title
        title="가중치 설정"
        subtitle="활성화된 상태의 가중치만 계산됩니다."
      />
      <div className="mr-10 space-y-15 mt-20">
        {switchItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div className="flex justify-between items-center">
              <p>{item.label}</p>
              <Toggle
                id={item.id}
                checked={recruitWeightInfo[item.id] === '1'}
                onChange={() => handleToggle(item.id)}
              />
            </div>
            <div className="h-1 w-full bg-[#d0cece]" />
          </div>
        ))}
      </div>
    </section>
  )
}
