import { http } from '@/api'
import { BaseResponse } from '@/api/types'

// NoticeItem 인터페이스 정의
export interface NoticeItem {
  noticeId: number
  title: string
  content: string
  hits: number
  noticeImageList: {
    noticeImageId: number
    image: string
  }[]
  createdAt: string
}

// NoticeResponse 인터페이스 정의
export interface NoticeResponse {
  content: NoticeItem[]
  totalPage: number
  totalElements: number
  size: number
  currPage: number
  hasNext: boolean
  isFirst: boolean
  isLast: boolean
}

// 단일 공지사항 응답 인터페이스 정의
export interface SingleNoticeResponse {
  noticeId: number
  title: string
  content: string
  hits: number
  noticeImageList: {
    noticeImageId: number
    image: string
  }[]
  createdAt: string
}

// 공지사항 목록 조회 함수
export const fetchNotices = async (
  page: number = 0,
  size: number = 3,
  type?: string,
  keyword?: string,
): Promise<BaseResponse<NoticeResponse>> => {
  try {
    const response = await http.get<NoticeResponse>({
      url: '/api/notices',
      params: { page, size, type, keyword },
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch notices: ${error}`)
  }
}

// 단일 공지사항 조회 함수
export const fetchNoticeDetail = async (
  id: number,
): Promise<BaseResponse<SingleNoticeResponse>> => {
  try {
    const response = await http.get<SingleNoticeResponse>({
      url: `/api/notices/${id}`,
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch notice detail: ${error}`)
  }
}
