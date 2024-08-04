'use client'

import { generateContext } from '@/react-utils'
import {
  KindergartenStatusResponse,
  NoticeStatusResponse,
  RecruitStatusResponse,
} from './type'

export interface AdminData {
  recruitStatus: RecruitStatusResponse
  kindergartenStatus: KindergartenStatusResponse
  qna: number
  notice: NoticeStatusResponse
}

export const [AdminProvider, useAdminContext] = generateContext<AdminData>({
  name: 'admin-context',
})
