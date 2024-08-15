// src/app/(user)/apply/components/ApplicationForm.tsx

'use client'

import {
  ApplicationPayload,
  Child,
  DropdownOption,
  DropdownOptions,
} from '@/type/application'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
  saveApplicationTemp,
  submitApplication,
  RecruitInfo,
  getRecruitData,
} from '../api'
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
  const [selectedLabels, setSelectedLabels] = useState<
    Record<string, Record<string, string>>
  >({})

  const router = useRouter()
  const [children, setChildren] = useState<Child[]>([
    { id: 1, name: '', classes: {} },
  ])

  const [recruitData, setRecruitData] = useState<
    { kindergartenNm: string; recruitIds: number[]; ageClasses: string[] }[]
  >([])
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    isSingleParent: false,
    isDisability: false,
    isDualIncome: false,
    isEmployeeCouple: false,
    isSibling: false,
  })

  const handleCheckboxChange = (id: string, value: boolean) => {
    setSelectedItems((prev) => ({ ...prev, [id]: value }))
    setFormData((prev) => ({ ...prev, [id]: value ? '1' : '0' }))
  }

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

  // const handleSubmit = async (data: Partial<ApplicationPayload>) => {
  //   // 유효성 검사
  //   const invalidChildren = children.filter(
  //     (child) =>
  //       !child.name ||
  //       Object.keys(child.classes).length === 0 ||
  //       Object.values(child.classes).some((value) => !value),
  //   )

  //   if (invalidChildren.length > 0) {
  //     invalidChildren.forEach((child, index) => {
  //       if (!child.name) {
  //         toast.error(`아이 ${index + 1}의 이름을 입력해주세요.`, {
  //           autoClose: 1000,
  //           pauseOnHover: false,
  //         })
  //       } else if (
  //         Object.keys(child.classes).length === 0 ||
  //         Object.values(child.classes).some((value) => !value)
  //       ) {
  //         toast.error(
  //           `아이 ${index + 1}의 모든 어린이집 분반을 선택해주세요.`,
  //           {
  //             autoClose: 1000,
  //             pauseOnHover: false,
  //           },
  //         )
  //       }
  //     })
  //     return // 제출 중단
  //   }

  //   const childrenRecruitList = children
  //     .filter((child) => child.name && Object.keys(child.classes).length > 0)
  //     .map((child) => ({
  //       childNm: child.name,
  //       recruitIds: Object.values(child.classes).map(
  //         (recruitId) => parseInt(recruitId, 10), // `recruitId`를 숫자로 변환하여 그대로 사용
  //       ),
  //     }))

  //   const finalData: ApplicationPayload = {
  //     ...formData,
  //     ...data,
  //     childrenRecruitList,
  //     childrenCnt: childrenRecruitList.length,
  //     imageUrls: uploadedFiles,
  //   }

  //   try {
  //     await submitApplication(finalData)
  //     toast.info('제출되었습니다!', {
  //       autoClose: 500,
  //       onClose: () => router.push('/'),
  //       pauseOnHover: false,
  //     })
  //     // 성공 처리 로직
  //   } catch (error) {
  //     toast.error('알수없는 오류가 발생하였습니다. 다시 시도해주세요', {
  //       autoClose: 1000,
  //       pauseOnHover: false,
  //     })
  //   }
  // }

  // const handleTempSave = async () => {
  //   const childrenRecruitList = children
  //     .filter((child) => child.name && Object.keys(child.classes).length > 0)
  //     .map((child) => ({
  //       childNm: child.name,
  //       recruitIds: Object.values(child.classes).map(
  //         (recruitId) => parseInt(recruitId, 10), // `recruitId`를 숫자로 변환하여 그대로 사용
  //       ),
  //     }))

  //   const finalData: ApplicationPayload = {
  //     ...formData,
  //     childrenRecruitList,
  //     childrenCnt: childrenRecruitList.length,
  //     imageUrls: uploadedFiles,
  //   }

  //   try {
  //     await saveApplicationTemp(finalData)
  //     toast.info('임시저장 되었습니다!', {
  //       autoClose: 500,
  //       onClose: () => router.push('/'),
  //       pauseOnHover: false,
  //     })
  //   } catch (error) {
  //     toast.error('알수없는 오류가 발생하였습니다. 다시 시도해주세요', {
  //       autoClose: 1000,
  //       pauseOnHover: false,
  //     })
  //   }
  // }

  // 수정된 handleSubmit 함수
  const handleSubmit = async (data: Partial<ApplicationPayload>) => {
    const childrenRecruitList = children
      .filter((child) => child.name && Object.keys(child.classes).length > 0)
      .map((child) => ({
        childNm: child.name,
        recruitIds: Object.values(child.classes).map(
          (recruitId) => parseInt(recruitId, 10), // recruitId를 숫자로 변환하여 사용
        ),
      }))

    const selectedImageUrls = Object.entries(formData.imageUrls).reduce(
      (acc, [key, url]) => {
        if (typeof url === 'string' && url) {
          // url이 string인지 확인
          acc[key] = url
        }
        return acc
      },
      {} as Record<string, string>,
    )

    const finalData: ApplicationPayload = {
      ...formData,
      ...data,
      childrenRecruitList,
      childrenCnt: childrenRecruitList.length,
      imageUrls: selectedImageUrls,
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

  // 수정된 handleTempSave 함수
  const handleTempSave = async () => {
    const childrenRecruitList = children
      .filter((child) => child.name && Object.keys(child.classes).length > 0)
      .map((child) => ({
        childNm: child.name,
        recruitIds: Object.values(child.classes).map(
          (recruitId) => parseInt(recruitId, 10), // recruitId를 숫자로 변환하여 사용
        ),
      }))

    const selectedImageUrls = Object.entries(formData.imageUrls).reduce(
      (acc, [key, url]) => {
        if (typeof url === 'string' && url) {
          // url이 string인지 확인
          acc[key] = url
        }
        return acc
      },
      {} as Record<string, string>,
    )

    const finalData: ApplicationPayload = {
      ...formData,
      childrenRecruitList,
      childrenCnt: childrenRecruitList.length,
      imageUrls: selectedImageUrls,
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

  const dropdownOptions: DropdownOptions = recruitData.reduce(
    (acc: DropdownOptions, item) => {
      acc[item.kindergartenNm] = item.recruitIds.map((id, index) => ({
        key: id.toString(),
        label: item.ageClasses[index],
      }))
      return acc
    },
    {},
  )

  const handleDropdownSelect = (
    childId: number,
    kindergarten: string,
    option: DropdownOption,
  ) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) => {
        if (child.id === childId) {
          return {
            ...child,
            classes: { ...child.classes, [kindergarten]: option.key }, // recruitId 저장
          }
        }
        return child
      }),
    )

    setSelectedLabels((prev) => ({
      ...prev,
      [childId.toString()]: {
        ...prev[childId.toString()],
        [kindergarten]: option.label,
      },
    }))
  }

  return (
    <div className="overflow-y-auto w-500 h-[550px] pb-100">
      <AnimatePresence mode="wait" custom={currentSection === 1 ? 1 : -1}>
        <motion.div
          key={currentSection}
          custom={currentSection === 1 ? 1 : -1}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className=""
        >
          {currentSection === 1 ? (
            <RightSection1
              kindergartenName={kindergartenName}
              dropdownOptions={dropdownOptions}
              onSubmit={handleNext}
              formData={formData}
              setChildren={setChildren}
              setFormData={setFormData}
              selectedLabels={selectedLabels}
              handleDropdownSelect={handleDropdownSelect}
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
              selectedItems={selectedItems}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
