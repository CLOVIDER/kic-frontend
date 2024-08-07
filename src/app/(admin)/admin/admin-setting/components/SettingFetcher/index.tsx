'use client'

import { StrictPropsWithChildren } from '@/type'
import { ReactNode, useMemo, useState } from 'react'
import { useSettingData } from './queries'
import { SettingProvider } from './SettingContext'
import { SettingData } from './type'

function SettingProviderWrapper({
  children,
  initialData,
}: {
  children: ReactNode
  initialData: SettingData
}) {
  const [settingData, setSettingData] = useState<SettingData>(initialData)

  const data = useMemo(
    () => ({
      settingData,
      setSettingData,
    }),
    [settingData, setSettingData],
  )
  return <SettingProvider {...data}>{children}</SettingProvider>
}

export default function SettingFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useSettingData()

  return (
    <SettingProviderWrapper initialData={data}>
      {children}
    </SettingProviderWrapper>
  )
}
