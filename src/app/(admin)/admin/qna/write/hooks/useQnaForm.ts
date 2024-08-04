import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useQnaForm() {
  const [title, setTitle] = useState<string>('')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [toggled, setToggled] = useState<boolean>(false)

  const router = useRouter()

  const moveBack = useCallback(() => {
    const path = '/qna'
    router.push(path)
  }, [router])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        moveBack()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [moveBack])

  const handleSave = () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      // Save logic
      moveBack()
    } catch (error) {
      setSaveError('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggle = () => {
    setToggled(!toggled)
  }

  return {
    title,
    setTitle,
    isSaving,
    saveError,
    toggled,
    handleToggle,
    handleSave,
    moveBack,
  }
}
