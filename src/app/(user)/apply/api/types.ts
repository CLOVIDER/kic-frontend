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
  ageClasses: string[]
}

export interface RecruitResponse {
  result: KindergartenInfo[]
}

export interface EmployeeInfo {
  nameKo: string
  accountId: string
  employeeNo: number
  isCouple: boolean
  workedAt: Date
}

export interface RecruitInfo {
  kindergartenNm: string
  recruitIds: number[]
  ageClasses: string[]
}

export interface ApplicationStatus extends ApplicationPayload {
  id: number
}

export interface ApplicationPayload {
  isSingleParent: string
  childrenCnt: number
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  childrenRecruitList: {
    childNm: string
    recruitIds: number[]
  }[]
  fileUrls: {
    [key: string]: File | string
  }
}

export interface Child {
  id: number
  name: string
  classes: Record<string, string>
}

export interface DropdownOption {
  key: string
  label: string
}

export type DropdownOptions = Record<string, DropdownOption[]>

export interface SelectedItems {
  isSingleParent: boolean
  isDisability: boolean
  isDualIncome: boolean
  isEmployeeCouple: boolean
  isSibling: boolean
}

export interface SelectedLabels {
  [childId: string]: {
    [kindergarten: string]: string
  }
}
