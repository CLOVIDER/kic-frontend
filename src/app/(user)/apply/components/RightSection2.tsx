import React, { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { RightSection2Props, Item } from '@/type/application'
import { Button } from '@nextui-org/react'
import { ApplicationPayload, uploadDocument, UploadedFile } from '../api'
import FormSection from './common/FormSection'
import CheckboxWithLabel from './common/CheckboxWithLabel'
import FileUploadButton from './common/FileUploadButton'
import { formatFileSize, truncateFileName } from './utils'
import { getFile } from '../api/getFile'

export default function RightSection2({
  onPrevious,
  onSubmit,
  onTempSave,
  formData,
  uploadedFiles,
  setFormData,
  setUploadedFiles,
  onFileUpload,
  onDeleteFile,
  selectedItems,
  onCheckboxChange,
}: RightSection2Props) {
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})
  const [items] = useState<Item[]>([
    {
      id: 'isSingleParent',
      key: 'SINGLE_PARENT',
      name: '한부모 가정',
      isRequired: false,
    },
    {
      id: 'isDisability',
      key: 'DISABILITY',
      name: '장애 유무',
      isRequired: false,
    },
    {
      id: 'isDualIncome',
      key: 'DUAL_INCOME',
      name: '맞벌이 여부',
      isRequired: false,
    },
    {
      id: 'isMultiChildren',
      key: 'MULTI_CHILDREN',
      name: '부부 직원',
      isRequired: false,
    },
    {
      id: 'isSibling',
      key: 'SIBLING',
      name: '형제자매 유무',
      isRequired: false,
    },
  ])

  useEffect(() => {
    // 초기 파일 정보 업데이트
    const updateFileInfo = async () => {
      const updatedFiles: Record<string, UploadedFile> = {}
      for (const [key, url] of Object.entries(formData.fileUrls)) {
        if (url) {
          try {
            // eslint-disable-next-line no-await-in-loop
            const fileInfo = await getFile(url)
            if (fileInfo != null) {
              updatedFiles[key] = fileInfo
            }
          } catch (error) {
            console.error(`Error fetching file info for ${key}:`, error)
          }
        }
      }
      setUploadedFiles((prev) => ({ ...prev, ...updatedFiles }))
    }

    updateFileInfo()
  }, [formData.fileUrls, setUploadedFiles])
  // RightSection2 내부

  const handleFileUpload = async (key: string, file: File) => {
    setIsUploading((prev) => ({ ...prev, [key]: true }))
    try {
      const url = await uploadDocument(file)
      const fileData: UploadedFile = {
        file,
        url,
        name: file.name,
        size: file.size,
      }
      onFileUpload(key, fileData)
      setUploadedFiles((prev) => ({
        ...prev,
        [key]: fileData,
      }))
      setFormData((prev) => ({
        ...prev,
        imageUrls: { ...prev.fileUrls, [key]: url },
      }))
    } catch (error) {
      toast.error('파일 업로드 에러 발생')
    } finally {
      setIsUploading((prev) => ({ ...prev, [key]: false }))
    }
  }

  const handleSubmit = useCallback(async () => {
    let validationPassed = true

    for (const [key, value] of Object.entries(selectedItems)) {
      if (value && !uploadedFiles[key]) {
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
      return
    }

    const data: Partial<ApplicationPayload> = {
      ...Object.entries(selectedItems).reduce<Record<string, '0' | '1'>>(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value ? '1' : '0',
        }),
        {},
      ),
      fileUrls: formData.fileUrls,
    }

    // submitApplication 및 saveApplicationTemp 호출 제거
    onSubmit(data)
  }, [selectedItems, formData, uploadedFiles, items, onSubmit])

  return (
    <div>
      <div className="w-453 h-507 overflow-y-auto">
        <FormSection title="해당되는 항목을 체크해주세요!">
          <p className="mt-1">당첨 시 가점 요인이 됩니다.</p>
          <p className="text-[#E86565] text-12 mt-5">
            체크한 항목을 증빙할 수 있는 서류를 각각 첨부해주세요.
          </p>
          <div className="ml-7 mt-65 w-[444px]">
            {items.map((item) => (
              <div key={item.id} className="w-full mb-6 py-2">
                <div className="flex items-center justify-between">
                  <CheckboxWithLabel
                    id={item.id}
                    label={item.name}
                    isChecked={selectedItems[item.id]}
                    onChange={(id) => onCheckboxChange(id, !selectedItems[id])}
                    isRequired={item.isRequired}
                  />
                  <FileUploadButton
                    onUpload={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          handleFileUpload(item.id, file)
                        }
                      }
                      input.click()
                    }}
                    buttonText={uploadedFiles[item.id] ? '📎 완료' : '📎 파일'}
                    isUploading={isUploading[item.id]}
                  />
                </div>
                <div className="ml-10 mt-2 flex items-center justify-between h-21">
                  {uploadedFiles[item.id] && (
                    <>
                      <div className="flex-1 mr-2 overflow-hidden">
                        <span className="text-sm truncate block">
                          {truncateFileName(
                            uploadedFiles[item.id]?.name || '',
                            60,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">
                          {formatFileSize(uploadedFiles[item.id]?.size || 0)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onDeleteFile(item.id)}
                          className="text-[#ef4444] text-sm"
                        >
                          X
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FormSection>
      </div>
      <div className="w-[460  px] h-[33px] flex items-center">
        <Button
          onClick={onPrevious}
          className="w-[98px] h-[31px] bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
        >
          이전
        </Button>
        <div className="w-[148px]" />
        <Button
          onClick={onTempSave}
          className="w-[98px] h-[31px] [background:linear-gradient(90deg,_rgba(255,_171,_45,_0.13),_rgba(153,_103,_27,_0.11))] border bg-[#fff] border-[#e6d5c5] font-bold text-[#fb923c] rounded-full text-sm"
        >
          임시저장
        </Button>
        <div className="w-[8px]" />
        <Button
          onClick={handleSubmit}
          className="ml-10 w-[98px] h-[31px] shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
        >
          제출
        </Button>
      </div>
    </div>
  )
}
