'use client'

import {
  DocumentType,
  ApplicationFormProps,
  ApplicationPayload,
  Child,
} from '@/type/application'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RightSection1 from './RightSection1'
import RightSection2 from './RightSection2'
import { saveApplicationTemp, submitApplication } from '../api/api'
import { getRecruitData } from '@/components/common/Application/api/getData'

export default function ApplicationForm() {
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
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>(
    {},
  )
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean
  }>({})
  const [children, setChildren] = useState<Child[]>([])
  const [recruitData, setRecruitData] = useState<any>(null)

  useEffect(() => {
    const fetchRecruitData = async () => {
      try {
        const data = await getRecruitData()
        setRecruitData(data)
      } catch (error) {
        console.error('Error fetching recruit data:', error)
      }
    }
    fetchRecruitData()
  }, [])

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
      imageUrls: uploadedFiles,
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

  const handleFileUpload = (id: string, url: string) => {
    setUploadedFiles((prev) => ({ ...prev, [id]: url }))
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

  const kindergartenName =
    recruitData?.map((item: any) => item.kindergartenNm) || []

  const dropdownOptions =
    recruitData?.reduce((acc: any, item: any) => {
      acc[item.kindergartenNm] = item.aggClasses.map(
        (className: string, index: number) => ({
          key: item.recruitIds[index].toString(),
          label: className,
        }),
      )
      return acc
    }, {}) || {}

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
