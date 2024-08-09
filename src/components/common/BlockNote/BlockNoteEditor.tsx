import '@blocknote/core/style.css'
import '@blocknote/react/style.css'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { useEffect, useCallback, useState } from 'react'
import { uploadImage } from './UploadImage'

interface BlockNoteEditorProps {
  domainName: string
  setUploadedImageUrls: (urls: string[]) => void
}

export default function BlockNoteEditor({
  domainName,
  setUploadedImageUrls,
}: BlockNoteEditorProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const handleUpload = useCallback(
    async (file: File): Promise<string> => {
      try {
        const url = await uploadImage(file, domainName)
        setImageUrls((prevUrls) => [...prevUrls, url])
        setUploadedImageUrls([...imageUrls, url])
        return url
      } catch (error) {
        console.error('Failed to upload image:', error)
        throw error
      }
    },
    [domainName, imageUrls, setUploadedImageUrls],
  )

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
