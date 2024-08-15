'use client'

import { useRef, ChangeEvent, useCallback, type PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import Input from '../Input'
import Button from '../Button'

export default function FileEdit({
  onFileSelect,
  className,
  children,
}: PropsWithChildren<{
  onFileSelect: (file: File) => void
  className?: string
}>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement

    if (inputEl.files?.[0]) {
      onFileSelect(inputEl.files[0])
    }
  }

  const handleButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [])

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        id="profile"
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <Button
        onClick={handleButtonClick}
        className={cn('w-70 m-5 p-4 bg-primary/30 text-primary', className)}
      >
        {children}
      </Button>
    </div>
  )
}
