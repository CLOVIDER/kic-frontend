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
  removeClass: (kindergartenIndex: number, classIndex: number) => void
  updateClassName: (
    kindergartenIndex: number,
    classIndex: number,
    value: string,
  ) => void
  updateClassCapacity: (
    kindergartenIndex: number,
    classIndex: number,
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
      data.classInfoList.map((cls, index) => ({
        ageClass: cls.ageClass,
        recruitCnt: cls.recruitCnt,
        classIndex: index,
      })),
    ),
  )

  const addClass = (index: number): void => {
    setClasses((prevClasses) => {
      const newClass = {
        classIndex: prevClasses[index].length,
        ageClass: '',
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

  const removeClass = (kindergartenIndex: number, classIndex: number): void => {
    setClasses((prevClasses) => {
      const newClasses = [...prevClasses]
      if (newClasses[kindergartenIndex].length > 1) {
        newClasses[kindergartenIndex] = newClasses[kindergartenIndex].filter(
          (_, cIndex) => cIndex !== classIndex,
        )

        const updatedData = { ...settingData }

        updatedData.kindergartenClassInfoList[kindergartenIndex].classInfoList =
          newClasses[kindergartenIndex].map(({ ageClass, recruitCnt }) => ({
            ageClass,
            recruitCnt,
          }))
        setSettingData(updatedData)
      }
      return newClasses
    })
  }

  const updateClassName = (
    kindergartenIndex: number,
    classIndex: number,
    value: string,
  ): void => {
    setClasses((prevClasses) => {
      const newClasses = [...prevClasses]
      newClasses[kindergartenIndex][classIndex].ageClass = value

      const updatedData = { ...settingData }
      updatedData.kindergartenClassInfoList[kindergartenIndex].classInfoList[
        classIndex
      ].ageClass = value
      setSettingData(updatedData)

      return newClasses
    })
  }

  const updateClassCapacity = (
    kindergartenIndex: number,
    classIndex: number,
    value: number,
  ): void => {
    setClasses((prevClasses) => {
      const newClasses = [...prevClasses]
      newClasses[kindergartenIndex][classIndex].recruitCnt = value

      const updatedData = { ...settingData }
      updatedData.kindergartenClassInfoList[kindergartenIndex].classInfoList[
        classIndex
      ].recruitCnt = value
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
