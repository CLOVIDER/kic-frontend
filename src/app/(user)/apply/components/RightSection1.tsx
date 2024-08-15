'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { Child, RightSection1Props } from '@/type/application'

export default function RightSection1({
  kindergartenName,
  dropdownOptions,
  onSubmit,
}: RightSection1Props) {
  const [selectedOptions] = useState<string[]>(
    kindergartenName.map(() => '분반선택'),
  )
  const [children, setChildren] = useState<Child[]>([
    { id: 1, name: '', classes: {} },
  ])

  const addChild = useCallback(() => {
    setChildren((prevChildren) => [
      ...prevChildren,
      { id: Date.now(), name: '', classes: {} },
    ])
  }, [])

  const removeChild = useCallback((id: number) => {
    setChildren((prevChildren) =>
      prevChildren.filter((child) => child.id !== id),
    )
  }, [])

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
    [],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(children, selectedOptions)
    },
    [children, selectedOptions, onSubmit],
  )

  const memoizedDropdownOptions = useMemo(
    () => dropdownOptions,
    [dropdownOptions],
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[470px] h-[547px] overflow-y-auto">
        <div className="ml-4 text-20">
          <span className="">어린이집을 선택해주세요.</span>
          <span className="text-[#e86565]">*</span>
        </div>
        <div className="ml-4 mt-5 text-12 text-[#e86565]">
          + 버튼을 누르면 아이 추가가 가능해요.
        </div>
        {children.map((child) => (
          <div key={child.id} className="mb-6">
            <div className="flex ml-4 mt-36 w-[202px] h-[39px]">
              <input
                className="p-16 w-[148px] h-[38px] border border-solid rounded-lg border-[#CCCCCC]"
                value={child.name}
                onChange={(e) =>
                  updateChildInfo(child.id, 'name', e.target.value)
                }
                placeholder="아이 이름"
              />
              <button
                type="button"
                className="ml-15"
                onClick={() => removeChild(child.id)}
                aria-label="Remove Child"
              >
                <Image
                  alt=""
                  src="/images/x-circle-1.svg"
                  width={32.5}
                  height={32.5}
                />
              </button>
            </div>
            <div className="mt-12 ml-7 w-[425px]">
              {kindergartenName.map((name) => (
                <div
                  key={`${child.id}-${name}`}
                  className="flex items-center mb-15"
                >
                  <div className="w-[135px] h-[25px] text-[#666666] text-20">
                    {name}
                  </div>
                  <div className="ml-[152px] text-16">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="w-[138px] h-[25px] text-16 bg-[#FFC56E] border-none flex items-center justify-center text-[#ffffff]"
                          variant="solid"
                        >
                          <span className="ml-23">
                            {child.classes[name] || '분반선택'}
                          </span>
                          <Image
                            alt=""
                            className="ml-25 w-24 h-24"
                            src="/images/dropdown.svg"
                            width={24}
                            height={24}
                          />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dynamic Actions"
                        className="min-w-[138px]"
                        onAction={(key) => {
                          const selectedOption = memoizedDropdownOptions.find(
                            (option) => option.key === key,
                          )
                          if (selectedOption) {
                            updateChildInfo(
                              child.id,
                              'class',
                              selectedOption.label,
                              name,
                            )
                          }
                        }}
                      >
                        {memoizedDropdownOptions.map((option) => (
                          <DropdownItem
                            key={option.key}
                            className="text-center justify-center"
                          >
                            {option.label}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
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
      </div>
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
