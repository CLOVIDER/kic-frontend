import { useSuspenseQuery } from '@tanstack/react-query'
import {
  GetApplicationsRequest,
  getApplications,
  getKindergartens,
} from '@/app/(admin)/admin/applications/api/index'

export const useGetKindergartens = () =>
  useSuspenseQuery({
    queryKey: ['get-kindergartens'],
    queryFn: getKindergartens,
    select: ({ result }) => result,
  })

export const useGetApplications = (applicationQuery: GetApplicationsRequest) =>
  useSuspenseQuery({
    queryKey: ['applications', applicationQuery.size],
    queryFn: () => getApplications(applicationQuery),
    select: ({ result }) => result,
  })
