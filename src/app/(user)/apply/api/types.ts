export interface ApplicationResponse {
  id: number
  createdAt: string
}

export interface FileUploadResponse {
  result: string
}

export interface KindergartenInfo {
  kindergartenNm: string
  recruitIds: number[]
  aggClasses: string[]
}

export interface RecruitResponse {
  result: KindergartenInfo[]
}
