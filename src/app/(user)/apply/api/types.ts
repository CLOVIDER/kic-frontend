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

export interface ApplicationStatus {
  isTemp: 'APPLIED' | 'TEMP'
  id: number
  isSingleParent: '0' | '1' // Character 타입에 맞추어 문자열로 정의
  childrenCnt: number
  isDisability: '0' | '1'
  isDualIncome: '0' | '1'
  isEmployeeCouple: '0' | '1'
  isSibling: '0' | '1'
  childrenRecruitList: Array<{
    childNm: string
    recruitIds: number[]
  }>
  documents: Array<{
    id: number
    image: string
    documentType: string
  }>
}

export interface ApplicationPayload {
  isSingleParent: '0' | '1' // Character 타입에 맞추어 문자열로 정의
  childrenCnt: number
  isDisability: '0' | '1'
  isDualIncome: '0' | '1'
  isEmployeeCouple: '0' | '1'
  isSibling: '0' | '1'
  childrenRecruitList: Array<{
    childNm: string
    recruitIds: number[]
  }>
  fileUrls: FileUrls
}

export enum DocumentType {
  RESIDENT_REGISTER = 'RESIDENT_REGISTER',
  DUAL_INCOME = 'DUAL_INCOME',
  SINGLE_PARENT = 'SINGLE_PARENT',
  DISABILITY = 'DISABILITY',
  MULTI_CHILDREN = 'MULTI_CHILDREN',
  SIBLING = 'SIBLING',
}

export interface Document {
  id: number
  image: string
  documentType: string
  isAccept: string
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

export interface FileUrls {
  [key: string]: string | undefined
  RESIDENT_REGISTER?: ''
  DUAL_INCOME?: ''
  SINGLE_PARENT?: ''
  DISABILITY?: ''
  MULTI_CHILDREN?: ''
  SIBLING?: ''
}
