'use client'

import { StrictPropsWithChildren } from '@/type'
import { useHomePage } from './queries'
import { HomeProvider } from './HomeContext'

export function HomeFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useHomePage()
  return <HomeProvider {...data}>{children}</HomeProvider>
}
