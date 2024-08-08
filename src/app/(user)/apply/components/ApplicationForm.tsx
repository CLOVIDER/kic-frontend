'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ApplicationFormProps, ApplicationPayload } from '@/type/application'
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
    imageUrls: '',
  })
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>(
    {},
  )
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean
  }>({})

  const handleNext = (data: Partial<ApplicationPayload>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentSection(2)
  }

  const handlePrevious = () => {
    setCurrentSection(1)
  }

  const handleSubmit = async (data: Partial<ApplicationPayload>) => {
    const finalData = { ...formData, ...data }
    try {
      await submitApplication(finalData)
      // Handle successful submission
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
              initialData={formData}
            />
          ) : (
            <RightSection2
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              onTempSave={handleTempSave}
              initialData={formData}
              uploadedFiles={uploadedFiles}
              selectedItems={selectedItems}
              onFileUpload={handleFileUpload}
              onDeleteFile={handleDeleteFile}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
