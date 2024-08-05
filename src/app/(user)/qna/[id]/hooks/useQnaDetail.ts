import { useParams } from 'next/navigation'
import { qnaDataList } from '../data'
import { QnaData } from '../type'

export function useQnaDetail() {
  const params = useParams()
  const id = Number(params.id)

  const qnaData: QnaData | undefined = qnaDataList.find(
    (item) => item.id === id,
  )

  return { qnaData }
}
