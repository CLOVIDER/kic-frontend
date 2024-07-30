'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useApplication } from '@/hooks/useApplication'
import RightSection1 from './RightSection1'
import RightSection2 from './RightSection2'
import { submitApplication, ApplicationRequest } from '../api/submitApplication'

type ApplicationFormProps = {
  kindergartenName: string[]
  dropdownOptions: { key: string; label: string }[]
  tokens: { refreshToken: string; accessToken: string }
  ifCC: boolean
}

interface FormData {
  children: { name: string }[] // 적절한 타입으로 정의
  selectedOptions: string[]
}

export default function ApplicationForm({
  kindergartenName,
  dropdownOptions,
  tokens,
  ifCC,
}: ApplicationFormProps) {
  const { submitForm, isLoading } = useApplication();
  const router = useRouter()
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
    const applicationData: ApplicationRequest = {
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

    await submitForm(applicationData, tokens.accessToken);
  }

  const pageVariants = {
    initial: () => ({
      opacity: 0,
      x: direction > 0 ? 300 : -300,
    }),
    in: { opacity: 1, x: 0 },
    out: () => ({
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
