'use client'

import {
  ApproveStatus,
  usePatchApprove,
} from '@/app/(admin)/components/Approve/api'
import { DocumentType } from '@/components/common/Application/ApplicationContext/api'
import { useState } from 'react'

export function useApprove(id: number) {
  const { mutate } = usePatchApprove(id)

  const [approvalStatus, setApprovalStatus] = useState<
    Partial<Record<DocumentType, ApproveStatus>>
  >({})

  const toggleApprovalStatus = (documentType: DocumentType) => {
    const newStatus =
      approvalStatus[documentType] === 'ACCEPT' ? 'UNACCEPT' : 'ACCEPT'

    const updatedStatus = {
      ...approvalStatus,
      [documentType]: newStatus,
    }

    setApprovalStatus(updatedStatus)

    mutate({
      data: updatedStatus,
    })
  }
  return {
    setApprovalStatus,
    toggleApprovalStatus,
    approvalStatus,
  }
}
