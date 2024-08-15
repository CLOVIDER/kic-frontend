'use client'

import { useCallback } from 'react'
import { useUploadSetting } from './SettingFetcher/queries'
import { useSettingContext } from './SettingFetcher/SettingContext'

export default function useSave() {
  const { settingData } = useSettingContext()

  const { mutate } = useUploadSetting(settingData.isCreated)

  const handleSave = useCallback(() => {
    mutate({
      data: settingData,
    })
  }, [mutate, settingData])

  return { handleSave }
}
