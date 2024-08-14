import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import Image from 'next/image'

interface DropdownOption {
  key: string
  label: string
}

export interface DropdownSelectProps {
  options: DropdownOption[]
  selectedOption: string
  onSelect: (option: DropdownOption) => void
  placeholder: string
}

export default function DropdownSelect({
  options,
  selectedOption,
  onSelect,
  placeholder,
}: DropdownSelectProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="w-[138px] h-[25px] text-16 bg-[#FFC56E] border-none flex items-center justify-center text-[#ffffff]"
          variant="solid"
        >
          <span className="ml-23">{selectedOption || placeholder}</span>
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
        onAction={(key) =>
          onSelect(options.find((option) => option.key === key)!)
        }
      >
        {options.map((option) => (
          <DropdownItem key={option.key} className="text-center">
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
