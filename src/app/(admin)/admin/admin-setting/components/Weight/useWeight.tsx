'use client'

import { useState } from 'react'
import { useSettingContext } from '../SettingFetcher/SettingContext'

type SwitchItem = {
  label: string
  id: string
}

export const useWeight = (switchItems: SwitchItem[]) => {
  const { settingData, setSettingData } = useSettingContext()

  const {
    recruitDateAndWeightInfo: { recruitWeightInfo },
  } = settingData

  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(
    switchItems.reduce(
      (acc, item) => {
        acc[item.id] = recruitWeightInfo[item.id] === '1'
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const handleToggle = (id: string) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }))
    setSettingData((prevData) => ({
      ...prevData,
      recruitDateAndWeightInfo: {
        ...prevData.recruitDateAndWeightInfo,
        recruitWeightInfo: {
          ...prevData.recruitDateAndWeightInfo.recruitWeightInfo,
          [id]: switchStates[id] ? '0' : '1',
        },
      },
    }))
  }

  return { switchStates, handleToggle }
}
