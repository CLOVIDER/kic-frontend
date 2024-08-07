'use client'

import { StrictPropsWithChildren } from '@/type'
import {
  useKindergartenStatus,
  useNotice,
  useQnA,
  useRecruitStatus,
} from './queries'
import {
  AdminKinderStatusProvider,
  AdminNoticeProvider,
  AdminQnAProvider,
  AdminRecruitProvider,
} from './adminContext'

export function AdminRecruitFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useRecruitStatus()

  return <AdminRecruitProvider {...data}>{children}</AdminRecruitProvider>
}

export function AdminQnAFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useQnA()

  return <AdminQnAProvider {...{ num: data }}>{children}</AdminQnAProvider>
}

export function AdminNoticeFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useNotice()

  return <AdminNoticeProvider notices={data}>{children}</AdminNoticeProvider>
}

export function AdminKinderStatusFetcher({
  children,
}: StrictPropsWithChildren) {
  const { data } = useKindergartenStatus()

  return (
    <AdminKinderStatusProvider kindergartens={data}>
      {children}
    </AdminKinderStatusProvider>
  )
}
