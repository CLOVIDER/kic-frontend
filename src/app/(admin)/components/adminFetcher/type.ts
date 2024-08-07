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
  noticeId: number
  title: string
  createdAt: string
}

export interface WaitingResponse {
  num: number
}
