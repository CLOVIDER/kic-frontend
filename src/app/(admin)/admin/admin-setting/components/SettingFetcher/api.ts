import { http } from '@/api'
import { SettingData } from './type'

export const getSettingData = () =>
  http.get<SettingData>({
    url: '/api/admin/recruits',
  })

export const patchSettingData = (data: Partial<SettingData>) =>
  http.patch<string>({
    url: 'api/admin/recruits',
    data,
  })

export const postSettingData = (data: Partial<SettingData>) =>
  http.post<string>({
    url: 'api/admin/recruits',
    data,
  })
