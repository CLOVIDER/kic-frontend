export interface ApplicationPayload {
  isSingleParent: string
  childrenCnt: number // string에서 number로 변경
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  childrenRecruitList: {
    childNm: string
    recruitIds: number[]
  }[]
  imageUrls: {
    [key: string]: string
  }
}

export interface ApplicationResponse {
  id: number
  createdAt: string
}

export interface FileUploadResponse {
  result: string
}

export interface KindergartenInfo {
  kindergartenNm: string
  recruitIds: number[]
  aggClasses: string[]
}

export interface RecruitResponse {
  result: KindergartenInfo[]
}
