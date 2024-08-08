export interface ApplicationPayload {
  isSingleParent: string
  childrenCnt: number
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  childrenRecruitList: Record<string, unknown>[]
  imageUrls: string
}

export interface ApplicationResponse {
  id: number
  createdAt: string
}

export interface Child {
  id: number
  name: string
  classes: Record<string, string>
  [key: string]: unknown
}
