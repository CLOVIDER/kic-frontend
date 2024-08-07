import { useSuspenseQuery } from '@tanstack/react-query'
import { getKindergaraten, getNotice, getQnA, getRecruitStatus } from './api'

export const useRecruitStatus = () =>
  useSuspenseQuery({
    queryKey: ['recruit-status'],
    queryFn: getRecruitStatus,
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useQnA = () =>
  useSuspenseQuery({
    queryKey: ['qna-waiting'],
    queryFn: getQnA,
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useNotice = () =>
  useSuspenseQuery({
    queryKey: ['notice-top3'],
    queryFn: getNotice,
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useKindergartenStatus = () =>
  useSuspenseQuery({
    queryKey: ['kindergarten-status'],
    queryFn: getKindergaraten,
    refetchOnMount: false,
    select: (data) => data.result,
  })
