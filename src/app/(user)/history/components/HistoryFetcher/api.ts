import { http } from '@/api'

export interface LotteryResult {
  applicationId: number
  lotteryId: number
  childName: string
  result: 'WIN' | 'LOSE' | 'WAIT'
  waitingNumber: number | null
  kindergartenName: string
  ageClass: number
  isregistry: '0' | '1'
}
export interface ChildLotteryResponse {
  childName: string
  lotteryResults: LotteryResult[]
}

export interface History {
  lotteryId: number
  childName: string
  kindergartenName: string
  ageClass: number
  result: 'WIN' | 'LOSE' | 'WAIT'
  applicationDate: string
  competition: string
}

export type HistoryResponse = History[]

export const getCurrentResult = () =>
  http.get<ChildLotteryResponse[]>({
    url: '/api/lotteries/results',
  })

export const getHistory = () =>
  http.get<HistoryResponse>({
    url: '/api/lotteries/history',
  })
