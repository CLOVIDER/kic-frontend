import React from 'react'
import { Button } from '@nextui-org/react'

interface FileUploadButtonProps {
  onUpload: () => void
  buttonText: string
  isUploading: boolean
}

export default function FileUploadButton({
  onUpload,
  buttonText,
  isUploading,
}: FileUploadButtonProps) {
  return (
    <Button
      onClick={onUpload}
      className="w-[84px] h-[24px] bg-[#ffde8d] text-xs text-gray-700 rounded border-[1px] border-solid border-[#cccccc]"
      disabled={isUploading}
    >
      {isUploading ? '업로드 중...' : buttonText}
    </Button>
  )
}
