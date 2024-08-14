'use client'

import { useHomePage } from '@/app/(home)/components/api/queries'
import { generateContext } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import { HomeResponse } from '@/app/(home)/components/api/type'

export const [RecruitStatusProvider, useRecruitStatusContext] =
  generateContext<HomeResponse>({ name: 'recruit-status' })

export function RecruitStatusFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useHomePage()

  return <RecruitStatusProvider {...data}>{children}</RecruitStatusProvider>
}
