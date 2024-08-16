import { http } from '@/api'
import { BaseResponse } from '@/api/types'
import { ApplicationPayload } from '@/type/application'
import { toast } from 'react-toastify'
import {
  ApplicationResponse,
  EmployeeInfo,
  FileUploadResponse,
  RecruitInfo,
  RecruitResponse,
  ApplicationStatus,
} from './types'

export async function uploadDocument(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await http.post<string>({
      url: `/api/upload/document`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.result
  } catch (error) {
    toast.error('이미지 업로드에 실패하였습니다. 다시 시도해주세요', {
      autoClose: 1000,
      pauseOnHover: false,
    })
    throw error
  }
}

// 지원서 제출
export function submitApplication(
  data: ApplicationPayload,
): Promise<BaseResponse<ApplicationResponse>> {
  return http.post<ApplicationResponse>({
    url: '/api/applications',
    data,
  })
}

// 임시 저장
export function saveApplicationTemp(
  data: ApplicationPayload,
): Promise<BaseResponse<ApplicationResponse>> {
  return http.post<ApplicationResponse>({
    url: '/api/applications/tmp',
    data,
  })
}

// 파일 업로드
export function uploadFile(
  file: File,
): Promise<BaseResponse<FileUploadResponse>> {
  const formData = new FormData()
  formData.append('file', file)

  return http.post<FileUploadResponse>({
    url: '/api/upload/document',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 모집 정보 가져오기
export function getRecruitInfo(): Promise<BaseResponse<RecruitResponse>> {
  return http.get<RecruitResponse>({
    url: '/api/recruits',
  })
}

export async function getEmployeeData(): Promise<EmployeeInfo> {
  try {
    const response = await http.get<EmployeeInfo>({ url: '/api/employees' })
    return response.result
  } catch (error) {
    console.error('Error fetching employee data:', error)
    throw error
  }
}

export async function getRecruitData(): Promise<RecruitInfo[]> {
  try {
    const response = await http.get<RecruitInfo[]>({
      url: '/api/recruits',
    })
    return response.result
  } catch (error) {
    console.error('Error fetching recruit data:', error)
    throw error
  }
}

export async function getApplicationData(): Promise<ApplicationStatus | null> {
  try {
    const response = await http.get<ApplicationStatus>({
      url: '/api/applications',
    })
    return response.result
  } catch (error) {
    console.error('Error fetching application data:', error)
    return null
  }
}

export function editApplication(
  data: ApplicationPayload,
  applicationId: number,
): Promise<BaseResponse<ApplicationResponse>> {
  return http.patch<ApplicationResponse>({
    url: `/api/applications/${applicationId}`,
    data,
  })
}
