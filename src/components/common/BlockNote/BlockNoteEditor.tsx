'use client'

import '@blocknote/core/style.css'
import '@blocknote/react/style.css'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { useEffect, useCallback } from 'react'

export default function BlockNoteEditor() {
  const handleUpload = useCallback(async (file: File) => {
    // 파일을 Data URL로 변환
    return new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const editor = useCreateBlockNote({
    uploadFile: handleUpload,
  })

  useEffect(() => {
    if (editor) {
      // console.log('Editor initialized')
    }
  }, [editor])

  return <BlockNoteView editor={editor} theme="light" />
}
