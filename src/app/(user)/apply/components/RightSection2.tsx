import React, { useState, useCallback, useRef, useMemo } from 'react'
import Image from 'next/image'
import {
  RightSection2Props,
  Item,
  ApplicationPayload,
} from '@/type/application'
import { uploadImage } from '@/components/common/Application/api/documentApi'

export default function RightSection2({
  onPrevious,
  onSubmit,
  onTempSave,
  setFormData,
  uploadedFiles,
  onFileUpload,
  onDeleteFile,
}: RightSection2Props) {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {},
  )
  const [items] = useState<Item[]>([
    { id: 'isSingleParent', name: '한부모 가정', isRequired: false },
    { id: 'isDisability', name: '장애 유무', isRequired: false },
    { id: 'isDualIncome', name: '맞벌이 여부', isRequired: false },
    { id: 'isEmployeeCouple', name: '부부 직원', isRequired: false },
    { id: 'isSibling', name: '형제자매 유무', isRequired: false },
  ])
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const handleFileUpload = useCallback((id: string) => {
    const fileInput = fileInputRefs.current[id]
    if (fileInput) {
      fileInput.click()
    }
  }, [])

  const handleFileChange = useCallback(
    async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setIsUploading({ ...isUploading, [id]: true })
        try {
          const url = await uploadImage(file)
          onFileUpload(id, url)
          setFormData((prev) => ({
            ...prev,
            imageUrls: { ...prev.imageUrls, [id]: url },
          }))
        } catch (error) {
          console.error('File upload failed:', error)
        } finally {
          setIsUploading({ ...isUploading, [id]: false })
        }
      }
    },
    [onFileUpload, setFormData, isUploading]
  )

  const handleSubmit = useCallback(() => {
    const data: Partial<ApplicationPayload> = {
      ...Object.entries(selectedItems).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value ? '1' : '0',
        }),
        {} as Record<string, '0' | '1'>,
      ),
      imageUrls: Object.entries(uploadedFiles).reduce(
        (acc, [key, file]) => ({
          ...acc,
          [key as keyof typeof DocumentType]: file.name,
        }),
        {} as Record<keyof typeof DocumentType, string>,
      ),
    }
    onSubmit(data)
  }, [selectedItems, uploadedFiles, onSubmit])

  const handleCheckboxChange = useCallback(
    (id: string) => {
      setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }))
      setFormData((prev) => ({
        ...prev,
        [id]: prev[id as keyof ApplicationPayload] === '1' ? '0' : '1',
      }))
    },
    [setFormData],
  )

  const handleDeleteFile = useCallback(
    (id: string) => {
      onDeleteFile(id)
    },
    [onDeleteFile],
  )

  const renderItem = useCallback(
    (item: Item) => (
      <div key={item.id} className="w-full mb-10">
        <div className="flex items-center justify-between">
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
            {isUploading[item.id] ? '업로드 중...' : uploadedFiles[item.id] ? '📎 완료' : '📎 파일'}
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
      isUploading,
    ],
  )

  const memoizedItems = useMemo(
    () => items.map(renderItem),
    [items, renderItem],
  )

  return (
    <div className="w-453 h-507 mt-109 mr-103">
      <div className="ml-4 mt-26">
        <div className="text-20 text-[#434343] flex flex-col">
          <div>해당되는 항목을 체크해주세요!</div>
          <div className="mt-1">당첨 시 가점 요인이 됩니다.</div>
        </div>
      </div>
      <div className="ml-4 mt-5">
        <div className="text-[#E86565] text-12">
          체크한 항목을 증빙할 수 있는 서류를 각각 첨부해주세요.
        </div>
      </div>
      <div className="ml-7 mt-65 w-[444px]">{memoizedItems}</div>
      <div className="mt-114 w-[449px] h-[33px] flex items-center">
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
          onClick={onTempSave}
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
