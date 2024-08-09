import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  )
}

const BlockNoteEditor = dynamic(() => import('./BlocknoteEditor'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

interface DynamicBlockNoteEditorProps {
  domainName: string
  setUploadedImageUrls: (urls: string[]) => void
}

export default function DynamicBlockNoteEditor({
  domainName,
  setUploadedImageUrls,
}: DynamicBlockNoteEditorProps) {
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
    // BlockNoteEditor가 로드되면 isLoading을 false로 설정
    setIsLoading(false)
  }, [])

  if (hasError) {
    return <div>에디터 로딩에 실패했습니다. 페이지를 새로고침해 주세요.</div>
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BlockNoteEditor
        domainName={domainName}
        setUploadedImageUrls={setUploadedImageUrls}
      />
    </Suspense>
  )
}
