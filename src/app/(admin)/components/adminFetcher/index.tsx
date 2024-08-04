'use client'

import { StrictPropsWithChildren } from '@/type'
import {
  useKindergartenStatus,
  useNotice,
  useQnA,
  useRecruitStatus,
} from './queries'
import { AdminProvider } from './adminContext'

export function AdminFetcher({ children }: StrictPropsWithChildren) {
  const { data: recruitStatus } = useRecruitStatus()
  const { data: qna } = useQnA()
  const { data: notice } = useNotice()
  const { data: kindergartenStatus } = useKindergartenStatus()

  const adminData = {
    recruitStatus,
    qna,
    notice,
    kindergartenStatus,
  }

  return (
    <AdminProvider
      {...{
        adminData,
      }}
    >
      {children}
    </AdminProvider>
  )
}
