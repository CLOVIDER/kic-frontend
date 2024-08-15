import { useSuspenseQuery } from '@tanstack/react-query'
import { getCurrentResult, getHistory } from './api'

export const useChildResult = () =>
  useSuspenseQuery({
    queryKey: ['childresult'],
    queryFn: () => getCurrentResult(),
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useHistory = () =>
  useSuspenseQuery({
    queryKey: ['history'],
    queryFn: () => getHistory(),
    refetchOnMount: false,
    select: (data) => data.result,
  })
