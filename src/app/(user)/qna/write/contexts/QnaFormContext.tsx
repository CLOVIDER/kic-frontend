'use client'

import React, { createContext, useContext } from 'react'
import { useQnaForm } from '../hooks/useQnaForm'

const QnaFormContext = createContext<ReturnType<typeof useQnaForm> | undefined>(
  undefined,
)

export function QnaFormProvider({ children }: { children: React.ReactNode }) {
  const qnaFormState = useQnaForm()

  return (
    <QnaFormContext.Provider value={qnaFormState}>
      {children}
    </QnaFormContext.Provider>
  )
}

export function useQnaFormContext() {
  const context = useContext(QnaFormContext)
  if (context === undefined) {
    throw new Error('useQnaFormContext must be used within a QnaFormProvider')
  }
  return context
}
