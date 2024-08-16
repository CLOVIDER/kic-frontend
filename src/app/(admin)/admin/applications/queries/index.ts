import { useSuspenseQuery } from '@tanstack/react-query'
import {
  GetApplicationsRequest,
  getApplications,
} from '@/app/(admin)/admin/applications/api/index'

export const useGetApplications = (applicationQuery: GetApplicationsRequest) =>
  useSuspenseQuery({
    queryKey: [
      'applications',
      applicationQuery.filter,
      applicationQuery.page,
      applicationQuery.q,
    ],
    queryFn: () => getApplications(applicationQuery),
    select: ({ result }) => result,
  })
