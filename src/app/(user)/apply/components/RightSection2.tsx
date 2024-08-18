import React, { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import {
  RightSection2Props,
  ApplicationPayload,
  Item,
  documentTypeMap,
} from '@/type/application'
import { Button } from '@nextui-org/react'
import { uploadDocument } from '../api'
import FormSection from './common/FormSection'
import CheckboxWithLabel from './common/CheckboxWithLabel'
import FileUploadButton from './common/FileUploadButton'
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
  selectedItems,
  onCheckboxChange,
}: RightSection2Props) {
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})
  const [items] = useState<Item[]>([
    { id: 'resident', name: '주민등록본', isRequired: true },
    { id: 'isSingleParent', name: '한부모 가정', isRequired: false },
    { id: 'isDisability', name: '장애 유무', isRequired: false },
    { id: 'isDualIncome', name: '맞벌이 여부', isRequired: false },
    { id: 'isEmployeeCouple', name: '부부 직원', isRequired: false },
    { id: 'isSibling', name: '형제자매 유무', isRequired: false },
  ])

  const handleFileUpload = useCallback(
    async (id: string, file: File) => {
      const documentType = documentTypeMap[id]
      setIsUploading((prev) => ({ ...prev, [documentType]: true }))
      try {
        const url = await uploadDocument(file)
        onFileUpload(documentType, file)
        setUploadedFiles((prev) => ({ ...prev, [documentType]: file }))
        setFormData((prev) => ({
          ...prev,
          fileUrls: { ...prev.fileUrls, [documentType]: url },
        }))
      } catch (error) {
        toast.error('파일 업로드 에러 발생', {
          autoClose: 1000,
          pauseOnHover: false,
        })
      } finally {
        setIsUploading((prev) => ({ ...prev, [documentType]: false }))
      }
    },
    [onFileUpload, setFormData, setUploadedFiles],
  )

  const handleSubmit = useCallback(async () => {
    let validationPassed = true

    for (const [key, value] of Object.entries(selectedItems)) {
      if (value && !uploadedFiles[documentTypeMap[key]]) {
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

    const { resident, ...filteredSelectedItems } = selectedItems
    const filteredFileUrls = Object.entries(formData.fileUrls)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, url]) => url !== '')
      .reduce((acc, [key, url]) => ({ ...acc, [key]: url }), {})

    const data: Partial<ApplicationPayload> = {
      ...Object.entries(filteredSelectedItems).reduce<
        Record<string, '0' | '1'>
      >(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value ? '1' : '0',
        }),
        {},
      ),
      fileUrls: filteredFileUrls,
      childrenRecruitList: formData.childrenRecruitList,
      childrenCnt: formData.childrenCnt,
    }

    onSubmit(data)
  }, [selectedItems, formData, uploadedFiles, items, onSubmit])

  return (
    <div className="w-453 h-500">
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
                  buttonText={
                    uploadedFiles[documentTypeMap[item.id]]
                      ? '📎 완료'
                      : '📎 파일'
                  }
                  isUploading={isUploading[documentTypeMap[item.id]]}
                />
              </div>
              <div className="ml-10 mt-2 flex items-center justify-between h-21">
                {uploadedFiles[documentTypeMap[item.id]] && (
                  <>
                    <div className="flex-1 mr-2 overflow-hidden">
                      <span className="text-sm truncate block">
                        {truncateFileName(
                          uploadedFiles[documentTypeMap[item.id]]?.name || '',
                          60,
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        {formatFileSize(
                          uploadedFiles[documentTypeMap[item.id]]?.size || 0,
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteFile(documentTypeMap[item.id])}
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
      <div className="mt-85 w-[449px] h-[33px] flex items-center">
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
          className="w-[98px] h-[31px] shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm"
        >
          제출
        </Button>
      </div>
    </div>
  )
}
