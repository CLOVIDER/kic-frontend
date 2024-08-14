'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DynamicBlockNoteEditor from '@/components/common/BlockNote/DynamicBlockNoteEditor'
import { createQna } from '@/components/qna/api'
import { PartialBlock } from '@blocknote/core'
import TitleInput from './components/TitleInput'
import PrivacyToggle from './components/PrivacyToggle'
import SaveButtons from './components/SaveButtons'

export default function Page() {
  const [title, setTitle] = useState<string>('')
  const [question, setContent] = useState<string>('') // Rename 'content' to 'question'
  const [isVisibility, setIsVisibility] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialEditorContent, setInitialEditorContent] = useState<
    PartialBlock[] | undefined
  >(undefined)

  const router = useRouter()
  const domainName = 'qna'

  useEffect(() => {
    // 컴포넌트가 마운트될 때 세션 스토리지에서 내용을 불러옵니다.
    const savedContent = sessionStorage.getItem('editorContent')
    if (savedContent) {
      setInitialEditorContent(JSON.parse(savedContent))
      setContent(savedContent)
    }

    // 컴포넌트가 언마운트될 때 세션 스토리지를 초기화합니다.
    return () => {
      sessionStorage.removeItem('editorContent')
    }
  }, [])

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
        imageUrls || [{}],
      )

      if (response.code.toString() === 'COMMON200') {
        moveBack()
      } else {
        setSaveError(`저장 중 오류가 발생했습니다. : ${response.code}`)
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
            imageUrls={setImageUrls}
            setContent={(content) => {
              setContent(content)
              sessionStorage.setItem('editorContent', content) // 내용이 변경될 때마다 세션 스토리지에 저장
            }}
            // initialContent={initialEditorContent}
          />
        </div>
        <SaveButtons handleSave={handleSave} moveBack={moveBack} />
      </div>
      {isSaving && <div>저장 중...</div>}
      {saveError && <div>{saveError}</div>}
    </div>
  )
}
