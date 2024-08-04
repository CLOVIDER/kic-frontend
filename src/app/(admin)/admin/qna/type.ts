export interface Qna {
  id: number
  title: string
  author: string
  content: string
  date: string
  answered: boolean
}

export interface QnasResponse {
  notices: Qna[]
  totalItems: number
}
