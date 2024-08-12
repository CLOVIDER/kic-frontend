import { http } from '@/api'
import { BaseResponse } from '@/api/types'
import { ApplicationPayload } from '@/type/application'
import {
  ApplicationResponse,
  FileUploadResponse,
  RecruitResponse,
} from './types'

// 지원서 제출
export const submitApplication = async (
  data: ApplicationPayload,
): Promise<BaseResponse<ApplicationResponse>> => {
  return http.post<ApplicationResponse>({
    url: '/api/applications',
    data,
  })
}

// 임시 저장
export const saveApplicationTemp = async (
  data: ApplicationPayload,
): Promise<BaseResponse<ApplicationResponse>> => {
  return http.post<ApplicationResponse>({
    url: '/api/applications/tmp',
    data,
  })
}

// 파일 업로드
export const uploadFile = async (
  file: File,
): Promise<BaseResponse<FileUploadResponse>> => {
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
export const getRecruitInfo = async (): Promise<
  BaseResponse<RecruitResponse>
> => {
  return http.get<RecruitResponse>({
    url: '/api/recruits',
  })
}
