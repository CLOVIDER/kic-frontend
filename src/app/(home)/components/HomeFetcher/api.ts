import { http } from '@/api'
import { HomeResponse } from './type'

export const getHomeData = () =>
  http.get<HomeResponse>({
    url: '/api',
  })
