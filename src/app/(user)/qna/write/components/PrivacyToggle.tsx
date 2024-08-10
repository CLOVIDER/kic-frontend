import React from 'react'

interface PrivacyToggleProps {
  isVisibility: boolean
  handleToggle: () => void
}

export default function PrivacyToggle({
  isVisibility,
  handleToggle,
}: PrivacyToggleProps) {
  return (
    <div className="flex">
      <div className="ml-20 w-[45px] text-16">
        {isVisibility ? '공개' : '비공개'}
      </div>
      <button
        onClick={handleToggle}
        className="relative ml-5 cursor-pointer border-none bg-none p-0"
        type="button"
        aria-label="Toggle privacy"
        aria-pressed={isVisibility}
      >
        <div
          className={`absolute top-[-0.5px] left-[-0.5px] rounded-32 bg-[#ffffff] box-border w-[50px] h-[25px] border-[1px] border-solid ${
            isVisibility ? 'border-[#FFAB2D]' : 'border-[#cccccc]'
          }`}
        />
        <div
          className={`absolute top-[2.5px] ${isVisibility ? 'left-[27.5px]' : 'left-[2.5px]'} rounded-32 ${
            isVisibility ? 'bg-[#FFAB2D]' : 'bg-[#f4f4f4]'
          } box-border w-[19px] h-[19px] border-[1px] border-solid border-[#cccccc] transition-all duration-300`}
        />
      </button>
    </div>
  )
}
