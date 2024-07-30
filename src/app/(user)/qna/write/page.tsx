'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { BlockNoteEditor, PartialBlock, useCreateBlockNote } from '@blocknote/react'

const DynamicBlockNoteView = dynamic(() => import('@blocknote/mantine').then((mod) => mod.BlockNoteView), { ssr: false })

interface UploadedImage {
  url: string;
}

export default function Page() {
  const [title, setTitle] = useState<string>('')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [initialContent, setInitialContent] = useState<PartialBlock[]>([{ type: 'paragraph', content: '' }])
  const [toggled, setToggled] = useState<boolean>(false)

  const router = useRouter()

  const editor : BlockNoteEditor = useCreateBlockNote({
    initialContent,
    uploadFile: async (file: File) => {
      console.log('File upload requested:', file.name)
      return URL.createObjectURL(file)
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedContent = localStorage.getItem('editorContent')
      if (savedContent) {
        setInitialContent(JSON.parse(savedContent))
      }
    }
  }, [])

  useEffect(() => {
    if (editor && typeof window !== 'undefined') {
      const blocks = editor.document
      localStorage.setItem('editorContent', JSON.stringify(blocks))
    }
  }, [editor])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)

    const blocks = editor.document
    const data = {
      title,
      content: JSON.stringify(blocks),
    }

    try {
      // 여기서 실제 저장 API를 호출해야 합니다.
      console.log('Saving data:', data)
      alert('Saved successfully!')
    } catch (error) {
      console.error('Error saving data:', error)
      alert('An error occurred while saving.')
      setSaveError((error as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  const moveBack = () => {
    const path = '/qna/list'
    router.push(path)
  }

  const handleToggle = () => {
    setToggled(!toggled)
  }

  return (
    <div className="absolute w-[1280px] h-[720px] bg-white flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="mt-22 ml-36 text-32 font-inter font-bold h-[39px]">
          문의사항 작성
        </div>
        <div className="flex relative mt-16 ml-48 w-[451px] h-[24px]">
          <div className="w-[30px]">제목</div>
          <input
            className="ml-20 w-[267px] border-[#D5D1D1] border border-solid rounded-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="ml-20 w-[45px] text-16">비공개</div>
          <div
            className="relative ml-20"
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
          >
            <div
              className={`absolute top-[-0.5px] left-[-0.5px] rounded-32 bg-[#ffffff] box-border w-[50px] h-[25px] border-[1px] border-solid ${
                toggled ? 'border-[#FFAB2D]' : 'border-[#cccccc]'
              }`}
            />
            <div
              className={`absolute top-[2.5px] ${toggled ? 'left-[2.5px]' : 'left-[27.5px]'} rounded-32 ${
                toggled ? 'bg-[#FFAB2D]' : 'bg-[#f4f4f4]'
              } box-border w-[19px] h-[19px] border-[1px] border-solid border-[#cccccc] transition-all duration-300`}
            />
          </div>
        </div>
        <div className="mt-[17px] ml-21 w-[746px] h-[435px] flex-grow overflow-y-auto border-1 border-solid border-[#00000014] rounded-xl shadow-md">
          {editor && <DynamicBlockNoteView editor={editor} theme={'light'} />}
        </div>
        <div className="flex mt-8 ml-[556px] w-[211px] h-[31px]">
          <button
            className="w-[98px] h-[31px] bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
            onClick={moveBack}
          >
            작성취소
          </button>
          <button
            className="ml-20 w-[98px] h-[31px] shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}