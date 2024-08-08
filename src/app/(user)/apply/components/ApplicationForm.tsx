'use client'

import {
  DocumentType,
  ApplicationFormProps,
  ApplicationPayload,
  Child,
} from '@/type/application'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RightSection1 from './RightSection1'
import RightSection2 from './RightSection2'
import { saveApplicationTemp, submitApplication } from '../api/api'

export default function ApplicationForm({
  kindergartenName,
  dropdownOptions,
}: ApplicationFormProps) {
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState<ApplicationPayload>({
    isSingleParent: '0',
    childrenCnt: 0,
    isDisability: '0',
    isDualIncome: '0',
    isEmployeeCouple: '0',
    isSibling: '0',
    childrenRecruitList: [],
    imageUrls: {
      SINGLE_PARENT: '',
      DISABILITY: '',
      DUAL_INCOME: '',
      EMPLOYEE_COUPLE: '',
      SIBLING: '',
    },
  })
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>(
    {},
  )
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean
  }>({})

  const [children, setChildren] = useState<Child[]>([])

  const handleNext = (data: Partial<ApplicationPayload>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentSection(2)
  }

  const handlePrevious = () => {
    setCurrentSection(1)
  }

  const handleSubmit = async (data: Partial<ApplicationPayload>) => {
    const finalData = {
      ...formData,
      ...data,
      childrenRecruitList: children.map((child) => ({
        id: child.id,
        name: child.name,
        recruitId: parseInt(Object.values(child.classes)[0], 10),
      })),
      imageUrls: Object.fromEntries(
        Object.entries(uploadedFiles).map(([key, file]) => [
          DocumentType[key as keyof typeof DocumentType],
          file.name,
        ]),
      ) as { [key in DocumentType]: string },
    }
    try {
      await submitApplication(finalData as ApplicationPayload)
      // 성공 처리 로직
    } catch (error) {
      console.error('Error submitting application:', error)
    }
  }

  const handleTempSave = async () => {
    try {
      await saveApplicationTemp(formData)
      // Handle successful temp save
    } catch (error) {
      console.error('Error saving application temporarily:', error)
    }
  }

  const handleFileUpload = (id: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [id]: file }))
  }

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev }
      delete newFiles[id]
      return newFiles
    })
  }

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 300 : -300,
    }),
    in: { opacity: 1, x: 0 },
    out: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 300 : -300,
    }),
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.2,
  }

  return (
    <div>
      <AnimatePresence mode="wait" custom={currentSection === 1 ? 1 : -1}>
        <motion.div
          key={currentSection}
          custom={currentSection === 1 ? 1 : -1}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="absolute right-0"
        >
          {currentSection === 1 ? (
            <RightSection1
              kindergartenName={kindergartenName}
              dropdownOptions={dropdownOptions}
              onSubmit={handleNext}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <RightSection2
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              onTempSave={handleTempSave}
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
              onDeleteFile={handleDeleteFile}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
