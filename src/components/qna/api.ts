import { http } from '@/api'
import { BaseResponse } from '@/api/types'

import { toast } from 'react-toastify'
import {
  QnaAnswerResponse,
  QnaItem,
  QnaResponse,
  CreateQnaResponse,
  DeleteQnaResponse,
  UpdateQnaAnswerResponse,
} from './types'

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
  imageUrls: string[],
): Promise<BaseResponse<CreateQnaResponse>> => {
  try {
    const response = await http.post<CreateQnaResponse>({
      url: '/api/qnas',
      data: { title, question, isVisibility, imageUrls },
    })
    return response
  } catch (error) {
    throw new Error(`Failed to create Q&A: ${error}`)
  }
}

export const updateQnaAnswer = async (
  qnaId: number,
  answer: string,
): Promise<UpdateQnaAnswerResponse> => {
  try {
    const response = await http.patch<UpdateQnaAnswerResponse>({
      url: `/api/admin/qnas/${qnaId}/answer`,
      data: { answer },
    })

    if (response.code.toString() === 'COMMON200') {
      return response.result
    }
    throw new Error(`API Error: ${response.message}`)
  } catch (error) {
    toast.error(`Error in updateQnaAnswer:${error}`)
    throw error
  }
}

export const getQnaAnswer = async (
  qnaId: number,
): Promise<QnaAnswerResponse> => {
  try {
    const response = await http.get<QnaAnswerResponse>({
      url: `/api/admin/qnas/${qnaId}/answer`,
    })

    if (response.code.toString() === 'COMMON200') {
      return response.result
    }
    throw new Error(`API Error: ${response.message}`)
  } catch (error) {
    toast.error(`Error in getQnaAnswer:${error}`)
    throw error
  }
}

export const deleteQna = async (qnaId: number): Promise<DeleteQnaResponse> => {
  try {
    const response = await http.delete<DeleteQnaResponse>({
      url: `/api/qnas/${qnaId}`,
      params: { qnaId },
    })
    return response.result
  } catch (error) {
    throw new Error(`Failed to delete Q&A: ${error}`)
  }
}
