'use client'

import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import { GetKindergartensResponse } from '../api'
import { useGetKindergartens } from '../api/queries'

export const [KindergartensProvider, useKindergartensContext] =
  generateContext<{ kindergartens: GetKindergartensResponse }>({
    name: 'kindergartens',
    defaultContextValue: { kindergartens: [] },
  })

export default function KindergartensFetcher({
  children,
}: StrictPropsWithChildren) {
  const { data } = useGetKindergartens()

  return (
    <KindergartensProvider kindergartens={data}>
      {children}
    </KindergartensProvider>
  )
}
