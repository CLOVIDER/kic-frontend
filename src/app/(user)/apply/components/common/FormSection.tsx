import React, { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  children: ReactNode
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-20 mb-2">{title}</h2>
      {children}
    </div>
  )
}
