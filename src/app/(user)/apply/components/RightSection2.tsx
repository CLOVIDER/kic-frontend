'use client'

import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { RightSection2Props, Item } from '@/type/application'
import { useRightSection2 } from '../hooks/useRightSection2'

export default function RightSection2({
  onPrevious,
  onSubmit,
}: RightSection2Props) {
  const {
    items,
    uploadedFiles,
    selectedItems,
    handleCheckboxChange,
    handleFileUpload,
    handleFileChange,
    handleDeleteFile,
    handleSubmit,
    fileInputRefs,
  } = useRightSection2(onSubmit)

  const renderItem = useCallback(
    (item: Item) => (
      <div key={item.id} className="w-full mb-10">
        <div className="flex justify-between">
          <div className="flex items-center">
            <button
              onClick={() => handleCheckboxChange(item.id)}
              className="w-24 h-24 border rounded-lg border-solid border-[#CCCCCC] flex items-center justify-center cursor-pointer mr-16"
              type="button"
            >
              {selectedItems[item.id] && (
                <Image
                  src="/images/check.svg"
                  alt="Checkmark"
                  width={24}
                  height={24}
                />
              )}
            </button>
            <span className="text-lg">
              {item.name}
              {item.isRequired && (
                <span className="text-[#ea7465] ml-1">*</span>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleFileUpload(item.id)}
            className="w-[84px] h-[24px] bg-[#ffde8d] text-12 text-gray-700 rounded border-[1px] border-solid border-[#cccccc]"
          >
            {uploadedFiles[item.id] ? '📎 완료' : '📎 파일'}
          </button>
          <input
            type="file"
            ref={(el) => {
              fileInputRefs.current[item.id] = el
            }}
            onChange={(e) => handleFileChange(item.id, e)}
            style={{ display: 'none' }}
          />
        </div>
        {uploadedFiles[item.id] && (
          <div className="ml-40 mt-2 flex items-center justify-between">
            <span className="text-sm">{uploadedFiles[item.id]?.name}</span>
            <button
              type="button"
              onClick={() => handleDeleteFile(item.id)}
              className="text-[#ef4444] text-sm"
            >
              X
            </button>
          </div>
        )}
      </div>
    ),
    [
      selectedItems,
      uploadedFiles,
      handleCheckboxChange,
      handleFileUpload,
      handleFileChange,
      handleDeleteFile,
      fileInputRefs,
    ],
  )

  const memoizedItems = useMemo(
    () => items.map(renderItem),
    [items, renderItem],
  )

  return (
    <div className="w-470 h-507">
      <div className="text-20 text-[#434343] flex flex-col">
        <div>해당되는 항목을 체크해주세요!</div>
        <div className="mt-1">당첨 시 가점 요인이 됩니다.</div>
      </div>

      <div className="ml-4 mt-5">
        <div className="text-[#E86565] text-12">
          체크한 항목을 증빙할 수 있는 서류를 각각 첨부해주세요.
        </div>
      </div>
      <div className="ml-7 mt-65 w-[444px]">{memoizedItems}</div>
      <div className="mt-200 w-[449px] h-[33px] flex items-center">
        <button
          type="button"
          onClick={onPrevious}
          className="w-[98px] h-[31px] bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
        >
          이전
        </button>
        <div className="w-[148px]" />
        <button
          type="button"
          className="w-[98px] h-[31px] [background:linear-gradient(90deg,_rgba(255,_171,_45,_0.13),_rgba(153,_103,_27,_0.11))] border border-[#e6d5c5] font-bold text-[#fb923c] rounded-full text-sm"
        >
          임시저장
        </button>
        <div className="w-[8px]" />
        <button
          type="button"
          onClick={handleSubmit}
          className="w-[98px] h-[31px] shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
        >
          제출
        </button>
      </div>
    </div>
  )
}
