// src/app/(user)/apply/components/ApplicationForm.tsx

'use client'

import { ApplicationPayload, Child, RecruitInfo } from '@/type/application'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRecruitData } from '@/components/common/Application/api/getRecruitData'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { saveApplicationTemp, submitApplication } from '../api/api'
import RightSection1 from './RightSection1'
import RightSection2 from './RightSection2'

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
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({})

  const router = useRouter()
  const [children, setChildren] = useState<Child[]>([
    { id: 1, name: '', classes: {} },
  ])

  const [recruitData, setRecruitData] = useState<
    { kindergartenNm: string; recruitIds: number[]; aggClasses: string[] }[]
  >([])

  useEffect(() => {
    const fetchRecruitData = async () => {
      try {
        const data = (await getRecruitData()) as RecruitInfo[]
        setRecruitData(data)
      } catch (error) {
        toast.error('Error fetching recruit data', {
          autoClose: 1000,
          pauseOnHover: false,
        })
      }
    }
    fetchRecruitData()
  }, [])

  const handleNext = (
    data: Partial<ApplicationPayload>,
    updatedChildren: Child[],
  ) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setChildren(updatedChildren)
    setCurrentSection(2)
  }

  const handlePrevious = () => {
    setCurrentSection(1)
  }

  const handleSubmit = async (data: Partial<ApplicationPayload>) => {
    // 유효성 검사
    const invalidChildren = children.filter(
      (child) =>
        !child.name ||
        Object.keys(child.classes).length === 0 ||
        Object.values(child.classes).some((value) => !value),
    )

    if (invalidChildren.length > 0) {
      invalidChildren.forEach((child, index) => {
        if (!child.name) {
          toast.error(`아이 ${index + 1}의 이름을 입력해주세요.`, {
            autoClose: 1000,
            pauseOnHover: false,
          })
        } else if (
          Object.keys(child.classes).length === 0 ||
          Object.values(child.classes).some((value) => !value)
        ) {
          toast.error(
            `아이 ${index + 1}의 모든 어린이집 분반을 선택해주세요.`,
            {
              autoClose: 1000,
              pauseOnHover: false,
            },
          )
        }
      })
      return // 제출 중단
    }

    const childrenRecruitList = children
      .filter((child) => child.name && Object.keys(child.classes).length > 0)
      .map((child) => ({
        childNm: child.name,
        recruitIds: Object.values(child.classes).map(
          (recruitId) => parseInt(recruitId, 10) + 1,
        ),
      }))

    const finalData: ApplicationPayload = {
      ...formData,
      ...data,
      childrenRecruitList,
      childrenCnt: childrenRecruitList.length,
      imageUrls: uploadedFiles,
    }

    try {
      await submitApplication(finalData)
      toast.info('제출되었습니다!', {
        autoClose: 500,
        onClose: () => router.push('/'),
        pauseOnHover: false,
      })
      // 성공 처리 로직
    } catch (error) {
      toast.error('알수없는 오류가 발생하였습니다. 다시 시도해주세요', {
        autoClose: 1000,
        pauseOnHover: false,
      })
    }
  }

  const handleTempSave = async () => {
    const childrenRecruitList = children
      .filter((child) => child.name && Object.keys(child.classes).length > 0)
      .map((child) => ({
        childNm: child.name,
        recruitIds: Object.values(child.classes).map(
          (recruitId) => parseInt(recruitId, 10) + 1,
        ),
      }))

    const finalData: ApplicationPayload = {
      ...formData,
      childrenRecruitList,
      childrenCnt: childrenRecruitList.length,
      imageUrls: uploadedFiles,
    }

    try {
      await saveApplicationTemp(finalData)
      toast.info('임시저장 되었습니다!', {
        autoClose: 500,
        onClose: () => router.push('/'),
        pauseOnHover: false,
      })
    } catch (error) {
      toast.error('알수없는 오류가 발생하였습니다. 다시 시도해주세요', {
        autoClose: 1000,
        pauseOnHover: false,
      })
    }
  }

  const handleFileUpload = (id: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [id]: file }))
    // FormData에 File 객체 직접 저장
    setFormData((prev) => ({
      ...prev,
      imageUrls: { ...prev.imageUrls, [id]: file },
    }))
  }

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev }
      delete newFiles[id]
      return newFiles
    })
    // FormData에서도 삭제
    setFormData((prev) => {
      const newImageUrls = { ...prev.imageUrls }
      delete newImageUrls[id]
      return { ...prev, imageUrls: newImageUrls }
    })
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

  const kindergartenName = recruitData?.map((item) => item.kindergartenNm) || []

  const dropdownOptions = recruitData.reduce(
    (acc: { [key: string]: { key: string; label: string }[] }, item) => {
      acc[item.kindergartenNm] = item.aggClasses.map(
        (className: string, index: number) => ({
          key: item.recruitIds[index].toString(),
          label: className,
        }),
      )
      return acc
    },
    {},
  )

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
              setChildren={setChildren}
              setFormData={setFormData}
            >
              {children}
            </RightSection1>
          ) : (
            <RightSection2
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              onTempSave={handleTempSave}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
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
