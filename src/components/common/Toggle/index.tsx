'use client'

import { cn } from '@/lib/utils'

type ToggleSwitchProps = {
  id: string
  checked: boolean
  onChange: () => void
}

export default function Toggle({ id, checked, onChange }: ToggleSwitchProps) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label htmlFor={id} className="cursor-pointer">
      <div
        className={cn(
          'w-40 h-20 rounded-full border border-[#979494] p-1',
          checked && 'border-orange',
        )}
      >
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={cn(
            'bg-[#979494] w-15 h-15 rounded-full transition',
            checked && 'transform translate-x-20 bg-orange',
          )}
        />
      </div>
    </label>
  )
}
