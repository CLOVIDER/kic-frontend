'use client'

import { Toggle } from '@/components'
import { useWeight } from './useWeight'
import Title from '../Title'

const switchItems = [
  { label: '근속년수', id: 'seniority' },
  { label: '사내부부', id: 'internalCouple' },
  { label: '형제자매 재원', id: 'siblingsEnrolled' },
  { label: '한부모가정', id: 'singleParent' },
  { label: '장애부모', id: 'disabledParent' },
  { label: '다자녀가정', id: 'multiChildFamily' },
  { label: '맞벌이', id: 'dualIncome' },
]

export default function Weight() {
  const { switchStates, handleToggle } = useWeight(switchItems)

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
                checked={switchStates[item.id]}
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
