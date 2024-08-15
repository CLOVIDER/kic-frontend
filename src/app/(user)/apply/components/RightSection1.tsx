import React, { useCallback } from 'react'
import {
  RightSection1Props,
  ApplicationPayload,
  Child,
  DropdownOption,
} from '@/type/application'
import FormSection from './common/FormSection'
import ChildInput from './common/ChildInput'
import DropdownSelect from './common/DropdownSelect'

export default function RightSection1({
  kindergartenName,
  dropdownOptions,
  onSubmit,
  children,
  setChildren,
  selectedLabels,
  handleDropdownSelect,
}: RightSection1Props & {
  selectedLabels: Record<string, Record<string, string>>
  handleDropdownSelect: (
    childId: number,
    kindergarten: string,
    option: DropdownOption,
  ) => void
}) {
  const addChild = useCallback(() => {
    setChildren((prevChildren) => [
      ...prevChildren,
      { id: Date.now(), name: '', classes: {} },
    ])
  }, [setChildren])

  const removeChild = useCallback(
    (id: number) => {
      setChildren((prevChildren) =>
        prevChildren.filter((child) => child.id !== id),
      )
    },
    [setChildren],
  )

  const updateChildInfo = useCallback(
    (id: number, field: string, value: string, kindergarten?: string) => {
      setChildren((prevChildren) =>
        prevChildren.map((child) => {
          if (child.id === id) {
            if (field === 'class' && kindergarten) {
              return {
                ...child,
                classes: { ...child.classes, [kindergarten]: value },
              }
            }
            return { ...child, [field]: value }
          }
          return child
        }),
      )
    },
    [setChildren],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const data: Partial<ApplicationPayload> = {
        childrenRecruitList: children.map((child) => ({
          childNm: child.name,
          recruitIds: Object.values(child.classes).map((recruitId) =>
            parseInt(recruitId, 10),
          ),
        })),
        childrenCnt: children.length,
      }
      onSubmit(data, children)
    },
    [children, onSubmit],
  )

  return (
    <form onSubmit={handleSubmit} className="w-450">
      <FormSection title="어린이집을 선택해주세요.">
        {children.map((child: Child) => (
          <div key={child.id} className="mb-6">
            <ChildInput
              name={child.name}
              onChange={(value) => updateChildInfo(child.id, 'name', value)}
              onRemove={() => removeChild(child.id)}
            />
            <div className="mt-12 ml-7 w-[425px]">
              {kindergartenName.map((name) => (
                <div
                  key={`${child.id}-${name}`}
                  className="flex items-center mb-15"
                >
                  <div className="w-[335px] text-[#666666] text-20">{name}</div>
                  <DropdownSelect
                    options={dropdownOptions[name]}
                    selectedOption={
                      selectedLabels[child.id.toString()]?.[name] || ''
                    }
                    onSelect={(option) =>
                      handleDropdownSelect(child.id, name, option)
                    }
                    placeholder="분반선택"
                  />
                </div>
              ))}
            </div>
            <div className="mt-20 border-[0.5px] border-solid w-[450px] border-[#D5D1D1]" />
          </div>
        ))}
        <button
          type="button"
          onClick={addChild}
          className="flex items-center justify-center w-[27px] h-[27px] mt-55 bg-[#FFE4A3] font-bold text-[#ffffff] rounded mx-auto text-[20px] leading-none"
        >
          +
        </button>
      </FormSection>
      <button
        type="submit"
        className="ml-364 mt-12 w-[98px] h-[31px] rounded-2xl [background:linear-gradient(180deg,rgb(255,187.22,55.65)_0%,rgb(255,227.03,158.66)_100%)]"
      >
        <div className="flex items-center justify-center [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#ffffff] text-w-background text-[15px] text-center tracking-[0] whitespace-nowrap">
          다음
        </div>
      </button>
    </form>
  )
}
