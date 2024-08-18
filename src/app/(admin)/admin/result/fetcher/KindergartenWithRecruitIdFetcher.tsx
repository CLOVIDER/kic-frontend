'use client'

import { generateContext } from '@/react-utils'
import { GetKindergartenWithRecruitIdResponse } from '@/app/(admin)/admin/result/api/index'
import { StrictPropsWithChildren } from '@/type'
import { useGetKindergartenWithRecruitId } from '../queries'

const [KindergartenWthRecruitIdProvider, useKindergartenWthRecruitIdContext] =
  generateContext<{ kindergartens: GetKindergartenWithRecruitIdResponse }>({
    name: 'kindergartenWthRecruitId',
  })

function KindergartenWthRecruitIdFetcher({
  children,
}: StrictPropsWithChildren) {
  const { data } = useGetKindergartenWithRecruitId()

  return (
    <KindergartenWthRecruitIdProvider kindergartens={data}>
      {children}
    </KindergartenWthRecruitIdProvider>
  )
}

export { KindergartenWthRecruitIdFetcher, useKindergartenWthRecruitIdContext }
