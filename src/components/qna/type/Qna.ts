export interface Qna {
  id: number
  title: string
  author: string
  content: string
  date: string
  answered: boolean
}

export interface NoticesResponse {
  notices: Qna[]
  totalItems: number
}
