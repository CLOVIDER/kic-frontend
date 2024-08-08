import { http } from '@/api'
import { ApplicationPayload, ApplicationResponse } from './types'

export const saveApplicationTemp = (payload: ApplicationPayload) =>
  http.post<ApplicationResponse>({
    url: '/api/applications/tmp',
    data: payload,
  })

export const submitApplication = (payload: ApplicationPayload) =>
  http.post<ApplicationResponse>({
    url: '/api/applications',
    data: payload,
  })
