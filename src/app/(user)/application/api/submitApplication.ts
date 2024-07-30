// services/api.ts
import axios from 'axios'
import * as Sentry from '@sentry/nextjs'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
// const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ApplicationRequest {
  isSingleParent: string
  childrenCnt: number
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  childName: string
  isTemp: string
  imageUrls: string[]
}

export interface ApplicationResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    id: number
    createdAt: string
  }
}

export const submitApplication = async (
  data: ApplicationRequest,
  token: string,
): Promise<ApplicationResponse> => {
  try {
    const response = await api.post<ApplicationResponse>(
      '/applications',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
}

export default api
