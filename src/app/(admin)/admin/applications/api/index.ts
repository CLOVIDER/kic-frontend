import { http } from '@/api'

export type GetKindergartensResponse = Array<{
  kindergartenId: number
  kindergartenNm: string
  kindergartenAddr: string
  kindergartenScale: string
  kindergartenNo: string
  kindergartenTime: string
  kindergartenInfo: string
  kindergartenImageUrl: string
}>

export interface GetApplicationsResponse {
  content: [
    {
      createdAt: string
      nameKo: string
      employeeNo: string
      applicationId: number
      isAccept: string
    },
  ]
  totalPage: number
  totalElements: number
  size: number
  currPage: number
  hasNext: boolean
  isFirst: boolean
  isLast: boolean
}

export interface GetApplicationsRequest {
  page: number
  size?: number
  filter?: 'ALL' | 'ACCEPT' | 'UNACCEPT' | 'WAIT'
  q?: string
}

export const getKindergartens = () =>
  http.get<GetKindergartensResponse>({ url: '/api/admin/kindergartens' })

export const getApplications = ({
  page,
  size = 10,
  filter = 'ALL',
  q,
}: GetApplicationsRequest) =>
  http.get<GetApplicationsResponse>({
    url: '/api/admin/recruits/applications',
    params: {
      page,
      size,
      filter,
      q,
    },
  })
