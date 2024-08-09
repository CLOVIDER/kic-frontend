import { http } from '@/api'
import { BaseResponse } from '@/api/types'

export interface NoticeImage {
  noticeImageId: number
  image: string
}

export interface NoticeItem {
  noticeId: number
  title: string
  content: string
  hits: number
  noticeImageList: NoticeImage[]
  createdAt: string
}

interface NoticeResponse {
  content: NoticeItem[]
  totalPage: number
  totalElements: number
  size: number
  currPage: number
  hasNext: boolean
  isFirst: boolean
  isLast: boolean
}

export const fetchNotices = async (
  page: number = 0,
  size: number = 10,
  keyword?: string,
): Promise<BaseResponse<NoticeResponse>> => {
  try {
    const response = await http.get<NoticeResponse>({
      url: '/api/notices',
      params: { page, size, keyword },
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch Notice data: ${error}`)
  }
}

export const fetchNoticeDetail = async (
  noticeId: number,
): Promise<BaseResponse<NoticeItem>> => {
  try {
    const response = await http.get<NoticeItem>({
      url: `/api/notices/${noticeId}`,
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch Notice detail: ${error}`)
  }
}

interface CreateNoticeData {
  title: string
  content: string
  imageUrls: string[]
}

export const createNotice = async (data: CreateNoticeData): Promise<void> => {
  try {
    await http.post({
      url: '/api/admin/notices',
      data,
    })
  } catch (error) {
    console.error('Error creating notice:', error)
    throw error
  }
}
