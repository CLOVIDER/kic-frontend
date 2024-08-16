'use client'

import { useState } from 'react'
import { useSettingContext } from '../SettingFetcher/SettingContext'
import { ClassInfo } from '../SettingFetcher/type'

type Kindergarten = {
  kindergartenId: number
  kindergartenNm: string
}

type UseKindergartenReturn = {
  kindergartens: Kindergarten[]
  classes: ClassInfo[][]
  addClass: (index: number) => void
  removeClass: (kindergartenIndex: number, ageClass: number) => void
  updateClassName: (
    kindergartenIndex: number,
    ageClass: number,
    value: string,
  ) => void
  updateClassCapacity: (
    kindergartenIndex: number,
    ageClass: number,
    value: number,
  ) => void
}

export const useKindergarten = (): UseKindergartenReturn => {
  const { settingData, setSettingData } = useSettingContext()
  const { kindergartenClassInfoList } = settingData

  const kindergartens = kindergartenClassInfoList.map((info, index) => ({
    kindergartenId: index,
    kindergartenNm: info.kindergartenName,
  }))
  const [classes, setClasses] = useState<ClassInfo[][]>(
    kindergartenClassInfoList.map((data) =>
      data.classInfoList.map((cls) => ({
        ageClass: cls.ageClass,
        recruitCnt: cls.recruitCnt,
      })),
    ),
  )

  const addClass = (index: number): void => {
    setClasses((prevClasses) => {
      const newClass = {
        ageClass: 0,
        recruitCnt: 0,
      }
      const newClasses = [...prevClasses]
      newClasses[index] = [...newClasses[index], newClass]

      const updatedData = { ...settingData }
      updatedData.kindergartenClassInfoList[index].classInfoList =
        newClasses[index]
      setSettingData(updatedData)

      return newClasses
    })
  }

  const removeClass = (kindergartenIndex: number, ageClass: number): void => {
    setClasses((prevClasses) => {
      const newClasses = [...prevClasses]
      if (newClasses[kindergartenIndex].length > 1) {
        newClasses[kindergartenIndex] = newClasses[kindergartenIndex].filter(
          (cls) => cls.ageClass !== ageClass,
        )

        const updatedData = { ...settingData }
        updatedData.kindergartenClassInfoList[kindergartenIndex].classInfoList =
          newClasses[kindergartenIndex]
        setSettingData(updatedData)
      }
      return newClasses
    })
  }

  const updateClassName = (
    kindergartenIndex: number,
    ageClass: number,
    value: string,
  ): void => {
    setClasses((prevClasses) => {
      const newClasses = [...prevClasses]
      const classToUpdate = newClasses[kindergartenIndex].find(
        (cls) => cls.ageClass === ageClass,
      )
      if (classToUpdate) {
        classToUpdate.ageClass = Number(value)
      }

      const updatedData = { ...settingData }
      updatedData.kindergartenClassInfoList[kindergartenIndex].classInfoList =
        newClasses[kindergartenIndex]
      setSettingData(updatedData)

      return newClasses
    })
  }

  const updateClassCapacity = (
    kindergartenIndex: number,
    ageClass: number,
    value: number,
  ): void => {
    setClasses((prevClasses) => {
      const newClasses = [...prevClasses]
      const classIndex = newClasses[kindergartenIndex].findIndex(
        (cls) => cls.ageClass === ageClass,
      )

      if (classIndex !== -1) {
        newClasses[kindergartenIndex][classIndex].recruitCnt = value
      } else {
        newClasses[kindergartenIndex].push({ ageClass, recruitCnt: value })
      }

      const updatedData = { ...settingData }
      updatedData.kindergartenClassInfoList[kindergartenIndex].classInfoList =
        newClasses[kindergartenIndex]
      setSettingData(updatedData)

      return newClasses
    })
  }

  return {
    kindergartens,
    classes,
    addClass,
    removeClass,
    updateClassName,
    updateClassCapacity,
  }
}
