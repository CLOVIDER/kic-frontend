import { http } from '@/api'

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
    ageClass: number
    ageClassString: number
  }>
}>

export const getKindergartens = () =>
  http.get<GetKindergartensResponse>({ url: '/api/kindergartens' })
