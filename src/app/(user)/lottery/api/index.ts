import { http } from '@/api'

export type GetLotteriesEmployeeResponse = Array<{
  childName: string
  className: string
  lotteryId: number
  isAccept: string
}>

export type GetLotteriesDetailResponse = {
  result: {
    id: number
    createdAt: string
    result: 'WIN' | 'WAIT' | 'LOSE'
    kindergartenNm: string
    waitingNum: string
    endDate: number
  }
}

export const getLotteriesEmployee = () =>
  http.get<GetLotteriesEmployeeResponse>({
    url: '/api/lotteries',
  })

export const getLotteryDetailResult = (lotteryId: number) =>
  http.get<GetLotteriesDetailResponse>({
    url: `/api/lotteries/${lotteryId}`,
  })

export const getLotteryPercent = (lotteryId: number) =>
  http.get<number>({
    url: `/api/recruits/${lotteryId}/percents`,
  })

export const deleteLottery = (lotteryId: number) =>
  http.delete({ url: `/api/${lotteryId}` })

export const patchRegistry = (lotteryId: number) =>
  http.patch({
    url: `/api/lotteries/${lotteryId}/registry`,
  })
