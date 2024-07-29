'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import RightSection1 from './RightSection1'
import RightSection2 from './RightSection2'
import submitApplication from '../api/submitApplication'

type ApplicationFormProps = {
  kindergartenName: string[]
  dropdownOptions: { key: string; label: string }[]
  tokens: { refreshToken: string; accessToken: string }
  ifCC: boolean
}

interface FormData {
  children: { name: string }[] // 적절한 타입으로 정의
  selectedOptions: string[];
}

export default function ApplicationForm({
  kindergartenName,
  dropdownOptions,
  tokens,
  ifCC,
}: ApplicationFormProps) {
  const [currentSection, setCurrentSection] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    children: [],
    selectedOptions: [],
  })
  const [direction, setDirection] = useState<number>(1)

  const handleNext = (
    children: FormData['children'],
    selectedOptions: string[],
  ) => {
    setFormData({ children, selectedOptions })
    setDirection(1)
    setCurrentSection(2)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentSection(1)
  }

  const handleSubmit = async (
    uploadedFiles: string[],
    selectedItems: boolean[],
  ) => {
    try {
      const applicationData = {
        isSingleParent: selectedItems[2] ? 'Y' : 'N',
        childrenCnt: formData.children.length,
        isDisability: selectedItems[3] ? 'Y' : 'N',
        isDualIncome: selectedItems[1] ? 'Y' : 'N',
        isEmployeeCouple: ifCC ? 'Y' : 'N',
        isSibling: selectedItems[5] ? 'Y' : 'N',
        childName: formData.children.map((child) => child.name).join(', '),
        isTemp: 'N',
        imageUrls: uploadedFiles.filter((url) => url !== null),
      }

      const result = await submitApplication(
        applicationData,
        tokens.accessToken,
      )
      console.log('Form submitted successfully:', result)
      toast.success('Form submitted successfully')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Error submitting form')
    }
  }

  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 300 : -300,
    }),
    in: { opacity: 1, x: 0 },
    out: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 300 : -300,
    }),
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.2,
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
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
            />
          ) : (
            <RightSection2
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
