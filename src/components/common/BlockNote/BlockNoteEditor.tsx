import '@blocknote/core/style.css'
import '@blocknote/react/style.css'
import '@blocknote/mantine/style.css'
import { BlockNoteView } from '@blocknote/mantine'
import { useCallback, useState, useEffect } from 'react'
import { useCreateBlockNote } from '@blocknote/react'
import { toast } from 'react-toastify'
import { UploadImage } from './UploadImage'

interface BlockNoteEditorProps {
  domainName: string
  setUploadedImageUrls?: (urls: string[]) => void
  setContent: (content: string) => void
  enableImageUpload?: boolean
  initialContent?: string
}

export default function BlockNoteEditor({
  domainName,
  setUploadedImageUrls,
  setContent,
  enableImageUpload = true,
  initialContent,
}: BlockNoteEditorProps) {
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
    uploadFile: enableImageUpload ? handleUpload : undefined,
  })

  useEffect(() => {
    if (editor && initialContent) {
      try {
        const blocks = JSON.parse(initialContent)
        editor.replaceBlocks(editor.topLevelBlocks, blocks)
      } catch (error) {
        toast.error(`Failed to parse initial content: ${error}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, initialContent])

  const handleChange = useCallback(() => {
    if (editor) {
      const jsonBlocks = editor.document
      const contentString = JSON.stringify(jsonBlocks)
      setContent(contentString)
    }
  }, [editor, setContent])

  if (!editor) {
    return null
  }

  return <BlockNoteView editor={editor} theme="light" onChange={handleChange} />
}
