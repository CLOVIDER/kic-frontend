import http from '@/api/core'
import { LoginRequest, LoginResponse } from './type'

export const postLogin = (data: LoginRequest) =>
  http.post<LoginResponse>({
    url: '/api/login',
    data,
  })
