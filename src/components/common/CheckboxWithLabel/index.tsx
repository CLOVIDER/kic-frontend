'use client'

import { cn } from '@/util'

function CheckboxWithLabel({
  text,
  checked,
  onChange,
}: {
  text?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={text}
        className="hidden peer"
        checked={checked}
        onChange={() => onChange && onChange(!checked)}
      />
      <label htmlFor={text} className="flex items-center cursor-pointer w-auto">
        <div className="w-24 h-24 border-1 bg-white border-[#CCCCCC] rounded-6 flex items-center justify-center peer-checked:bg-orange peer-checked:border-orange">
          <svg
            className={cn(
              'w-20 h-20 transition-opacity duration-200',
              checked ? 'opacity-100' : 'opacity-0',
            )}
            fill="none"
            stroke="#ff9900"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span className="whitespace-break-spaces ml-10 text-16">{text}</span>
      </label>
    </div>
  )
}

export default CheckboxWithLabel
