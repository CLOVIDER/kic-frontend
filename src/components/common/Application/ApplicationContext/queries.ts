import { useSuspenseQuery } from '@tanstack/react-query'
import { getChildren, getDocument, getEmployeeInfo } from './api'

export const useEmployeeInfo = (id?: number) =>
  useSuspenseQuery({
    queryKey: id ? ['employee', id] : ['employee'],
    queryFn: () => getEmployeeInfo(id),
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useChildren = (id?: number) =>
  useSuspenseQuery({
    queryKey: id ? ['children', id] : ['children'],
    queryFn: () => getChildren(id),
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useWeightWithDocument = (id?: number) =>
  useSuspenseQuery({
    queryKey: id ? ['admin-approve', id] : ['admin-approve'],
    queryFn: () => getDocument(id),
    refetchOnMount: false,
    select: (data) => data.result,
  })
