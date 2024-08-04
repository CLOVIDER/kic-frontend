export interface RecruitStatusResponse {
  totalApplications: number
  unAcceptApplications: number
}

export interface KindergartenStatus {
  kindergartenNm: string
  acceptCnt: number
  unAcceptCnt: number
  waitCnt: number
}

export interface NoticeStatus {
  noticeId: 0
  title: string
  createdAt: string
}

export type KindergartenStatusResponse = KindergartenStatus[]
export type NoticeStatusResponse = NoticeStatus[]
