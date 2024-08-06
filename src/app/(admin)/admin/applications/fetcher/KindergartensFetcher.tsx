'use client'

import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import { useGetKindergartens } from '../queries'
import { GetKindergartensResponse } from '../api'

export const [KindergartensProvider, useKindergartensContext] =
  generateContext<{ kindergartens: GetKindergartensResponse }>({
    name: 'kindergartens',
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
