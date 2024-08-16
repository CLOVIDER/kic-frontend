import { ApplicationPayload } from '@/type/application'

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
