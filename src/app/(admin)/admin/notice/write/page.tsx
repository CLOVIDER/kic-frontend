'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

// const BlockNoteView = dynamic(() => import("@blocknote/mantine").then(mod => mod.BlockNoteView), { ssr: false })

export default function Page() {
  const [title, setTitle] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSaving, setIsSaving] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saveError, setSaveError] = useState<string | null>(null)
  const [toggled, setToggled] = useState<boolean>(false)
  const router = useRouter()

  const editor = useCreateBlockNote()

  const moveBack = () => {
    router.push('/admin/notice')
  }

  useEffect(() => {
    // Set up event listener
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        moveBack()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggle = () => {
    setToggled(!toggled)
  }

  const handleSave = () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      // Save logic
      moveBack()
    } catch (error) {
      setSaveError('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="absolute w-[1280px] h-[720px] bg-white flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="mt-22 ml-36 text-32 font-inter font-bold h-39">
          공지사항 작성
        </div>
        <div className="flex relative mt-16 ml-48 w-451 h-24">
          <div className="w-30">제목</div>
          <input
            className="ml-20 w-267 border-[#D5D1D1] border border-solid rounded-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-[17px] ml-21 w-[746px] h-435 flex-grow overflow-y-auto border-1 border-solid border-[#00000014] rounded-xl shadow-md">
          {editor && <BlockNoteView editor={editor} theme="light" />}
        </div>
        <div className="flex mt-8 ml-[556px] w-211 h-31">
          <button
            type="button" // Add the type attribute with the value "button"
            className="w-98 h-31 bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
            onClick={moveBack}
          >
            작성취소
          </button>
          <button
            type="button" // Add the type attribute with the value "button"
            className="ml-20 w-98 h-31 shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
