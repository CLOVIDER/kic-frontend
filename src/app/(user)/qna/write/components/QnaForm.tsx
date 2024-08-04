'use client'

import React from 'react'
import DynamicBlockNoteEditor from '@/components/common/BlockNote/DynamicBlockNoteEditor'
import TitleInput from './TitleInput'
import PrivacyToggle from './PrivacyToggle'
import SaveButtons from './SaveButtons'
import { useQnaForm } from '../hooks/useQnaForm'

export default function QnaForm() {
  const {
    title,
    setTitle,
    toggled,
    handleToggle,
    handleSave,
    moveBack,
    isSaving,
    saveError,
  } = useQnaForm()

  return (
    <div className="absolute w-[1280px] h-[720px] bg-white flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="mt-22 ml-36 text-32 font-inter font-bold w-250 h-[39px]">
          문의사항 작성
        </div>
        <div className="flex relative mt-16 ml-48 w-[451px] h-[24px]">
          <TitleInput title={title} setTitle={setTitle} />
          <PrivacyToggle toggled={toggled} handleToggle={handleToggle} />
        </div>
        <div className="mt-[17px] ml-21 w-[746px] h-[435px] flex-grow overflow-y-auto border-1 border-solid border-[#00000014] rounded-xl shadow-md">
          <DynamicBlockNoteEditor />
        </div>
        <SaveButtons handleSave={handleSave} moveBack={moveBack} />
      </div>
      {isSaving && <div>저장 중...</div>}
      {saveError && <div>{saveError}</div>}
    </div>
  )
}
