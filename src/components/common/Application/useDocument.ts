/* eslint-disable react-hooks/rules-of-hooks */

'use client'

import { useEffect, useState } from 'react'
import { ApproveStatus } from '@/app/(admin)/components/Approve/api'
import { useApprove } from '@/app/(admin)/components/Approve/useApprove'
import { DocumentType } from './ApplicationContext/api'
import { useDocumentContext } from './ApplicationContext/fetcher'

export function useDocumentLogic(
  type: 'admin' | 'user',
  applicationID?: number,
) {
  const { documents } = useDocumentContext()
  const { toggleApprovalStatus, setApprovalStatus } = applicationID
    ? useApprove(applicationID)
    : { toggleApprovalStatus: () => {}, setApprovalStatus: () => {} }

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [checkboxStates, setCheckboxStates] = useState(
    documents.reduce(
      (acc, doc) => {
        acc[doc.documentType] = doc.isAccept === 'ACCEPT'
        return acc
      },
      {} as Record<DocumentType, boolean>,
    ),
  )

  useEffect(() => {
    if (setApprovalStatus) {
      const initialApprovalStatus = documents.reduce(
        (acc, doc) => {
          acc[doc.documentType] = doc.isAccept
          return acc
        },
        {} as Record<DocumentType, ApproveStatus>,
      )
      setApprovalStatus(initialApprovalStatus)
    }
  }, [documents, setApprovalStatus])

  const handleButtonClick = (image: string) => {
    setSelectedImage(image)
  }

  const handleCheckboxChange = (documentType: DocumentType) => {
    if (toggleApprovalStatus) {
      toggleApprovalStatus(documentType)
    }
    setCheckboxStates((prevState) => ({
      ...prevState,
      [documentType]: !prevState[documentType],
    }))
  }

  function getLabelText(documentType: DocumentType): string {
    switch (documentType) {
      case DocumentType.RESIDENT_REGISTER:
        return '주민등록등본'
      case DocumentType.DUAL_INCOME:
        return '맞벌이'
      case DocumentType.SINGLE_PARENT:
        return '한부모'
      case DocumentType.DISABILITY:
        return '장애'
      case DocumentType.MULTI_CHILDREN:
        return '다자녀'
      case DocumentType.SIBLING:
        return '형제자매'
      default:
        return ''
    }
  }

  return {
    documents,
    selectedImage,
    checkboxStates,
    handleButtonClick,
    handleCheckboxChange,
    getLabelText,
  }
}
