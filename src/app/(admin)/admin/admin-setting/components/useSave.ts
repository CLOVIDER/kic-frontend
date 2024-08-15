'use client'

import { useCallback } from 'react'
import { useUploadSetting } from './SettingFetcher/queries'
import { useSettingContext } from './SettingFetcher/SettingContext'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function useSave() {
  const router = useRouter()
  const { settingData } = useSettingContext()

  const { mutate } = useUploadSetting(settingData.isCreated)

  const handleSave = useCallback(() => {
    mutate({
      data: settingData,
    })
  }, [mutate, settingData])

  return { handleSave }
}
