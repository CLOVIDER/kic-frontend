import { AsyncBoundaryWithQuery } from '@/react-utils'
import HomeFallback from '@/app/(home)/components/HomeFallback'
import {
  AdminNoticeFetcher,
  AdminQnAFetcher,
} from '@/app/(admin)/components/adminFetcher'
import Notification from './Notification'
import QnA from './QnA'

export default function LandingLower() {
  return (
    <AsyncBoundaryWithQuery pendingFallback={<HomeFallback />}>
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
