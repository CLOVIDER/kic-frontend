'use client'

import { generateContext } from '@/react-utils'
import { Dispatch, SetStateAction } from 'react'
import { SettingData } from './type'

interface SettingContextProps {
  settingData: SettingData
  setSettingData: Dispatch<SetStateAction<SettingData>>
}

export const [SettingProvider, useSettingContext] =
  generateContext<SettingContextProps>({
    name: 'admin-setting-context',
  })
