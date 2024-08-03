'use client'

import '@blocknote/core/style.css'
import '@blocknote/react/style.css'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { useEffect } from 'react'

export default function BlockNoteEditor() {
  const editor = useCreateBlockNote()

  useEffect(() => {
    if (editor) {
      // 에디터 초기화 로직
    }
  }, [editor])

  return <BlockNoteView editor={editor} theme="light" />
}
