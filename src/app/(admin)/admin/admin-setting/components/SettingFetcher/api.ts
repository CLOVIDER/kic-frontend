import { http } from '@/api'
import { SettingData, SettingResponse } from './type'

export const getSettingData = () =>
  http.get<SettingData>({
    url: '/api/admin/recruits',
  })

export const patchSettingData = (data: Partial<SettingData>) =>
  http.patch<SettingResponse>({
    url: 'api/admin/recruits',
    data,
  })

export const postSettingData = (data: Partial<SettingData>) =>
  http.post<SettingResponse>({
    url: 'api/admin/recruits',
    data,
  })
