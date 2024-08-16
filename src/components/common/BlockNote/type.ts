export interface BlockNoteViewerProps {
  data?: string
  editable?: boolean
  enableImageUpload?: boolean
  domainName?: string
  setUploadedImageUrls?: (urls: string[]) => void
  setContent?: (content: string) => void
  initialContent?: string
}
