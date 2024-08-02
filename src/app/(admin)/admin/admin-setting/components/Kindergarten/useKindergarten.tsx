'use client'

import { useState } from 'react'

type ClassInfo = {
  classIndex: number
  className: string
  capacity: number
}

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
  const initialKindergartens: Kindergarten[] = [
    {
      kindergartenId: 0,
      kindergartenNm: '새빛 어린이집',
    },
    {
      kindergartenId: 1,
      kindergartenNm: '햇빛 어린이집',
    },
  ]

  const initialClasses: ClassInfo[][] = [
    [
      { classIndex: 0, className: '3세반', capacity: 100 },
      { classIndex: 1, className: '4세반', capacity: 55 },
    ],
    [
      { classIndex: 0, className: '3세반', capacity: 70 },
      { classIndex: 1, className: '4세반', capacity: 60 },
    ],
  ]

  const [kindergartens] = useState<Kindergarten[]>(initialKindergartens)
  const [classes, setClasses] = useState<ClassInfo[][]>(initialClasses)

  const addClass = (index: number): void => {
    setClasses((prevClasses) => {
      const newClass = {
        classIndex: prevClasses[index].length,
        className: '',
        capacity: 0,
      }
      const newClasses = [...prevClasses]
      newClasses[index] = [...newClasses[index], newClass]
      return newClasses
    })
  }

  const removeClass = (kindergartenIndex: number, classIndex: number): void => {
    setClasses((prevClasses) => {
      const newClasses = [...prevClasses]
      if (newClasses[kindergartenIndex].length > 1) {
        newClasses[kindergartenIndex] = newClasses[kindergartenIndex].filter(
          (cls) => cls.classIndex !== classIndex,
        )
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
      newClasses[kindergartenIndex][classIndex].className = value
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
      newClasses[kindergartenIndex][classIndex].capacity = value
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
