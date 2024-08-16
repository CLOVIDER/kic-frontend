'use client'

import DynamicBlockNoteEditor from '@/components/common/BlockNote/DynamicBlockNoteEditor'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createNotice } from '../api/api'

export default function WritePage() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]) // Track uploaded image URLs
  const router = useRouter()
  const domainName = 'notice'

  const moveBack = () => {
    router.push('/admin/notice')
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      const response = await createNotice(
        title,
        content,
        uploadedImageUrls || [], // Include image URLs in the save request
      )

      if (response.code === 200) {
        moveBack()
      } else {
        setSaveError('저장 중 오류가 발생했습니다.')
      }
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
        <div className="mt-[17px] ml-21 w-[746px] h-435 flex-grow overflow-y-auto border-1 border-solid border-[#00000014] rounded-xl shadow-md">
          <DynamicBlockNoteEditor
            domainName={domainName}
            imageUrls={setUploadedImageUrls}
            setContent={setContent}
          />
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
