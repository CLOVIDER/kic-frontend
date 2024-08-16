import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  )
}

// BlockNoteViewer를 동적으로 로드
const BlockNoteViewer = dynamic(() => import('./BlockNoteEditor'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

interface DynamicBlockNoteViewerProps {
  domainName?: string
  imageUrls?: (urls: string[]) => void
  setContent?: (content: string) => void
  enableImageUpload?: boolean
  initialContent?: string
  data?: string
}

export default function DynamicBlockNote({
  domainName,
  imageUrls,
  setContent,
  enableImageUpload = false,
  initialContent,
  data,
}: DynamicBlockNoteViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setHasError(true)
      }
    }, 10000) // 10초 후에 에러 상태로 변경

    return () => clearTimeout(timer)
  }, [isLoading])

  useEffect(() => {
    // BlockNoteViewer가 로드되면 isLoading을 false로 설정
    setIsLoading(false)
  }, [])

  if (hasError) {
    return <div>에디터 로딩에 실패했습니다. 페이지를 새로고침해 주세요.</div>
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BlockNoteViewer
        domainName={domainName}
        setUploadedImageUrls={imageUrls}
        setContent={setContent}
        enableImageUpload={enableImageUpload}
        initialContent={initialContent}
        data={data}
      />
    </Suspense>
  )
}
