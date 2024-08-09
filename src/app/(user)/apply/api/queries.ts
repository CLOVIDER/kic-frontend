import { useMutation, useQuery } from '@tanstack/react-query'
import { BaseResponse } from '@/api/types'
import {
  submitApplication,
  saveApplicationTemp,
  uploadFile,
  getRecruitInfo,
} from './api'
import {
  ApplicationPayload,
  ApplicationResponse,
  FileUploadResponse,
  RecruitResponse,
} from './types'

// 지원서 제출 Mutation
export const useSubmitApplication = () =>
  useMutation<BaseResponse<ApplicationResponse>, Error, ApplicationPayload>(
    (data: ApplicationPayload) => submitApplication(data),
  )

// 임시 저장 Mutation
export const useSaveApplicationTemp = () =>
  useMutation<BaseResponse<ApplicationResponse>, Error, ApplicationPayload>(
    (data: ApplicationPayload) => saveApplicationTemp(data),
  )

// 파일 업로드 Mutation
export const useUploadFile = () =>
  useMutation<BaseResponse<FileUploadResponse>, Error, File>((file: File) =>
    uploadFile(file),
  )

// 모집 정보 가져오기 Query
export const useRecruitInfo = () =>
  useQuery<BaseResponse<RecruitResponse>, Error>(['recruitInfo'], () =>
    getRecruitInfo(),
  )
