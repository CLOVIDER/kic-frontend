export interface ApplicationPayload {
  isSingleParent: '0' | '1'
  childrenCnt: number
  isDisability: '0' | '1'
  isDualIncome: '0' | '1'
  isEmployeeCouple: '0' | '1'
  isSibling: '0' | '1'
  childrenRecruitList: {
    id: number
    name: string
    recruitId: number
  }[]
  imageUrls: {
    [key in DocumentType]: string
  }
}

export enum DocumentType {
  SINGLE_PARENT = 'SINGLE_PARENT',
  DISABILITY = 'DISABILITY',
  DUAL_INCOME = 'DUAL_INCOME',
  EMPLOYEE_COUPLE = 'EMPLOYEE_COUPLE',
  SIBLING = 'SIBLING',
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
