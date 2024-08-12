import React, { useState, useCallback, useRef, useMemo } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import {
  RightSection2Props,
  Item,
  ApplicationPayload,
} from '@/type/application'
import { uploadImage } from '@/components/common/Application/api/documentApi'
import { Button } from '@nextui-org/react'
import { formatFileSize, truncateFileName } from './utils'

export default function RightSection2({
  onPrevious,
  onSubmit,
  onTempSave,
  formData,
  setFormData,
  uploadedFiles,
  setUploadedFiles,
  onFileUpload,
  onDeleteFile,
}: RightSection2Props) {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    isSingleParent: formData.isSingleParent === '1',
    isDisability: formData.isDisability === '1',
    isDualIncome: formData.isDualIncome === '1',
    isEmployeeCouple: formData.isEmployeeCouple === '1',
    isSibling: formData.isSibling === '1',
  })
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})
  const [items] = useState<Item[]>([
    { id: 'isSingleParent', name: '한부모 가정', isRequired: false },
    { id: 'isDisability', name: '장애 유무', isRequired: false },
    { id: 'isDualIncome', name: '맞벌이 여부', isRequired: false },
    { id: 'isEmployeeCouple', name: '부부 직원', isRequired: false },
    { id: 'isSibling', name: '형제자매 유무', isRequired: false },
  ])

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
        setIsUploading((prev) => ({ ...prev, [id]: true }))
        try {
          const url = await uploadImage(file)
          onFileUpload(id, file)
          setUploadedFiles((prev) => ({ ...prev, [id]: file }))
          setFormData((prev) => ({
            ...prev,
            imageUrls: { ...prev.imageUrls, [id]: url },
          }))
        } catch (error) {
          toast.error('파일 업로드 에러 발생', {
            autoClose: 1000,
            pauseOnHover: false,
          })
        } finally {
          setIsUploading((prev) => ({ ...prev, [id]: false }))
        }
      }
    },
    [onFileUpload, setFormData, setUploadedFiles],
  )

  const handleDeleteFile = useCallback(
    (id: string) => {
      onDeleteFile(id)
      setFormData((prev) => ({
        ...prev,
        imageUrls: { ...prev.imageUrls, [id]: '' },
      }))
    },
    [onDeleteFile, setFormData],
  )

  const handleSubmit = useCallback(() => {
    let validationPassed = true

    // Check if all selected items have corresponding uploaded files
    for (const [key, value] of Object.entries(selectedItems)) {
      if (value && !uploadedFiles[key]) {
        // If the checkbox is selected but no file is uploaded
        toast.error(
          `${items.find((item) => item.id === key)?.name}(을)를 위한 파일을 첨부해주세요`,
          {
            autoClose: 1000,
            pauseOnHover: false,
          },
        )
        validationPassed = false
      }
    }

    if (!validationPassed) {
      return // Stop submission if validation fails
    }

    const data: Partial<ApplicationPayload> = {
      ...Object.entries(selectedItems).reduce<Record<string, '0' | '1'>>(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value ? '1' : '0',
        }),
        {},
      ),
      imageUrls: Object.entries(uploadedFiles).reduce<Record<string, string>>(
        (acc, [key, file]) => ({
          ...acc,
          [key]: file.name,
        }),
        {},
      ),
    }

    onSubmit(data)
  }, [selectedItems, uploadedFiles, onSubmit, items])

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

  const getButtonText = useCallback(
    (id: string) => {
      if (isUploading[id]) {
        return '업로드 중...'
      }
      if (uploadedFiles[id]) {
        return '📎 완료'
      }
      return '📎 파일'
    },
    [isUploading, uploadedFiles],
  )

  const renderItem = useCallback(
    (item: Item) => (
      <div key={item.id} className="w-full mb-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => handleCheckboxChange(item.id)}
              className="w-[24px] h-[24px] border rounded-lg border-solid bg-white border-[#CCCCCC] flex items-center justify-center cursor-pointer mr-[16px] px-0 py-0"
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
            </Button>
            <span className="text-base">
              {item.name}
              {item.isRequired && (
                <span className="text-[#ea7465] ml-1">*</span>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleFileUpload(item.id)}
            className="w-[84px] h-[24px] bg-[#ffde8d] text-xs text-gray-700 rounded border-[1px] border-solid border-[#cccccc]"
          >
            {getButtonText(item.id)}
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
        <div className="ml-10 mt-2 flex items-center justify-between h-21">
          {uploadedFiles[item.id] ? (
            <>
              <div className="flex-1 mr-2 overflow-hidden">
                <span className="text-sm truncate block">
                  {truncateFileName(uploadedFiles[item.id]?.name || '', 30)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  {formatFileSize(uploadedFiles[item.id]?.size || 0)}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(item.id)}
                  className="text-[#ef4444] text-sm"
                >
                  X
                </button>
              </div>
            </>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [
      selectedItems,
      getButtonText,
      uploadedFiles,
      handleCheckboxChange,
      handleFileUpload,
      handleFileChange,
      handleDeleteFile,
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
      <div className="mt-85 w-[449px] h-[33px] flex items-center">
        <button
          type="button"
          onClick={onPrevious}
          className="w-[98px] h-[31px] bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
        >
          이전
        </button>
        <div className="w-[148px]" />
        <Button
          type="button"
          onClick={onTempSave}
          className="w-[98px] h-[31px] [background:linear-gradient(90deg,_rgba(255,_171,_45,_0.13),_rgba(153,_103,_27,_0.11))] border bg-[#fff] border-[#e6d5c5] font-bold text-[#fb923c] rounded-full text-sm"
        >
          임시저장
        </Button>
        <div className="w-[8px]" />
        <Button
          type="button"
          onClick={handleSubmit}
          className="w-[98px] h-[31px] shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
        >
          제출
        </Button>
      </div>
    </div>
  )
}
