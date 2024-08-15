'use client'

import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getSettingData, patchSettingData, postSettingData } from './api'
import { RecruitWeightInfo, SettingData } from './type'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const useSettingData = () =>
  useSuspenseQuery({
    queryKey: ['recuit-setting'],
    queryFn: getSettingData,
    refetchOnMount: false,
    select: (data) => data.result,
  })

export const useUploadSetting = (mode: boolean) => {

  const {push} = useRouter()
  return useMutation({
    mutationKey: ['setting'],
    mutationFn: ({ data }: { data: Partial<SettingData> }) => {
      if (data.recruitDateAndWeightInfo?.recruitWeightInfo) {
        const allowedKeys = [
          'workYearsUsage',
          'isSingleParentUsage',
          'childrenCntUsage',
          'isDisabilityUsage',
          'isDualIncomeUsage',
          'isEmployeeCoupleUsage',
          'isSiblingUsage',
        ]

        const cleanedRecruitWeightInfo = Object.keys(
          data.recruitDateAndWeightInfo.recruitWeightInfo,
        ).reduce((acc, key) => {
          if (allowedKeys.includes(key)) {
            acc[key as keyof RecruitWeightInfo] =
              data.recruitDateAndWeightInfo!.recruitWeightInfo![key]!
          }
          return acc
        }, {} as RecruitWeightInfo)

        // eslint-disable-next-line no-param-reassign
        data.recruitDateAndWeightInfo.recruitWeightInfo =
          cleanedRecruitWeightInfo
      }

      if (mode) {
        return patchSettingData(data)
      }
      return postSettingData(data)
    },
    onSuccess: () => {
      toast.success('저장되었습니다!', {
        autoClose: 1000,
        onClose: () => push('/admin'),
        pauseOnHover: false,
      })
    },
  })
}
