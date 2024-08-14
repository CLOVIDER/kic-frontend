'use client'

import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getSettingData, patchSettingData, postSettingData } from './api'
import { SettingData } from './type'

export const useSettingData = () =>
  useSuspenseQuery({
    queryKey: ['recuit-setting'],
    queryFn: getSettingData,
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useUploadSetting = (mode: boolean) => {
  return useMutation({
    mutationKey: ['setting'],
    mutationFn: ({ data }: { data: Partial<SettingData> }) => {
      if (mode) {
        return patchSettingData(data)
      }
      return postSettingData(data)
    },
    onSuccess: () => {},
  })
}
