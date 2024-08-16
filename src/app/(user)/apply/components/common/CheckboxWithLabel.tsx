import React from 'react'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

interface CheckboxWithLabelProps {
  id: string
  label: string
  isChecked: boolean
  onChange: (id: string) => void
  isRequired?: boolean
}

export default function CheckboxWithLabel({
  id,
  label,
  isChecked,
  onChange,
  isRequired = false,
}: CheckboxWithLabelProps) {
  return (
    <div className="flex items-center">
      <Button
        onClick={() => onChange(id)}
        className="w-[24px] h-[24px] border rounded-lg border-solid bg-white border-[#CCCCCC] flex items-center justify-center cursor-pointer mr-[16px] px-0 py-0"
        type="button"
      >
        {isChecked && (
          <Image
            src="/images/check.svg"
            alt="Checkmark"
            width={24}
            height={24}
          />
        )}
      </Button>
      <span className="text-base">
        {label}
        {isRequired && <span className="text-[#ea7465] ml-1">*</span>}
      </span>
    </div>
  )
}
