'use client'

import { Child, DropdownOption, DropdownOptions } from '@/type/application'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
  saveApplicationTemp,
  submitApplication,
  RecruitInfo,
  getRecruitData,
  getApplicationData,
  editApplication,
  ApplicationPayload,
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
    fileUrls: {
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

  const [recruitData, setRecruitData] = useState<RecruitInfo[]>([])
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
  const [isLoading, setIsLoading] = useState(true)
  const [applicationId, setApplicationId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedRecruitData, applicationData] = await Promise.all([
          getRecruitData(),
          getApplicationData(),
        ])
        console.log('Fetched Application Data:', applicationData)

        setRecruitData(fetchedRecruitData)

        if (applicationData) {
          setApplicationId(applicationData.id)

          // File URLs and Uploaded Files Setup
          const fetchedFileUrls = applicationData.documents.reduce(
            (acc, document) => {
              acc[document.documentType] = document.image
              return acc
            },
            {} as Record<string, string>,
          )

          const fetchedUploadedFiles = applicationData.documents.reduce(
            (acc, document) => {
              acc[document.documentType] = new File([], document.image) // Here, File creation might need adjustment if you have access to the file metadata.
              return acc
            },
            {} as Record<string, File>,
          )

          setFormData((prevData) => ({
            ...prevData,
            ...applicationData,
            fileUrls: fetchedFileUrls,
          }))

          setUploadedFiles(fetchedUploadedFiles)

          // Process children and selected labels
          const updatedChildren = applicationData.childrenRecruitList.map(
            (child, index) => {
              const classes = child.recruitIds.reduce(
                (acc, recruitId) => {
                  const kindergarten = fetchedRecruitData.find((k) =>
                    k.recruitIds.includes(recruitId),
                  )?.kindergartenNm
                  if (kindergarten) {
                    acc[kindergarten] = recruitId.toString()
                  }
                  return acc
                },
                {} as Record<string, string>,
              )
              return {
                id: index + 1,
                name: child.childNm,
                classes,
              }
            },
          )
          setChildren(updatedChildren)

          // Update selectedLabels state
          const newSelectedLabels = updatedChildren.reduce(
            (acc, child) => {
              Object.keys(child.classes).forEach((kindergarten) => {
                const recruitId = child.classes[kindergarten]
                const recruitDataItem = fetchedRecruitData.find(
                  (r) => r.kindergartenNm === kindergarten,
                )
                const label = recruitDataItem?.ageClasses.find(
                  (_, idx) => recruitDataItem.recruitIds[idx] === +recruitId,
                )
                if (label) {
                  if (!acc[child.id.toString()]) {
                    acc[child.id.toString()] = {}
                  }
                  acc[child.id.toString()][kindergarten] = label
                }
              })
              return acc
            },
            {} as Record<string, Record<string, string>>,
          )
          setSelectedLabels(newSelectedLabels)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('데이터를 불러오는 데 실패했습니다.', {
          autoClose: 1000,
          pauseOnHover: false,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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

    const selectedImageUrls = Object.entries(formData.fileUrls).reduce(
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
      fileUrls: selectedImageUrls,
    }

    try {
      if (applicationId !== null) {
        await editApplication(finalData, applicationId)
      } else {
        await submitApplication(finalData)
      }
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

    const selectedImageUrls = Object.entries(formData.fileUrls).reduce(
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
      fileUrls: selectedImageUrls,
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
      fileUrls: { ...prev.fileUrls, [id]: file },
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
      const newImageUrls = { ...prev.fileUrls }
      delete newImageUrls[id]
      return { ...prev, fileUrls: newImageUrls }
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-500 h-[550px] pb-100">
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
