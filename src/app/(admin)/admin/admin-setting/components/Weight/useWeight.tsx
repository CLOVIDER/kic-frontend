'use client'

import { useState } from 'react'

type SwitchItem = {
  label: string
  id: string
}

export const useWeight = (switchItems: SwitchItem[]) => {
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(
    switchItems.reduce(
      (acc, item) => {
        acc[item.id] = false
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
  }

  return { switchStates, handleToggle }
}
