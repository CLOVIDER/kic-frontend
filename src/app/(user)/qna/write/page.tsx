'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import DynamicBlockNoteEditor from '@/components/common/BlockNote/DynamicBlockNoteEditor'
import { createQna } from '@/components/qna/api'
import TitleInput from './components/TitleInput'
import PrivacyToggle from './components/PrivacyToggle'
import SaveButtons from './components/SaveButtons'

export default function Page() {
  const [title, setTitle] = useState<string>('')
  const [question] = useState<string>('')
  const [isVisibility, setIsVisibility] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]) // Track uploaded image URLs

  const router = useRouter()

  const domainName = 'qna'

  const moveBack = () => {
    router.push('/qna')
  }

  const handleToggle = () => {
    setIsVisibility(!isVisibility)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      const response = await createQna(
        title,
        question,
        isVisibility ? '1' : '0',
        uploadedImageUrls,
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
    <div className="absolute w-[1280px] h-[720px] bg-white flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="mt-22 ml-36 text-32 font-inter font-bold w-250 h-[39px]">
          문의사항 작성
        </div>
        <div className="flex relative mt-16 ml-48 w-[451px] h-[24px]">
          <TitleInput title={title} setTitle={setTitle} />
          <PrivacyToggle
            isVisibility={isVisibility}
            handleToggle={handleToggle}
          />
        </div>
        <div className="mt-[17px] ml-21 w-[746px] h-[435px] flex-grow overflow-y-auto border-1 border-solid border-[#00000014] rounded-xl shadow-md">
          <DynamicBlockNoteEditor
            domainName={domainName}
            setUploadedImageUrls={setUploadedImageUrls}
          />
        </div>
        <SaveButtons handleSave={handleSave} moveBack={moveBack} />
      </div>
      {isSaving && <div>저장 중...</div>}
      {saveError && <div>{saveError}</div>}
    </div>
  )
}
