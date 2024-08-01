export interface LoginResponse {
  accessToken: string
  refreshToken: string
  role: string
}

export interface LoginRequest {
  accountId: string
  password: string
}
