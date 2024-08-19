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
  classValue?: string
  nameKo?: string
  kindergartenId: string
}

export const getLotteriesResult = ({
  page,
  size = 10,
  classValue,
  nameKo,
  kindergartenId,
}: GetLotteriesRequest) => {
  return http.get<GetLotteriesResponse>({
    url: `/api/admin/lotteries/result/${kindergartenId}`,
    params: {
      page,
      size,
      class: classValue?.replaceAll(/\D/g, ''),
      nameKo,
    },
  })
}

export const postEmailsRecruits = () =>
  http.post({
    url: `/api/admin/emails/recruits`,
  })

export type GetKindergartenWithRecruitIdResponse = Array<{
  kindergartenNm: string
  recruitIds: Array<number>
  ageClasses: Array<`${string}세`>
  kindergartenIds: string[]
}>

export const getKindergartenWithRecruitId = () =>
  http.get<GetKindergartenWithRecruitIdResponse>({
    url: '/api/recruits/results',
  })

export const postLotteryRecruit = (recruitId: number) =>
  http.post({
    url: `/api/admin/lotteries/${recruitId}`,
  })
