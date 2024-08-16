'use client'

import { generateContext } from '@/react-utils'
import {
  KindergartenStatus,
  NoticeStatus,
  RecruitStatusResponse,
  WaitingResponse,
} from './type'

export const [AdminRecruitProvider, useAdminRecuritContext] =
  generateContext<RecruitStatusResponse>({
    name: 'admin-recuruit-context',
  })

export const [AdminKinderStatusProvider, useAdminKinderStatusContext] =
  generateContext<{ kindergartens: KindergartenStatus[] }>({
    name: 'admin-kinder-status-context',
  })

export const [AdminQnAProvider, useAdminQnAContext] =
  generateContext<WaitingResponse>({
    name: 'admin-waiting-context',
  })
export const [AdminNoticeProvider, useAdminNoticeContext] = generateContext<{
  notices: NoticeStatus[]
}>({
  name: 'admin-notice-context',
})
