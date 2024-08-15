import React from 'react'
import Image from 'next/image'

interface ChildInputProps {
  name: string
  onChange: (value: string) => void
  onRemove: () => void
}

export default function ChildInput({
  name,
  onChange,
  onRemove,
}: ChildInputProps) {
  return (
    <div className="flex ml-4 mt-36 w-[202px] h-[39px]">
      <input
        className="p-16 w-[148px] h-[38px] border border-solid rounded-lg border-[#CCCCCC]"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder="아이 이름"
      />
      <button
        type="button"
        className="ml-15"
        onClick={onRemove}
        aria-label="Remove Child"
      >
        <Image alt="" src="/images/x-circle-1.svg" width={32.5} height={32.5} />
      </button>
    </div>
  )
}
