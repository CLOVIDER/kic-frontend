import { Item, UploadedFile } from '@/type/application'
import { useState, useRef } from 'react'

export const useRightSection2 = (
  onSubmit: (uploadedFiles: string[], selectedItems: boolean[]) => void,
) => {
  const items: Item[] = [
    { id: 'resident', name: '주민등록등본', isRequired: true },
    { id: 'dualIncome', name: '맞벌이', isRequired: false },
    { id: 'singleParent', name: '한부모', isRequired: false },
    { id: 'disabledParent', name: '장애부모', isRequired: false },
    { id: 'multiChild', name: '다자녀가정', isRequired: false },
    { id: 'sibling', name: '형제/자매 채용 여부', isRequired: false },
  ]

  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, UploadedFile | null>
  >(Object.fromEntries(items.map((item) => [item.id, null])))
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((item) => [item.id, false])),
  )
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>(
    Object.fromEntries(items.map((item) => [item.id, null])),
  )

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleFileUpload = (id: string) => {
    fileInputRefs.current[id]?.click()
  }

  const handleFileChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [id]: { file, name: file.name },
      }))
    }
  }

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [id]: null,
    }))
  }

  const handleSubmit = () => {
    onSubmit(
      Object.values(uploadedFiles)
        .filter((file): file is UploadedFile => file !== null)
        .map((file) => file.name),
      Object.values(selectedItems),
    )
  }

  return {
    items,
    uploadedFiles,
    selectedItems,
    handleCheckboxChange,
    handleFileUpload,
    handleFileChange,
    handleDeleteFile,
    handleSubmit,
    fileInputRefs,
  }
}
