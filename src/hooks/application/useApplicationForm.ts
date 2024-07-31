'use client'

import { useState } from 'react'
import { FormData, Child } from '../../type/application'

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    children: [],
    selectedOptions: [],
    uploadedFiles: [],
    selectedItems: [],
  })

  const [currentSection, setCurrentSection] = useState<number>(1)

  const handleNext = (children: Child[], selectedOptions: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      children,
      selectedOptions,
    }))
    setCurrentSection(2)
  }

  const handlePrevious = () => {
    setCurrentSection(1)
  }

  const handleSubmit = (uploadedFiles: string[], selectedItems: boolean[]) => {
    setFormData((prevData) => ({
      ...prevData,
      uploadedFiles,
      selectedItems,
    }))
    // 로직 추가할 부분. 테스트 위해 console.log 로 임시 대체.
    console.log('Final form data:', {
      ...formData,
      uploadedFiles,
      selectedItems,
    })
  }

  return {
    formData,
    currentSection,
    handleNext,
    handlePrevious,
    handleSubmit,
  }
}
