'use client'

import { http } from '@/api'

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
  documentType: DocumentType
  isAccept: 'ACCEPT' | 'UNACCEPT' | 'WAIT'
}

export interface WeightWithDocument {
  id: number
  workYears: number
  isSingleParent: string
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  isAccept: string
  isTemp: string
  documents: Document[]
  childrenCnt: number
}

export const getDocument = (id?: number) =>
  http.get<WeightWithDocument>({
    url: id ? `/api/applications/${id}` : `/api/applications`,
  })

export interface RecruitInfo {
  kindergartenNm: string
  ageClass: string
}

export interface ChildRecruitInfo {
  childName: string
  recruitInfos: RecruitInfo[]
}

export const getChildren = (id?: number) =>
  http.get<ChildRecruitInfo[]>({
    url: id ? `/api/lotteries/children/${id}` : '/api/lotteries/children',
  })

export interface EmployeeInfo {
  nameKo: string
  accountId: string
  employeeNo: string
  isCouple: boolean
  workedAt: string
}

export const getEmployeeInfo = (id?: number) =>
  http.get<EmployeeInfo>({
    url: id ? `/api/admin/employees/${id}` : '/api/employees',
  })
