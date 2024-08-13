import { http } from '@/api'

export const AGE_CLASS_MAP = {
  INFANT: '영아',
  TODDLER: '유아',
  KID: '어린이',
} as const

export type GetKindergartensResponse = Array<{
  kindergartenId: number
  kindergartenNm: string
  kindergartenAddr: string
  kindergartenScale: number
  kindergartenCapacity: number
  kindergartenNo: string
  kindergartenTime: string
  kindergartenInfo: string
  kindergartenImageUrls: string[]
  kindergartenClass: Array<{
    className: string
    ageClass: keyof typeof AGE_CLASS_MAP
  }>
}>

export const getKindergartens = () =>
  http.get<GetKindergartensResponse>({ url: '/api/kindergartens' })
