import { Child } from '@/type/application'
import { useState } from 'react'

export const useRightSection1 = (
  kindergartenName: string[],
  onSubmit: (children: Child[], selectedOptions: string[]) => void,
) => {
  const [selectedOptions] = useState<string[]>(
    kindergartenName.map(() => '분반선택'),
  )
  const [children, setChildren] = useState<Child[]>([
    { id: 1, name: '', classes: {} },
  ])

  const addChild = () => {
    setChildren([...children, { id: Date.now(), name: '', classes: {} }])
  }

  const removeChild = (id: number) => {
    setChildren(children.filter((child) => child.id !== id))
  }

  const updateChildInfo = (
    id: number,
    field: string,
    value: string,
    kindergarten?: string,
  ) => {
    setChildren(
      children.map((child) => {
        if (child.id === id) {
          if (field === 'class' && kindergarten) {
            return {
              ...child,
              classes: { ...child.classes, [kindergarten]: value },
            }
          }
          return { ...child, [field]: value }
        }
        return child
      }),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(children, selectedOptions)
  }

  return {
    children,
    addChild,
    removeChild,
    updateChildInfo,
    handleSubmit,
  }
}
