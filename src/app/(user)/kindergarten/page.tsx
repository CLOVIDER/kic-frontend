'use client'

import { useSearchParams } from 'next/navigation'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { If } from '@/components'
import KindergartenDetail from './components/KindergartenDetail'
import KindergartenList from './components/KindergartenList'
import KindergartensFetcher from './fetcher/KindergartensFetcher'

export default function Page() {
  const searchParams = useSearchParams()
  const isDetail = !!searchParams.get('kdgId')

  return (
    <AsyncBoundaryWithQuery>
      <KindergartensFetcher>
        <If condition={isDetail}>
          <KindergartenDetail id={searchParams.get('kdgId')!} />
        </If>
        <If condition={!isDetail}>
          <KindergartenList />
        </If>
      </KindergartensFetcher>
    </AsyncBoundaryWithQuery>
  )
}
