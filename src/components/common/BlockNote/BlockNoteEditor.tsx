import '@blocknote/core/style.css'
import '@blocknote/react/style.css'
import '@blocknote/mantine/style.css'
import { BlockNoteView } from '@blocknote/mantine'
import { useCallback, useState } from 'react'
import { useCreateBlockNote } from '@blocknote/react'
import { uploadImage } from './UploadImage'

interface BlockNoteEditorProps {
  domainName: string
  setUploadedImageUrls?: (urls: string[]) => void
  setContent: (content: string) => void
  enableImageUpload?: boolean
}

export default function Editor({
  domainName,
  setUploadedImageUrls,
  setContent,
  enableImageUpload = true,
}: BlockNoteEditorProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const handleUpload = useCallback(
    async (file: File): Promise<string> => {
      if (!enableImageUpload || !domainName || !setUploadedImageUrls) {
        throw new Error('Image upload is not enabled or missing required props')
      }
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
    [domainName, enableImageUpload, imageUrls, setUploadedImageUrls],
  )

  const editor = useCreateBlockNote({
    uploadFile: enableImageUpload ? handleUpload : undefined,
  })

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
