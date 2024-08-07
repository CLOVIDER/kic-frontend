import { AsyncBoundaryWithQuery } from '@/react-utils'
import {
  AdminNoticeFetcher,
  AdminQnAFetcher,
} from '@/app/(admin)/components/adminFetcher'
import { Skeleton } from '@nextui-org/react'
import Notification from './Notification'
import QnA from './QnA'

export default function LandingLower() {
  return (
    <AsyncBoundaryWithQuery pendingFallback={<Skeleton />}>
      <div className="flex flex-row gap-20">
        <AdminQnAFetcher>
          <QnA />
        </AdminQnAFetcher>

        <AdminNoticeFetcher>
          <Notification />
        </AdminNoticeFetcher>
      </div>
    </AsyncBoundaryWithQuery>
  )
}
