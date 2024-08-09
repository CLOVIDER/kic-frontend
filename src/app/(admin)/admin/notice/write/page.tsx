'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import DynamicBlockNoteEditor from '@/components/common/Blocknote/DynamicBlockNoteEditor'
import { createNotice } from '@/components/common/notice/api'

export default function WritePage() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const router = useRouter()

  const moveBack = useCallback(() => {
    if (isEdited) {
      const confirm = window.confirm(
        '정말 나가시겠습니까? 작성중이던 데이터가 사라집니다',
      )
      if (confirm) {
        router.push('/admin/notice')
      }
    } else {
      router.push('/admin/notice')
    }
  }, [router, isEdited])

  const domainName = 'notice'

  const handleContentChange = (newContent: string, newImageUrls: string[]) => {
    setContent(newContent)
    setImageUrls(newImageUrls)
    setIsEdited(true)
  }

  const extractImageUrls = (content: string): string[] => {
    const imgTagRegex = /<img[^>]+src="([^">]+)"/g
    const urls = []
    let match
    while ((match = imgTagRegex.exec(content)) !== null) {
      urls.push(match[1])
    }
    return urls
  }

  const deleteUnusedImages = async (urls: string[]) => {
    // 사용되지 않는 이미지를 서버에서 삭제하는 로직 추가 (선택적)
    for (const url of urls) {
      try {
        await deleteImage(url) // deleteImage는 API 호출로 삭제하는 함수로 가정
      } catch (error) {
        console.error(`Failed to delete image ${url}:`, error)
      }
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      // 현재 content에 포함된 이미지 URL을 추출하여 사용되지 않은 이미지 제거
      const usedImageUrls = extractImageUrls(content)
      const unusedImageUrls = imageUrls.filter(
        (url) => !usedImageUrls.includes(url),
      )

      // 필요한 경우 unusedImageUrls 처리 (예: 서버에서 삭제)
      await deleteUnusedImages(unusedImageUrls)

      await createNotice({
        title,
        content,
        imageUrls: usedImageUrls, // 실제 사용된 이미지 URL만 전달
      })

      router.push('/admin/notice')
    } catch (error) {
      setSaveError('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="absolute w-[1280px] h-[720px] flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="mt-22 ml-36 text-32 font-inter font-bold h-39">
          공지사항 작성
        </div>
        <div className="flex relative mt-16 ml-48 w-451 h-24">
          <div className="w-30">제목</div>
          <input
            className="ml-20 w-267 border-[#D5D1D1] border border-solid rounded-3"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setIsEdited(true)
            }}
          />
        </div>
        <div className="mt-[17px] ml-21 w-[746px] h-435 flex-grow overflow-y-auto border-1 border-solid bg-white border-[#00000014] rounded-xl shadow-md">
          <DynamicBlockNoteEditor domainName={domainName} />
        </div>
        <div className="flex mt-8 ml-[556px] w-211 h-31">
          <button
            type="button"
            className="w-98 h-31 bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
            onClick={moveBack}
          >
            작성취소
          </button>
          <button
            type="button"
            className="ml-20 w-98 h-31 shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
      {isSaving && <div>저장 중...</div>}
      {saveError && <div>{saveError}</div>}
    </div>
  )
}
