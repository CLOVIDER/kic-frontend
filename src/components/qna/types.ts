export interface QnaItem {
  qnaId: number
  title: string
  question: string
  isAnswerPresent: boolean
  isVisibility: string
  writerName: string
  createdAt: string
}

export interface QnaResponse {
  content: QnaItem[]
  totalPage: number
  totalElements: number
  size: number
  currPage: number
  hasNext: boolean
  isFirst: boolean
  isLast: boolean
}

export interface CreateQnaResponse {
  id: number
  createdAt: string
}

export interface QnaAnswerResponse {
  answer: string
}

export interface DeleteQnaResponse {
  isSuccess: boolean
  code: string
  message: string
  result: string
}

export interface UpdateQnaAnswerResponse {
  isSuccess: boolean
  code: string
  message: string
  result: string
}
