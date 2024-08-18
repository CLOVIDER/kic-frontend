'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/core/style.css' // Import BlockNote's styles
import '@blocknote/react/style.css' // Import BlockNote's React components styles
import '@blocknote/mantine/style.css' // Import BlockNote's Mantine components styles
import { toast } from 'react-toastify'
import { UploadImage } from './UploadImage'

interface BlockNoteViewerProps {
  data?: string
  enableImageUpload?: boolean
  domainName?: string
  setUploadedImageUrls?: (urls: string[]) => void
  setContent?: (content: string) => void
  initialContent?: string
}

export default function BlockNoteEditor({
  data,
  enableImageUpload = false, // 기본값으로 false로 설정
  domainName,
  setUploadedImageUrls,
  setContent,
  initialContent,
}: BlockNoteViewerProps): React.ReactElement {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  // 이미지 업로드 핸들러
  const handleUpload = useCallback(
    async (file: File): Promise<string> => {
      if (!enableImageUpload || !domainName || !setUploadedImageUrls) {
        throw new Error('Image upload is not enabled or missing required props')
      }
      try {
        const url = await UploadImage(file, domainName)
        setImageUrls((prevUrls) => [...prevUrls, url])
        setUploadedImageUrls([...imageUrls, url])
        return url
      } catch (error) {
        toast.error(`Failed to upload image: ${error}`)
        throw error
      }
    },
    [domainName, enableImageUpload, imageUrls, setUploadedImageUrls],
  )

  // 에디터 초기화 및 변경사항 감지
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: enableImageUpload ? handleUpload : undefined,
  })

  // 에디터 초기화 후 기존 내용 설정
  useEffect(() => {
    if (editor && data) {
      try {
        const blocks = JSON.parse(data)
        editor.replaceBlocks(editor.topLevelBlocks, blocks)
      } catch (error) {
        toast.error(`Failed to parse initial content: ${error}`)
      }
    }
  }, [editor, data])

  // 내용 변경 핸들러
  const handleChange = useCallback(() => {
    if (editor && setContent) {
      const jsonBlocks = editor.document
      const contentString = JSON.stringify(jsonBlocks)
      setContent(contentString)
      console.log('Content changed:', contentString)
    }
  }, [editor, setContent])

  return (
    <div className="flex justify-start w-full">
      <BlockNoteView editor={editor} theme="light" onChange={handleChange} />
    </div>
  )
}
