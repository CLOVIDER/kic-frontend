import { http } from '@/api'
import { Pagination } from '@/type/pagination'

export interface GetLotteriesResponse extends Pagination {
  content: [
    {
      employeeNo: string
      nameKo: string
      childNm: string
      lotteryResult: string
      applicationId: 0
    },
  ]
}

export interface GetLotteriesRequest {
  page: number
  size?: number
  classValue?: number
  accountId?: string
  kindergartenId: number
}

export const getLotteriesResult = ({
  page,
  size = 10,
  classValue,
  accountId,
  kindergartenId,
}: GetLotteriesRequest) =>
  http.get<GetLotteriesResponse>({
    url: `/api/admin/lotteries/result/${kindergartenId}`,
    params: {
      page,
      size,
      class: classValue || 'INFANT',
      accountId,
    },
  })

export const postEmailsRecruits = () =>
  http.post({
    url: `/api/admin/emails/recruits`,
  })
