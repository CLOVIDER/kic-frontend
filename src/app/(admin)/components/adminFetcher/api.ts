import { http } from '@/api'
import { KindergartenStatus, NoticeStatus, RecruitStatusResponse } from './type'

export const getRecruitStatus = () =>
  http.get<RecruitStatusResponse>({
    url: '/api/admin/recruits/applications/status',
  })

export const getKindergaraten = () =>
  http.get<KindergartenStatus[]>({
    url: '/api/admin/recruits/kindergartens/status',
  })

export const getQnA = () =>
  http.get<number>({
    url: '/api/admin/qnas/waiting',
  })

export const getNotice = () =>
  http.get<NoticeStatus[]>({
    url: '/api/admin/notices/top3',
  })
