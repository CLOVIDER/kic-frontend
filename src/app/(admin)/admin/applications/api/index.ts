import { http } from '@/api'

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
