import React, { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { RightSection2Props, Item, predata } from '@/type/application'
import { Button } from '@nextui-org/react'
import { ApplicationPayload, uploadDocument } from '../api'
import FormSection from './common/FormSection'
import CheckboxWithLabel from './common/CheckboxWithLabel'
import FileUploadButton from './common/FileUploadButton'
import { truncateFileName } from './utils'
import { FileInfo, getFileInfoFromUrl } from '../api/getFile'
import SubmitModal from './SubmitModal'

export default function RightSection2({
  onPrevious,
  onSubmit,
  // onTempSave,
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
  const [items] = useState(predata as Item[])
  // const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // formData.fileUrls 정보를 기반으로 체크박스 상태를 업데이트
    predata.forEach((item) => {
      if (formData.fileUrls[item.key]) {
        if (!selectedItems[item.id]) {
          onCheckboxChange(item.id, true) // 파일 URL이 있으면 체크박스를 true로 설정
        }
      }
    })
  }, [formData.fileUrls, selectedItems, onCheckboxChange])

  useEffect(() => {
    const updateFileInfo = async () => {
      const updatedFiles: Record<string, FileInfo> = {}
      for (const [key, url] of Object.entries(formData.fileUrls)) {
        if (url) {
          try {
            // eslint-disable-next-line no-await-in-loop
            const fileInfo = await getFileInfoFromUrl(url)
            if (fileInfo != null) {
              updatedFiles[key] = {
                name: fileInfo.name,
                url: fileInfo.url,
              }
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

  const handleFileUpload = async (key: string, file: File) => {
    setIsUploading((prev) => ({ ...prev, [key]: true }))
    try {
      const url = await uploadDocument(file)
      const fileData: FileInfo = {
        url,
        name: file.name,
      }
      onFileUpload(key, fileData)
      setUploadedFiles((prev) => ({
        ...prev,
        [key]: fileData,
      }))
      setFormData((prev) => ({
        ...prev,
        fileUrls: { ...prev.fileUrls, [key]: url },
      }))

      // 파일 업로드가 성공하면 해당 체크박스를 체크 상태로 변경
      const matchedItem = items.find((itm) => itm.key === key)
      if (matchedItem) {
        onCheckboxChange(matchedItem.id, true)
      }
    } catch (error) {
      toast.error('파일 업로드 에러 발생', {
        autoClose: 1000,
        pauseOnHover: false,
      })
    } finally {
      setIsUploading((prev) => ({ ...prev, [key]: false }))
    }
  }

  const handleSubmit = useCallback(async () => {
    let validationPassed = true

    for (const item of items) {
      if (selectedItems[item.id] && !formData.fileUrls[item.key]) {
        console.log('Missing file for key:', item.key)
        toast.error(`${item.name}(을)를 위한 파일을 첨부해주세요`, {
          autoClose: 1000,
          pauseOnHover: false,
        })
        validationPassed = false
      }
    }
    if (!validationPassed) {
      return
    }

    const data: Partial<ApplicationPayload> = {
      ...Object.fromEntries(
        items.map((item) => [item.id, selectedItems[item.id] ? '1' : '0']),
      ),
      fileUrls: formData.fileUrls,
    }

    onSubmit(data)
  }, [selectedItems, formData, items, onSubmit])

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
                          handleFileUpload(item.key, file)
                        }
                      }
                      input.click()
                    }}
                    buttonText={
                      formData.fileUrls[item.key] ? '📎 완료' : '📎 파일'
                    }
                    isUploading={isUploading[item.key]}
                  />
                </div>
                <div className="ml-10 mt-2 flex items-center justify-between h-21">
                  {formData.fileUrls[item.key] && (
                    <>
                      <div className="flex-1 mr-2 overflow-hidden">
                        <span className="text-sm truncate block">
                          {truncateFileName(
                            uploadedFiles[item.key]?.name || '',
                            60,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => onDeleteFile(item.key)}
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
        <div className="w-[246px]" />
        <div className="w-[8px]" />
        <SubmitModal
          formData={formData}
          uploadedFiles={uploadedFiles}
          onSubmit={handleSubmit}
        >
          {(onOpen) => (
            <Button
              onClick={onOpen}
              className="ml-10 w-[98px] h-[31px] bg-[#ffb74d] font-bold text-white rounded-full text-sm"
            >
              제출
            </Button>
          )}
        </SubmitModal>
      </div>
    </div>
  )
}
