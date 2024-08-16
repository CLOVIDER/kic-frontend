'use client'

import { ReactNode } from 'react'
import { generateContext } from '@/react-utils'
import { useChildren, useEmployeeInfo, useWeightWithDocument } from './queries'
import { ChildRecruitInfo, EmployeeInfo, WeightWithDocument } from './api'

export const [ChildProvider, useChildContext] = generateContext<{
  childData: ChildRecruitInfo[]
}>({
  name: 'child-context',
})

export const [EmployeeProvider, useEmployeeContext] =
  generateContext<EmployeeInfo>({
    name: 'employee-context',
  })

export const [DocumentProvider, useDocumentContext] =
  generateContext<WeightWithDocument>({
    name: 'document-context',
  })

export function ChildFetcher({
  children,
  id,
}: {
  children: ReactNode
  id?: number
}) {
  const { data } = useChildren(id)

  return <ChildProvider childData={data}>{children}</ChildProvider>
}

export default function EmployeeFetcher({
  children,
  id,
}: {
  children: ReactNode
  id?: number
}) {
  const { data } = useEmployeeInfo(id)

  return <EmployeeProvider {...data}>{children}</EmployeeProvider>
}

export function DocumentFetcher({
  children,
  id,
}: {
  children: ReactNode
  id?: number
}) {
  const { data } = useWeightWithDocument(id)

  return <DocumentProvider {...data}>{children}</DocumentProvider>
}
