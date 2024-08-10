import { http } from '@/api'
import { BaseResponse } from '@/api/types'

export interface QnaItem {
  qnaId: number
  title: string
  question: string
  answer: string | null
  isVisibility: string
  writerName: string
  createdAt: string
}

interface QnaResponse {
  content: QnaItem[]
  totalPage: number
  totalElements: number
  size: number
  currPage: number
  hasNext: boolean
  isFirst: boolean
  isLast: boolean
}

interface CreateQnaResponse {
  id: number
  createdAt: string
}

export const fetchQnas = async (
  page: number = 0,
  size: number = 10,
  type?: string,
  keyword?: string,
): Promise<BaseResponse<QnaResponse>> => {
  try {
    const response = await http.get<QnaResponse>({
      url: '/api/qnas',
      params: { page, size, type, keyword },
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch Q&A data: ${error}`)
  }
}

export const fetchQnaDetail = async (
  id: number,
): Promise<BaseResponse<QnaItem>> => {
  try {
    const response = await http.get<QnaItem>({
      url: `/api/qnas/${id}`,
    })
    return response
  } catch (error) {
    throw new Error(`Failed to fetch Q&A detail: ${error}`)
  }
}

export const createQna = async (
  title: string,
  question: string,
  isVisibility: string,
  uploadedImageUrls: string[],
): Promise<BaseResponse<CreateQnaResponse>> => {
  try {
    const response = await http.post<CreateQnaResponse>({
      url: '/api/qnas',
      data: { title, question, isVisibility, uploadedImageUrls },
    })
    return response
  } catch (error) {
    throw new Error(`Failed to create Q&A: ${error}`)
  }
}

export const updateQnaAnswer = async (
  qnaId: number,
  answer: string,
): Promise<BaseResponse<void>> => {
  try {
    const response = await http.patch<void>({
      url: `/api/qnas/admin/${qnaId}`,
      data: { answer },
    })
    return response
  } catch (error) {
    throw new Error(`Failed to update Q&A answer: ${error}`)
  }
}

export const getQnaAnswer = async (
  qnaId: number,
): Promise<BaseResponse<void>> => {
  try {
    const response = await http.get<void>({
      url: `/api/qnas/admin/${qnaId}`,
    })
    return response
  } catch (error) {
    throw new Error(`Failed to get Q&A answer: ${error}`)
  }
}
