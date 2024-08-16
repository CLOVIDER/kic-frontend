import { http } from '@/api'
import { BaseResponse } from '@/api/types'

export interface NoticeItem {
  noticeId: number
  title: string
  content: string
  writerName: string
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

interface CreateNoticeResponse {
  id: number
  createdAt: string
}

export const fetchNotices = async (
  page: number = 0,
  size: number = 10,
  type?: string,
  keyword?: string,
): Promise<BaseResponse<NoticeResponse>> => {
  try {
    const response = await http.get<NoticeResponse>({
      url: '/api/admin/notices',
      params: { page, size, type, keyword },
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch Notice data: ${error}`)
  }
}

export const fetchNoticeDetail = async (
  id: number,
): Promise<BaseResponse<NoticeItem>> => {
  try {
    const response = await http.get<NoticeItem>({
      url: `/api/admin/notices/${id}`,
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch Notice detail: ${error}`)
  }
}

export const createNotice = async (
  title: string,
  content: string,
  imageUrls: string[], // Update to use 'imageUrls'
): Promise<BaseResponse<CreateNoticeResponse>> => {
  try {
    const response = await http.post<CreateNoticeResponse>({
      url: '/api/admin/notices',
      data: { title, content, imageUrls }, // Ensure correct key name
    })
    return response
  } catch (error) {
    throw new Error(`Failed to create Notice: ${error}`)
  }
}
