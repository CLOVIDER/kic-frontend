'use client'

import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import {
  GetApplicationsResponse,
  GetApplicationsRequest,
} from '@/app/(admin)/admin/applications/api/index'
import { useGetApplications } from '../queries'

export const [ApplicationsProvider, useApplicationsContext] = generateContext<{
  applications: GetApplicationsResponse
}>({
  name: 'applications',
})

export default function ApplicationsFetcher({
  children,
  ...params
}: StrictPropsWithChildren<GetApplicationsRequest>) {
  const { data } = useGetApplications(params)

  return (
    <ApplicationsProvider applications={data}>{children}</ApplicationsProvider>
  )
}
