import { http } from '@/api'
import { SettingData } from './type'

export const getSettingData = () =>
  http.get<SettingData>({
    url: '/api/admin/recruits',
  })
